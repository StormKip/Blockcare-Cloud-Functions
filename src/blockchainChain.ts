const { FileSystemWallet, Gateway } = require('fabric-network');
const fs = require('fs');

const path = require('path');

const configPath = path.join(process.cwd(), './server/config.json');
const configJSON = fs.readFileSync(configPath, 'utf8');
const config = JSON.parse(configJSON);
let userName = config.appAdmin;
let gatewayDiscovery = config.gatewayDiscovery;
let connection_file = config.connection_file;


// connect to the connection file
const ccpPath = path.join(process.cwd(), './server/' + connection_file);
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

// A wallet stores a collection of identities for use
const wallet = new FileSystemWallet('./server/wallet');

 export class BlockchainClient {
    async connectToNetwork() {


      const gateway = new Gateway();

      try {

        await gateway.connect(ccp, { wallet, identity: userName, discovery: gatewayDiscovery });

        // Connect to our local fabric
        const network = await gateway.getNetwork('mychannel');


        console.log('Connected to mychannel. ');

        // Get the contract we have installed on the peer
        const contract = await network.getContract('blockcare-typescript')


        let networkObj = {
          contract: contract,
          network: network
        };

        return networkObj;

      } catch (error) {
        console.log(`Error processing transaction. ${error}`);
        console.log(error.stack);
        return "error"
      } finally {
        console.log('Done connecting to network.');
        // gateway.disconnect();
      }

    }

    async createPatient(func: any, id:string, firstName:string, lastName:string, contract: any) {
      let response = await contract.submitTransaction(func, id, firstName, lastName);
      return response;
    }

    async createDoctor(func: any, id:string, firstName:string, lastName:string, specialization:string, contract: any) {
      let response = await contract.submitTransaction(func, id, firstName, lastName, specialization);
      return response;
    }

    async createMedicalRecord(func: any, id:string, initialDoctor:string, patientId:string, smoking:boolean, allergies:string , contract: any) {
      let response = await contract.submitTransaction(func, id,initialDoctor,patientId,smoking,allergies);
      return response;
    }

    async grantAccessToMedicalRecord(func: any, doctorId:string,medicalRecordId:string, contract: any) {
      let response = await contract.submitTransaction(func, doctorId,medicalRecordId );
      return response;
    }

    async revokeAccessFromMedicalRecord(func: any, doctorId:string,medicalRecordId:string, contract: any) {
      let response = await contract.submitTransaction(func, doctorId,medicalRecordId );
      return response;
    }

    async getAllDoctors(contract: any) {
      let response = await contract.submitTransaction('getAllDoctors');
      if (response.length === 2) {
        response = `No Doctors does not exist`;
        return response;
      }
      response = JSON.parse(response.toString());
      return response;

    }

    async getAllMedicalRecords(contract: any) {
      let response = await contract.submitTransaction('getAllMedicalRecords');
      if (response.length === 2) {
        response = `No Medical Records does not exist`;
        return response;
      }
      response = JSON.parse(response.toString());
      return response;

    }
    

    async getPatientById(contract: any, patientId:string) {
      let response = await contract.submitTransaction('getPatientById', patientId);
      if (response.length === 2) {
        response = `No Medical records found`;
        return response;
      }
      response = JSON.parse(response.toString());
      return response;

    }

    async getPatientsByDoctorId(contract: any, doctorId:string) {
      let response = await contract.submitTransaction('getPatientsByDoctorId', doctorId);
      if (response.length === 2) {
        response = `No Medical records found`;
        return response;
      }
      response = JSON.parse(response.toString());
      return response;

    }



    async getDoctorById(contract: any, doctorId:string) {
      let response = await contract.submitTransaction('getDoctorById', doctorId);
      if (response.length === 2) {
        response = `No Doctor records found`;
        return response;
      }
      response = JSON.parse(response.toString());
      return response;

    }

    async getAllPatients(contract: any) {
      let response = await contract.submitTransaction('getAllPatients');
      if (response.length === 2) {
        response = `No Patients does not exist`;
        return response;
      }
      response = JSON.parse(response.toString());
      return response;

    }

    async getMedicalRecordsForPatient(contract: any, patientId:string) {
      let response = await contract.submitTransaction('getMedicalRecordsForPatient', patientId);
      if (response.length === 2) {
        response = `No Medical records found`;
        return response;
      }
      response = JSON.parse(response.toString());
      return response;

    }

  }
