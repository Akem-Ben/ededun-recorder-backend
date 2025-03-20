import { errorUtilities, responseUtilities } from "../utilities";
import phraseRepository from "../repositories/phrasesRepository";
import { PhraseAttributes } from "../types/modelTypes";
import { v4 } from 'uuid';

const addPhrase = errorUtilities.withErrorHandling(
    async (phrasePayload: Record<string, any>): Promise<Record<string, any>> => {

        let { yoruba_text } = phrasePayload;

        // const existingEnglishPhrase = (await phraseRepository.phrasesRepository.getOne({
        //     english_text,
        // })) as unknown as PhraseAttributes;

        const existingYorubaPhrase = (await phraseRepository.phrasesRepository.getOne({
            yoruba_text,
        })) as unknown as PhraseAttributes;

        // if (existingEnglishPhrase) {
        //     throw errorUtilities.createError(
        //         'English phrase already exists',
        //         400
        //     );
        // }

        if (existingYorubaPhrase) {
            throw errorUtilities.createError(
                'Yoruba phrase already exists',
                400
            );
        }

        const phraseId = v4();

        const phraseCreationPayload = {
            id: phraseId,
            // english_text,
            yoruba_text,
        };

        const newPhrase = await phraseRepository.phrasesRepository.create(
            phraseCreationPayload
        );

        if (!newPhrase) {
            throw errorUtilities.createError(
                'Unable to create phrase',
                400
            );
        }

        const phrase: any = await phraseRepository.phrasesRepository.getOne({
            id: phraseId,
        });

        return responseUtilities.handleServicesResponse(201, "Phrase added successfully", phrase);
    }
);

const updatePhrase = errorUtilities.withErrorHandling(
    async (profilePayload: Record<string, any>): Promise<Record<string, any>> => {
        const { body } = profilePayload;

        const { phraseId } = profilePayload;

        const phrase: any = await phraseRepository.phrasesRepository.getOne({ id:phraseId });


        if (!phrase) {
            throw errorUtilities.createError(
                'Phrase not found, please try again',
                400
            );
        }

        if (
            (!body.english_text || body.english_text === "") &&
            (!body.yoruba_text || body.yoruba_text === "")
        ) {
            throw errorUtilities.createError(
                'Please select at least a field to update',
                400
            );
        }

        let updateDetails: Record<string, any> = {};

        if (body.english_text) {
            updateDetails.english_text = body.english_text.trim();
        }

        if (body.yoruba_text) {
            updateDetails.yoruba_text = body.yoruba_text.trim();
        }

        const updatedPhrase = await phraseRepository.phrasesRepository.updateOne(
            { id:phraseId },
            updateDetails
        );

        return responseUtilities.handleServicesResponse(
            200,
            'phrase updated successfully',
            updatedPhrase
        );
    }
);

const deletePhrase = errorUtilities.withErrorHandling(
    async (phraseId: string): Promise<Record<string, any>> => {

        const phrase: any = await phraseRepository.phrasesRepository.getOne({ id:phraseId });

        if (!phrase) {
            throw errorUtilities.createError(
                'Phrase not found, please try again',
                400
            );
        }

        const deletedPhrase = await phraseRepository.phrasesRepository.deleteOne(
            { phraseId }
        );

        if (!deletedPhrase) {
            throw errorUtilities.createError(
                'Phrase not deleted, please try again',
                400
            );
        }

        return responseUtilities.handleServicesResponse(
            200,
            'phrase deleted successfully',
        );
    }
)

const addManyPhrases = errorUtilities.withErrorHandling(
    async (phraseArray: Record<string, any>[]): Promise<Record<string, any>> => {
        const createdPhrases = [];
        
        for (const phrasePayload of phraseArray) {
            let { yoruba_text } = phrasePayload;

            // const existingEnglishPhrase = await phraseRepository.phrasesRepository.getOne({ english_text });
            const existingYorubaPhrase = await phraseRepository.phrasesRepository.getOne({ yoruba_text });

            // if (existingEnglishPhrase || existingYorubaPhrase) {
            //     continue;
            // }

            const phraseId = v4();
            const phraseCreationPayload = { id: phraseId, yoruba_text };
            const newPhrase = await phraseRepository.phrasesRepository.create(phraseCreationPayload);
            
            if (newPhrase) {
                createdPhrases.push(newPhrase);
            }
        }

        if (createdPhrases.length === 0) {
            throw errorUtilities.createError('No new phrases were created because all the phrases already exist', 400);
        }

        return responseUtilities.handleServicesResponse(
            201,
            'Phrases added successfully',
            createdPhrases
        );
    }
);

export default {
    addPhrase,
    updatePhrase,
    deletePhrase,
    addManyPhrases
}