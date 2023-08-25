import { Division, MemberVoting } from "../models/divisions";
import { Mp } from "../models/mps";

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://mongo:mooquackwoof@atlascluster.ofzo7oi.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

/**
 * Connect to mongo atlas
 */
export const setupMongo = async () => {

    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("mps").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (e) {
        console.log('Error connecting to mongo ', e);

    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }

}


export const insertSimilarity = async (data:Array<any>) => {
    
    await client.connect();
    const myDB = client.db("mps");
    const myColl = myDB.collection("similarity1");
    try {
       const insertManyresult = await myColl.insertMany(data);
       console.log(`${insertManyresult.insertedCount} documents were inserted.`);
    } catch(e) {
       console.log(`A MongoBulkWriteException occurred, but there are successfully processed documents.`);
       console.log(e);    
       // @ts-ignore   
       console.log(`Number of documents inserted: ${e.result.result.nInserted}`);
    }    
}


/**
 * 
 * {
    "type": "division",
    "id": 1592,
    "name": "Illegal Migration Bill: motion to disagree with Lords Amendment 31"
},
 */ 
export const insertDivisions = async (division: Array<any>) => {    
    await client.connect();
    const myDB = client.db("mps");
    const myColl = myDB.collection("divisionNames");
    try {
       const insertManyresult = await myColl.insertMany(division);
       console.log(`${insertManyresult.insertedCount} documents were inserted.`);
    } catch(e) {
       console.log(`A MongoBulkWriteException occurred, but there are successfully processed documents.`);
       console.log(e);    
       // @ts-ignore   
       console.log(`Number of documents inserted: ${e.result.result.nInserted}`);
    }   
}

/**
 *  [{"type":"mp","id":172,"name":"Ms Diane Abbott"}]
 */
export const insertMps = async (mps : Array<Mp>) => {
    await client.connect();
    const myDB = client.db("mps");
    const myColl = myDB.collection("mpNames");
    try {
       const insertManyresult = await myColl.insertMany(mps);
       console.log(`${insertManyresult.insertedCount} documents were inserted.`);
    } catch(e) {
       console.log(`A MongoBulkWriteException occurred, but there are successfully processed documents.`);
       console.log(e);    
       // @ts-ignore   
       console.log(`Number of documents inserted: ${e.result.result.nInserted}`);
    }      
}

export const insertMp = async (mp :any) => {
    await client.connect();
    const myDB = client.db("mps");
    const myColl = myDB.collection("mps");
    try {
       const result = await myColl.insertOne(mp);       
    } catch(e) {       
       console.log(e);    
    }   
    
}

export const insertVotingSummary = async (value: any) => {
    console.log('insert insertVotingSummary ', value);
    await client.connect();
    const myDB = client.db("mps");
    const myColl = myDB.collection("votingSummary");
    try {
       const result = await myColl.insertOne(value);       
    } catch(e) {       
       console.log(e);                  
    }   
}