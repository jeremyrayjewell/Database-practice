/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

import * as functions from 'firebase-functions';
import { connect } from './config';

import { Hippo } from './entity/Hippo';

export const getHippos = functions.https.onRequest(async (request, response) => {

    const connection = await connect();
    const hippoRepo = connection.getRepository(Hippo);


    //Get All
    const allHippos = await hippoRepo.find();

    // //Raw SQL Query
    // const query = await hippoRepo.query('SELECT name FROM hippo WHERE WEIGHT > 5');

    // //Count records
    // const count = await hippoRepo.count();

    response.send(allHippos);

});

export const createHippo = functions.https.onRequest(async (request, response) => {

    const { name, weight } = request.body;

    try {
        const connection = await connect();

        const repo = connection.getRepository(Hippo);

        const newHippo = new Hippo();
        newHippo.name = name;
        newHippo.weight = weight;


        const savedHippo = await repo.save(newHippo);

        response.send(savedHippo);

    } catch (error) {
        response.send(error)
    }

});
