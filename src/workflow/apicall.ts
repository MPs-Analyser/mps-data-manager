
import fetch from 'node-fetch';

import { responseWrapper, responseValue, Mp } from '../models/mps';
import { DivisionResposne, Division, MemberVoting, CategoryTypes } from '../models/divisions';

import { getCategory } from "../utils/categoryManager";

const logger = require('../logger');

export const getMps = async (skip: number, take: number): Promise<Array<Mp>> => {

  const HOUSE_OF_COMMONS = 1;

  let mpsResponse: Array<Mp> = [];
  try {

    const url: string = `https://members-api.parliament.uk/api/Members/Search?skip=${skip}&take=${take}&IsEligible=${true}&IsCurrentMember=${true}&House=${HOUSE_OF_COMMONS}`;

    logger.trace(url);

    const res = await fetch(url);

    const response: responseWrapper = await res.json();
    const mps: Array<responseValue> = response.items;

    for (const mp of mps) {
      mpsResponse.push(mp.value);
    }


  } catch (err: any) {
    console.log(err.message); //can be console.error
    return mpsResponse;
  }

  return mpsResponse;
}

export const getMemebersDivisions = async (skip: number, take: number, memberId: number): Promise<Array<Division>> => {

  const url: string = `https://commonsvotes-api.parliament.uk/data/divisions.json/search?queryParameters.skip=${skip}&queryParameters.take=${take}&queryParameters.memberId=${memberId}`;

  logger.trace(url);

  const res = await fetch(url);

  const divisionResposne: Array<DivisionResposne> = await res.json();

  const divisions: Array<Division> = []

  divisionResposne.forEach(i => {
    const division: Division = {
      DivisionId: i.DivisionId ?? 0,
      Date: i.Date ?? '',
      PublicationUpdated: i.PublicationUpdated ?? '',
      Number: i.Number ?? 0,
      IsDeferred: i.IsDeferred ?? false,
      EVELType: i.EVELType ?? '',
      EVELCountry: i.EVELCountry ?? '',
      Title: i.Title ?? '',
      AyeCount: i.AyeCount ?? 0,
      NoCount: i.NoCount ?? 0,
      category: getCategory(i.Title)
    };

    divisions.push(division)

  })


  return divisions;

}

export const getMemeberVoting = async (skip: number, take: number, memberId: number): Promise<Array<MemberVoting>> => {

  const url: string = `https://commonsvotes-api.parliament.uk/data/divisions.json/membervoting?queryParameters.memberId=${memberId}&queryParameters.skip=${skip}&queryParameters.take=${take}`;  
  logger.trace(url);

  try {    
    const res = await fetch(url);
    let response: Array<MemberVoting>;
    response = await res.json();
  } catch (error) {
    logger.error(`Failed to get votes for member with id ${memberId}`, error);    
    throw error;
  }

  // @ts-ignore
  return response;

}

export const getAllDivisions = async (skip: number, take: number): Promise<Array<Division>> => {

  const url: string = `https://commonsvotes-api.parliament.uk/data/divisions.json/search?queryParameters.skip=${skip}&queryParameters.take=${take}`;
  logger.trace(url);

  const res = await fetch(url);

  const divisions: Array<Division> = []

  if (res.status === 200) {

    const divisionResposne: Array<DivisionResposne> = await res.json();

    divisionResposne.forEach(i => {
      const division: Division = {
        DivisionId: i.DivisionId ?? 0,
        Date: i.Date ?? '',
        PublicationUpdated: i.PublicationUpdated ?? '',
        Number: i.Number ?? 0,
        IsDeferred: i.IsDeferred ?? false,
        EVELType: i.EVELType ?? '',
        EVELCountry: i.EVELCountry ?? '',
        Title: i.Title ?? '',
        AyeCount: i.AyeCount ?? 0,
        NoCount: i.NoCount ?? 0,
        category: getCategory(i.Title)
      };

      divisions.push(division)

    })

  } else {
    console.log('error getting divisions ', res.status, res);
  }
  return divisions;

}


export const getDivision = async (divisionId: number): Promise<Division> => {

  const url: string = `https://commonsvotes-api.parliament.uk/data/division/${divisionId}.json`;
  logger.trace(url);

  const res = await fetch(url);

  const divisionResposne: DivisionResposne = await res.json();

  const division: Division = {
    DivisionId: divisionResposne.DivisionId ?? 0,
    Date: divisionResposne.Date ?? '',
    PublicationUpdated: divisionResposne.PublicationUpdated ?? '',
    Number: divisionResposne.Number ?? 0,
    IsDeferred: divisionResposne.IsDeferred ?? false,
    EVELType: divisionResposne.EVELType ?? '',
    EVELCountry: divisionResposne.EVELCountry ?? '',
    Title: divisionResposne.Title ?? '',
    AyeCount: divisionResposne.AyeCount ?? 0,
    NoCount: divisionResposne.NoCount ?? 0,
    category: getCategory(divisionResposne.Title)
  };


  return division;

}
