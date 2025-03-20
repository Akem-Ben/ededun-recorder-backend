import { Request, Response } from "express";
import { adminServices } from "../../services";
import { responseUtilities } from "../../utilities";
import { JwtPayload } from "jsonwebtoken";


const adminCreatePhrase = async (
  request: Request,
  response: Response
): Promise<any> => {
  
  const newPhrase: any = await adminServices.addPhrase(
    request.body
  );

  return responseUtilities.responseHandler(
    response,
    newPhrase.message,
    newPhrase.statusCode,
    newPhrase.data
  );
};


const adminCreatesManyPhrases = async (
  request: Request,
  response: Response
): Promise<any> => {
  
  const newPhrases: any = await adminServices.addManyPhrases(
    request.body
  );

  return responseUtilities.responseHandler(
    response,
    newPhrases.message,
    newPhrases.statusCode,
    newPhrases.data
  );
};

const adminUpdatesPhrase = async (
  request: Request,
  response: Response
): Promise<any> => {

  const { body } = request;
  
  const {phraseId} = request.params;

  const updateData = {
    body, phraseId
  }
  
  const updatedPhrase: any = await adminServices.updatePhrase(
    updateData
  );

  return responseUtilities.responseHandler(
    response,
    updatedPhrase.message,
    updatedPhrase.statusCode,
    updatedPhrase.data
  );
};


const adminDeletesPhrase = async (
  request: Request,
  response: Response
): Promise<any> => {

  const {phraseId} = request.params;
  
  const deletedPhrase: any = await adminServices.deletePhrase(
    phraseId
  );

  return responseUtilities.responseHandler(
    response,
    deletedPhrase.message,
    deletedPhrase.statusCode,
    deletedPhrase.data
  );
};


export default {
  adminCreatePhrase,
  adminUpdatesPhrase,
  adminDeletesPhrase,
  adminCreatesManyPhrases
};
