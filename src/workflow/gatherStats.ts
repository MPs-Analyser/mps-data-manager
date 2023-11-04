import { log } from "console";
import { getMps, getDivision, getMemebersDivisions, getAllDivisions, getMemeberVoting } from "./apicall"
import { createMpNode, createDivisionNode, setupNeo, createVotedForDivision, cleanUp, setupDataScience, mostSimilarVotingRecord, votedNoCount, votedAyeCount, totalVotes } from "./neoManager";
import { Mp } from "../models/mps";
import { Division, MemberVoting } from "../models/divisions";
import { VotedFor } from "../models/relationships";
import { setupMongo, insertSimilarity, insertDivisions, insertMps, insertVotingSummary, insertMp } from "./mongoManager"

const logger = require('../logger');

const CREATE_MPS = false;
const CREATE_DIVISIONS = false;
const CREATE_MONGO_DIVISIONS = true;
const CREATE_RELATIONSHIPS = true;
const PERFORM_DATA_SCIENCE = true;
const USE_NEO = true;
const USE_MONGO = false;
const MP_START_NUMBER = 4;

const endAndPrintTiming = (timingStart: number, timingName: string) => {
    // END timing
    let timingEnd = performance.now();
    logger.info(`<<TIMING>> ${timingName} in ${(timingEnd - timingStart) / 1000} seconds`);
}

