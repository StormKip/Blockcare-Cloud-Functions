/* tslint:disable:no-any */
 import * as functions from 'firebase-functions';
import * as firebase from 'firebase-admin';
import * as express from 'express';
import bodyParser = require('body-parser');
import cors = require('cors');
import { BlockchainClient } from './blockchainChain';

let blockchainClient = new BlockchainClient();


const createDoctor = express();
const createPatient = express();
const createMedicalRecord = express();

const revokeAccess = express();
const grantAccess = express();

const getAllDoctors = express();
const getAllMedicalRecords = express();
const getAllPatients = express();
const getDoctorById = express();
const getPatientById = express();
const getPatientsByDoctorId = express();
const getMedicalRecordsForPatient = express();

const firebaseConfig = {
  apiKey: "AIzaSyDxzJ7YQSLp3POTrjmt7DBmiaHNsMUc0_U",
  authDomain: "blockcare-3e340.firebaseapp.com",
  databaseURL: "https://blockcare-3e340.firebaseio.com",
  projectId: "blockcare-3e340",
  storageBucket: "blockcare-3e340.appspot.com",
  messagingSenderId: "1033334096745",
  appId: "1:1033334096745:web:551e5721e448c09f"
};

firebase.initializeApp(firebaseConfig);


createDoctor.use(cors({origin:true}));
createDoctor.use(bodyParser.urlencoded({extended:false}));
createDoctor.use(bodyParser.json());

createPatient.use(cors({origin:true}));
createPatient.use(bodyParser.urlencoded({extended:false}));
createPatient.use(bodyParser.json());

createMedicalRecord.use(cors({origin:true}));
createMedicalRecord.use(bodyParser.urlencoded({extended:false}));
createMedicalRecord.use(bodyParser.json());

grantAccess.use(cors({origin:true}));
grantAccess.use(bodyParser.urlencoded({extended:false}));
grantAccess.use(bodyParser.json());

revokeAccess.use(cors({origin:true}));
revokeAccess.use(bodyParser.urlencoded({extended:false}));
revokeAccess.use(bodyParser.json());

getAllDoctors.use(cors({origin:true}));
getAllDoctors.use(bodyParser.urlencoded({extended:false}));
getAllDoctors.use(bodyParser.json());

getAllPatients.use(cors({origin:true}));
getAllPatients.use(bodyParser.urlencoded({extended:false}));
getAllPatients.use(bodyParser.json());

getAllMedicalRecords.use(cors({origin:true}));
getAllMedicalRecords.use(bodyParser.urlencoded({extended:false}));
getAllMedicalRecords.use(bodyParser.json());

getDoctorById.use(cors({origin:true}));
getDoctorById.use(bodyParser.urlencoded({extended:false}));
getDoctorById.use(bodyParser.json());

getPatientById.use(cors({origin:true}));
getPatientById.use(bodyParser.urlencoded({extended:false}));
getPatientById.use(bodyParser.json());

getPatientsByDoctorId.use(cors({origin:true}));
getPatientsByDoctorId.use(bodyParser.urlencoded({extended:false}));
getPatientsByDoctorId.use(bodyParser.json());


getMedicalRecordsForPatient.use(cors({origin:true}));
getMedicalRecordsForPatient.use(bodyParser.urlencoded({extended:false}));
getMedicalRecordsForPatient.use(bodyParser.json());

createDoctor.post('*', async(req:any, res:any, next:any)=>{
    let data = {
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        specialization: req.body.specialization,
      };
    let result;
    
    try {
        const networkObj = await blockchainClient.connectToNetwork();
        if (networkObj === "error"){
            result === "error"
        }else{
            
            let func = 'createDoctor';
        let contract = networkObj.contract
             result = await blockchainClient.createDoctor(func,data.id, data.firstName,data.lastName, data.specialization,contract);
        }
          
      } catch (error) {
        result =error;
      }
      res.send(result)
});

createPatient.post('*', async(req:any, res:any, next:any)=>{
    let data = {
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName
      };
    let result;
    
    try {
        const networkObj = await blockchainClient.connectToNetwork();
        if (networkObj === "error"){
            result === "error"
        }else{
            
            let func = 'createPatient';
        let contract = networkObj.contract
             result = await blockchainClient.createPatient(func,data.id, data.firstName, data.lastName,contract);
        }
          
      } catch (error) {
        result =error;
      }
      res.send(result)
});


