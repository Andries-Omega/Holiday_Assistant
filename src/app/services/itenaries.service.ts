import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDocs,
} from '@angular/fire/firestore';
import { deleteDoc, query, updateDoc, where } from '@firebase/firestore';
import { Trip } from '../models/Itenaries';

@Injectable({
  providedIn: 'root',
})
export class ItenariesService {
  constructor(private http: HttpClient, private fireStore: Firestore) {}

  async addNewTrip(holidayDetails: Trip) {
    const docRef = collection(this.fireStore, 'Trips');
    const doc = await addDoc(docRef, holidayDetails);

    return this.updateTrip({ ...holidayDetails, tripID: doc.id });
  }

  async updateTrip(tripDetails: Trip) {
    const tripDoc = doc(this.fireStore, 'Trips', tripDetails.tripID);
    const newTrip = {
      tripID: tripDetails.tripID,
      userID: tripDetails.userID,
      tripName: tripDetails.tripName,
      tripLocation: tripDetails.tripLocation,
      tripStartDate: tripDetails.tripStartDate,
      tripEndDate: tripDetails.tripEndDate,
      tripItenaries: tripDetails.tripItenaries,
    };

    return await updateDoc(tripDoc, newTrip).then(() => {
      return newTrip;
    });
  }
  async getAllTrips(userID: string) {
    const q = query(
      collection(this.fireStore, 'Trips'),
      where('userID', '==', userID)
    );

    const qSnapShot = await getDocs(q);
    let trips: Trip[] = [];

    qSnapShot.forEach((doc) => {
      let trip: Trip = { ...(doc.data() as Trip), tripID: doc.id };
      trips.push(trip);
    });

    return trips;
  }

  async deleteTrip(tripID: string) {
    return await deleteDoc(doc(this.fireStore, 'Trips', tripID)).then(
      (result) => {
        return result;
      }
    );
  }
}
