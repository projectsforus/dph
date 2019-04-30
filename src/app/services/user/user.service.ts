import { HelperService } from './../helper/helper.service';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { StorageService } from '../storage/storage.service';
import { Events } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isDoctor: boolean;
  auth: any;
  isAdmin: boolean;
  adminEmail = 'admin@dph.com';
  scope = 'users';
  constructor(
   private api: ApiService,
   private helperService: HelperService,
   private storageService: StorageService, private events: Events,
   private afDatabase: AngularFireDatabase,
   public afAuth: AngularFireAuth) {
      this.loadLocalUser();
      this.afAuth.authState.subscribe((fbauth) => {
        if (fbauth) {
          console.log('auth..uid....2', fbauth);
          this.updateAndSaveCarrentUser(fbauth);
        }
      });
     }

  async fbLogin(userData: any) {
    try {
      const patient: any = await this.isPatientEmail(userData['email']);
      if (!patient) {
        return { success: false, message: 'We could not find any patient with email or file number like this!' };
      }
      return { success: true, data: await this.afAuth.auth.signInWithEmailAndPassword(patient.email, userData.password) };
    } catch (err) {
      return { success: false, errorMessage: this.getFirebaseErrorMessage(err) };
    }
  }

  async fbLoginDoctor(userData: any) {
    try {
      const doctor: any = await this.isDoctorEmail(userData['email']);
      if (!doctor) {
        return { success: false, message: 'We could not find any doctor with this email!' };
      }
      return { success: true, data: await this.afAuth.auth.signInWithEmailAndPassword(userData.email, userData.password) };
    } catch (err) {
      return { success: false, errorMessage: this.getFirebaseErrorMessage(err) };
    }
  }

  async isPatientEmail(email) {
    try {
      const patients = await this.api.get(`patientsList.json`);
      const patientList = Object.values(patients);
      return patientList.find(x => (x['email'] === email) || (x['fileNo'].toString() === email));
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async isDoctorEmail(email) {
    try {
      const doctors = await this.api.get(`doctorsList.json`);
      const doctorsList = Object.values(doctors);
      const doctor = doctorsList.find(x => (x['email'] === email));
      return doctor;
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async fbRegister(userData: any) {
    try {
      const patient: any = await this.isPatientEmail(userData['fileNo'].toString());
      if (patient) {
        return {success: false,  message: 'This File Number is already Exist!' };
      }
      return { success: true, data: await this.afAuth.auth.createUserWithEmailAndPassword(userData.email, userData.password) };
    } catch (err) {
      return { success: false, errorMessage: this.getFirebaseErrorMessage(err) };
    }
  }

  async addFood(food) {
    const today = (new Date()).toDateString();
    const time = (new Date()).toLocaleTimeString();
    return await this.pushToList(`users/${this.auth.uid}/food/${today}`, { food: food, added_at: time});
  }

  async setFoodNutrition(nutritions) {
    const today = (new Date()).toDateString();
    return await this.setObject(`users/${this.auth.uid}/nutritions/${today}`, nutritions);
  }

  async loadFoodOfDay(day) {
    return await this.loadList(`users/${this.auth.uid}/food/${day}`);
  }

  async loadNutritionsOfDay(day) {
    return await this.loadObj(`users/${this.auth.uid}/nutritions/${day}`);
  }

  async loadCopyOfNutritionsOfDay(day) {
    return await this.api.get(`users/${this.auth.uid}/nutritions/${day}.json`);
  }

  async loadMyChats() {
    if (!this.auth) { return false; }

    return this.loadList(`${this.scope}/${this.auth.uid}/chats`);
  }

  async loadPatientChat(patientUid) {
    if (!this.auth) { return false; }

    return this.loadList(`doctors/${this.auth.uid}/chats/${patientUid}`);
  }

  async sendMsgToDr(msg) {
    const msgObj = { text: msg, time: Date.now(), from: this.auth.displayName,
      sender: true, sent: true, delivered: true, read: false, image: 'assets/imgs/patient.png'};
    await this.addMsgToPatient(msgObj, this.auth.uid );
    return this.sendMsgToMyDr(msgObj);
  }

  async sendMsgToPatient(msg, patientUid) {
    const msgObj = { text: msg, time: Date.now(), from: this.auth.displayName,
      sender: false, sent: true, delivered: true, read: false, image: 'assets/imgs/Doctor.png'};
    await this.addMsgToPatient(msgObj, patientUid);
    msgObj.sender = true;
    return this.addPatientMsgToDr(msgObj, this.auth.uid, patientUid);
  }

  async sendMsgToMyDr(msg) {
    const drUid = await this.api.get(`users/${this.auth.uid}/myDoctor/uid.json`);
    msg.sender = false;
    return await this.addPatientMsgToDr(msg, drUid, this.auth.uid);
  }

  async addPatientMsgToDr(msg, drUid, patientUid) {
    return await this.pushToList(`doctors/${drUid}/chats/${patientUid}`, msg);
  }

  async addMsgToPatient(msg, patientUid) {
    await this.pushToList(`users/${patientUid}/chats`, msg);
  }

  fbLoadMyProfie() {
    if (!this.auth) { return false; }

    try {
      return { success: true, data: this.afDatabase.object(`${this.scope}/${this.auth.uid}`).valueChanges() };
    } catch (err) {
      return { success: false, error: err };
    }
  }

  fbLoadProfie(uid, scope) {
    if (!this.auth) { return false; }

    try {
      return { success: true, data: this.afDatabase.object(`${scope}/${uid}`).valueChanges() };
    } catch (err) {
      return { success: false, error: err };
    }
  }

  loadDoctorsList() {
    return this.loadList('doctorsList');
  }

  loadPatientsList() {
    return this.loadList('patientsList');
  }

  async filterPatients(q) {
    const result: any = await this.api.get('patientsList.json');
    const patientList: any[] = Object.values(result);
    return patientList.filter((patient) => {
      return patient.name.includes(q) || patient.email.includes(q) || patient.fileNo.toString().includes(q);
    });
  }

  loadMyPatientsList() {
    if (!this.auth) {return false; }

    return this.loadList(`doctors/${this.auth.uid}/myPatients`);
  }

  loadMyMedicationList() {
    if (!this.auth) {return false; }

    return this.loadList(`users/${this.auth.uid}/medication`);
  }

  loadPatientMedicationList(uid) {
    if (!this.auth) {return false; }

    return this.loadList(`users/${uid}/medication`);
  }

  loadList(scopeList) {
    try {
      return { success: true, data: this.afDatabase.list(scopeList).valueChanges() };
    } catch (err) {
      return { success: false, error: err };
    }
  }

  loadObj(scopeObj) {
    try {
      return { success: true, data: this.afDatabase.object(scopeObj).valueChanges() };
    } catch (err) {
      return { success: false, error: err };
    }
  }

  pushToList(ref, obj) {
    try {
      const result = this.afDatabase.list(ref).push(obj);
      return { success: true, data: result };
    } catch (err) {
      console.log('err', err);
      return { success: false, error: err };
    }
  }

  setObject(ref, obj) {
    try {
      const result = this.afDatabase.object(ref).set(obj);
      return { success: true, data: result };
    } catch (err) {
      console.log('err', err);
      return { success: false, error: err };
    }
  }

  addMedication(patienUid, medication) {
    return this.pushToList(`users/${patienUid}/medication`, medication);
  }

  async addDrToPatient(patient) {
    try {
      const oldDr = await this.api.get(`users/${patient.uid}/myDoctor/uid.json`);
      await this.setObject(`doctors/${oldDr}/myPatients/${patient.uid}`, null);
      await this.afDatabase.object(`doctors/${this.auth.uid}/myPatients/${patient.uid}`).
        set(patient);
      return this.setObject(`users/${patient.uid}/myDoctor`,
       { email: this.auth.email, name: this.auth.displayName, uid: this.auth.uid });
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async createDrProfile(profileData) {
    profileData.isDoctor = true;
    profileData.uid = this.auth.uid;

    try {
      await this.auth.updateProfile({
        displayName: `${profileData.firstName} ${profileData.lastName}`
      });
      await this.afDatabase.object(`doctors/${this.auth.uid}/profile`).set(profileData);
      return this.pushToList('doctorsList',
       { name: `${profileData.firstName} ${profileData.lastName}`, email: profileData.email, uid: profileData.uid });
    } catch (err) {
      console.log('err', err);
      return { success: false, error: err };
    }
  }

  async createProfile(profileData) {
    if (!this.auth) { return { success: false }; }
    profileData.email = this.auth.email;
    profileData.uid = this.auth.uid;
    try {
      await this.auth.updateProfile({
        displayName: `${profileData.firstName} ${profileData.lastName}`
      });
      this.auth.sendEmailVerification();
      const result = await this.afDatabase.object(`users/${this.auth.uid}/profile`).set(profileData);
      return this.pushToList('patientsList', {
        name: `${profileData.firstName} ${profileData.lastName}`,
        email: profileData.email, uid: profileData.uid, fileNo: profileData.fileNo
      } );
    } catch (err) {
      console.log('err', err);
      return { success: false, error: err };
    }
  }

  getFirebaseErrorMessage(afErr) {

    switch (afErr['code']) {
      case 'auth/user-not-found':
        return this.helperService.translate('ERRORS.FIREBASE.EMAIL_NOT_FOUND');
      case 'auth/wrong-password':
        return this.helperService.translate('ERRORS.FIREBASE.INVALID_PASSWORD');
      case 'auth/email-already-in-use':
        return this.helperService.translate('ERRORS.FIREBASE.EMAIL_EXISTS');
      default:
        return this.helperService.translate('ERRORS.FIREBASE.INVALID_EMAIL_OR_PASSWORD');
    }

  }

  setAuth(fbauth) {
    this.auth = fbauth;
  }

  getCurrentUser() {
    return this.auth;
  }

  async loadLocalUser() {
    this.isDoctor = await this.storageService.get('isDoctor');
    if (this.isDoctor) { this.scope = 'doctors'; }
  }

  async updateAndSaveCarrentUser(user) {
    this.setAuth(user);
    this.isAdmin = (user && (user.email === this.adminEmail));
    this.updateCarrentUser(user);
  }

  async updateCarrentUser(user) {
    setTimeout(() => {
      this.events.publish('userUpdate', user, this.isDoctor);
    }, 500);
  }

  logout() {
    this.isDoctor = false;
    this.isAdmin = false;
    this.auth = null;
    this.scope = 'users';
    this.events.publish('userUpdate', null, false);
    this.clearSavedSession();
    this.fbSignOut();
  }

  fbSignOut() {
    this.afAuth.auth.signOut();
  }

  clearSavedSession() {
    this.storageService.remove('isDoctor');
  }

  async loginAdmin() {
    try {
      return { success: true, data: await this.afAuth.auth.signInWithEmailAndPassword(this.adminEmail, 'password') };
    } catch (err) {
      return { success: false, errorMessage: this.getFirebaseErrorMessage(err) };
    }
  }

   setDoctor() {
    this.isDoctor = true;
    this.scope = 'doctors';
    this.storageService.save('isDoctor', this.isDoctor);
  }

  getDoctor() {
    return this.isDoctor;
  }

  isAdminUser() {
    return this.isAdmin;
  }

}