createMedicalRecord.post('*', async(req:any, res:any, next:any)=>{
    let data = {
        id: req.body.id,
        initialDoctor: req.body.initialDoctor,
        patientId: req.body.patientId,
        smoking: req.body.smoking,
        allergies:req.body.allergies
        
      };
    let result;
    
    try {
        const networkObj = await blockchainClient.connectToNetwork();
        if (networkObj === "error"){
            result === "error"
        }else{
            
            let func = 'createMedicalRecord';
        let contract = networkObj.contract
             result = await blockchainClient.createMedicalRecord(func, data.id, data.initialDoctor, data.patientId, data.smoking, data.allergies ,contract);
        }
          
      } catch (error) {
        result =error;
      }
      res.send(result)
});
getAllDoctors.get('*', async(req:any, res:any, next:any)=> {
    const networkObj = await blockchainClient.connectToNetwork();
    let result
    if (networkObj === "error"){
        result === "error"
    }else{
         result = await blockchainClient.getAllDoctors(networkObj.contract);
    }
    
   res.send(result)
});

getAllPatients.get('*', async(req:any, res:any, next:any)=> {
    const networkObj = await blockchainClient.connectToNetwork();
    let result
    if (networkObj === "error"){
        result === "error"
    }else{
         result = await blockchainClient.getAllPatients(networkObj.contract);
    }
    
   res.send(result)
});

getAllMedicalRecords.get('*', async(req:any, res:any, next:any)=> {
    const networkObj = await blockchainClient.connectToNetwork();
    let result
    if (networkObj === "error"){
        result === "error"
    }else{
         result = await blockchainClient.getAllMedicalRecords(networkObj.contract);
    }
    
   res.send(result)
});

getDoctorById.get('*', async(req:any, res:any, next:any)=> {
    const id = req.query.id;
    const networkObj = await blockchainClient.connectToNetwork();
    let result
    if (networkObj === "error"){
        result === "error"
    }else{
         result = await blockchainClient.getDoctorById(networkObj.contract, id);
    }
    
   res.send(result)
});

getPatientById.get('*', async(req:any, res:any, next:any)=> {
    const id = req.query.id;
    const networkObj = await blockchainClient.connectToNetwork();
    let result
    if (networkObj === "error"){
        result === "error"
    }else{
         result = await blockchainClient.getPatientById(networkObj.contract, id);
    }
    
   res.send(result)
});

getPatientsByDoctorId.get('*', async(req:any, res:any, next:any)=> {
    const id = req.query.id;
    const networkObj = await blockchainClient.connectToNetwork();
    let result
    if (networkObj === "error"){
        result === "error"
    }else{
         result = await blockchainClient.getPatientsByDoctorId(networkObj.contract, id);
    }
    
   res.send(result)
});

getMedicalRecordsForPatient.get('*', async(req:any, res:any, next:any)=> {
    const patientId = req.query.patientId;
    const networkObj = await blockchainClient.connectToNetwork();
    let result
    if (networkObj === "error"){
        result === "error"
    }else{
         result = await blockchainClient.getMedicalRecordsForPatient(networkObj.contract, patientId);
    }
    
   res.send(result)
});

grantAccess.post('*', async(req:any,res:any)=> {
    let medicalId = req.body.medicalId;
    let doctorId = req.body.doctorId;
    let result;
    
    try {
        const networkObj = await blockchainClient.connectToNetwork();
        if (networkObj === "error"){
            result === "error"
        }else{
            let func = 'grantAccessToMedicalRecord';
        let contract = networkObj.contract
             result = await blockchainClient.grantAccessToMedicalRecord(func,doctorId ,medicalId ,contract);
        }
          
      } catch (error) {
        result =error;
      }
      res.send(result)
})

revokeAccess.post('*', async(req:any,res:any)=> {
    let medicalId = req.body.medicalId;
    let doctorId = req.body.doctorId;
    let result;
    
    try {
        const networkObj = await blockchainClient.connectToNetwork();
        if (networkObj === "error"){
            result === "error"
        }else{
            let func = 'revokeAccessFromMedicalRecord';
        let contract = networkObj.contract
             result = await blockchainClient.revokeAccessFromMedicalRecord(func,doctorId ,medicalId ,contract);
        }
          
      } catch (error) {
        result =error;
      }
      res.send(result)
})

exports.createDoctor = functions.https.onRequest(createDoctor);
exports.createMedicalRecord = functions.https.onRequest(createMedicalRecord);
exports.createPatient = functions.https.onRequest(createPatient);

exports.revokeAccess = functions.https.onRequest(revokeAccess);
exports.grantAccess = functions.https.onRequest(grantAccess);

exports.getAllDoctors = functions.https.onRequest(getAllDoctors);
exports.getAllPatients = functions.https.onRequest(getAllPatients);
exports.getAllMedicalRecords = functions.https.onRequest(getAllMedicalRecords);

exports.getDoctorById = functions.https.onRequest(getDoctorById);
exports.getPatientById = functions.https.onRequest(getPatientById);
exports.getPatientsByDoctorId = functions.https.onRequest(getPatientsByDoctorId);
exports.getMedicalRecordsForPatient = functions.https.onRequest(getMedicalRecordsForPatient);