export const gatherStats = async () => {

    logger.info(`Creating ${Number(process.env.MP_LOOPS) * Number(process.env.MP_TAKE_PER_LOOP)} Mps`);

    if (USE_NEO) {
        await setupNeo();
    }

    if (USE_MONGO) {
        await setupMongo();
    }


    const allMps: Array<Mp> = [];
    const allDivisions: Array<Division> = [];
    const allVotedForRelationships: Array<VotedFor> = [];

    const MAX_LOOPS = 1000;
    let skip = 0;

    let neoCreateCount = 0;

    // Start timing
    const totalTimeStart = performance.now();
    let timingStart = performance.now();

    //create all the divisions     
    skip = 0;
    for (let i = 0; i < MAX_LOOPS; i++) {
        //get all the divisions from the API (25 at a time) and store them in memory
        skip += 25;
        const divisions: Array<Division> = await getAllDivisions(skip, 25);
        let fetchCount = divisions.length;

        allDivisions.push(...divisions)

        if (fetchCount < 25) {
            break;
        }
    }

    logger.debug(`Created ${allDivisions.length} divisions in memory`);

    if (USE_NEO && CREATE_DIVISIONS) {
        neoCreateCount = 0;
        for (let i of allDivisions) {
            //loop through all mps in memory and store them in database
            await createDivisionNode(i);
            neoCreateCount = neoCreateCount + 1;
        }

        logger.debug(`Created ${neoCreateCount} divisions in Neo4j`);
    }

    if (CREATE_MONGO_DIVISIONS && USE_MONGO) {
        const mongoData = allDivisions.map(({ EVELType, EVELCountry, ...rest }) => {
            return rest;
        });
        await insertDivisions(mongoData);
        logger.debug(`Created divisions in Mongo`);
    }


    // END timing
    endAndPrintTiming(timingStart, 'created divisions');

    // Start timing
    timingStart = performance.now();

    skip = MP_START_NUMBER;

    neoCreateCount = 0;

    for (let i = 0; i < Number(process.env.MP_LOOPS); i++) {

        const mps: Array<Mp> = await getMps(skip, Number(process.env.MP_TAKE_PER_LOOP));

        skip += 25;
        allMps.push(...mps);

        if (mps.length < 20) {
            break;
        }
    }
    logger.debug(`Created ${allMps.length} MPs in memory`);

    if (CREATE_MPS && USE_NEO) {
        for (let i of allMps) {
            await createMpNode(i);
            neoCreateCount = neoCreateCount + 1;
        }
        logger.debug(`Created ${neoCreateCount} MPs in Neo4j`);
    }


    // END timing
    endAndPrintTiming(timingStart, 'created MPs');

    // Start timing
    timingStart = performance.now();

    skip = 0;
    if (CREATE_RELATIONSHIPS) {

        let votesForMp: Array<VotedFor>;
        //make relationships between mps and divisions
        let index = 0;
        // @ts-ignore
        let votedAye = [];
        // @ts-ignore
        let votedNo = [];
        for (const mp of allMps) {

            const mpNumber = index + MP_START_NUMBER;

            logger.debug(`get relationships for mp #${mpNumber} ${mp.nameDisplayAs}`);

            votesForMp = [];
            index += 1;
            let divisionsVotedCount: number = 25;
            let mpVoteCount: number = 0;
            while (divisionsVotedCount === 25) {
                //for each mp get all the divisions they have voted on
                const memeberVotings: Array<MemberVoting> = await getMemeberVoting(skip, 25, mp.id);

                skip += 25;

                //only create releationships for voted for divisions if we have created the division
                let filterVoteCount = 0;

                if (memeberVotings && Array.isArray(memeberVotings)) {
                    memeberVotings.filter(i => {
                        return allDivisions.find(division => division.DivisionId === i.PublishedDivision.DivisionId)
                    }).forEach(vote => {
                        // @ts-ignore
                        let votes = {
                            // @ts-ignore
                            mpId: mp.id,
                            divisionId: vote.PublishedDivision.DivisionId,
                            votedAye: vote.MemberVotedAye
                        };

                        votesForMp.push(votes);

                        if (vote.MemberVotedAye) {
                            votedAye.push(vote.PublishedDivision?.DivisionId);
                        } else {
                            votedNo.push(vote.PublishedDivision?.DivisionId);
                        }


                        filterVoteCount += 1;
                    })

                    divisionsVotedCount = memeberVotings.length;
                }

                mpVoteCount = mpVoteCount + filterVoteCount;

            }

            if (USE_NEO) {
                logger.debug(`creating ${votesForMp.length} Neo RELEATIONSHIPS for MP #${mpNumber} ${mp.nameDisplayAs}`);
                for (let votedFor of votesForMp) {
                    await createVotedForDivision(votedFor);
                }
            }

            logger.debug(`created ${votesForMp.length} RELEATIONSHIPS for MP #${mpNumber} ${mp.nameDisplayAs}`);
            skip = 0;
            mpVoteCount = 0;

            //create mongo record of mp complete with ids of all voted aye and voted no votes 
            const mpToUpdate = allMps.find(i => i.id === mp.id);

            if (mpToUpdate && USE_MONGO) {
                // @ts-ignore
                delete mpToUpdate.nameListAs;
                // @ts-ignore
                delete mpToUpdate.gender;
                // @ts-ignore
                delete mpToUpdate.nameFullTitle;

                // @ts-ignore
                mpToUpdate.votedAye = votedAye;
                // @ts-ignore
                mpToUpdate.votedNo = votedNo;
                insertMp(mpToUpdate);
            }

        }

    }

    // END timing
    endAndPrintTiming(timingStart, 'creating relationships');

    if (PERFORM_DATA_SCIENCE && USE_NEO) {

        logger.info('Doing DATA_SCIENCE similarity')

        await setupDataScience();
        const BATCH_SIZE = 10;

        // Start timing
        timingStart = performance.now();

        // @ts-ignore
        let mongoData = [];
        let count = 0;
        for (const mp of allMps) {

            logger.debug('Get Similarity for mp ', mp.nameDisplayAs);
            const result = await mostSimilarVotingRecord(mp.nameDisplayAs);

            if (result) {
                const mongoRecord = {
                    _id: mp.id,
                    name: mp.nameDisplayAs,
                    similarity: []
                }

                // @ts-ignore
                result.records.forEach(async record => {
                    // @ts-ignore
                    mongoRecord.similarity.push({
                        name: record._fields[1],
                        score: record._fields[2]
                    })

                })

                mongoData.push(mongoRecord);

                if (USE_MONGO && count === BATCH_SIZE) {
                    count = 0;
                    // @ts-ignore   
                    await insertSimilarity(mongoData);
                    mongoData = [];
                }

            }

            count = count + 1;
        }


        //if any left before flling up batch size then send them to mongo
        if (USE_MONGO && mongoData.length) {
            await insertSimilarity(mongoData);
            mongoData = [];
        }

        // END timing
        endAndPrintTiming(timingStart, 'creating similarities');
    }

    if (USE_NEO) {
        cleanUp();
    }

    endAndPrintTiming(totalTimeStart, 'Workflow complete');


    logger.info('END');


}