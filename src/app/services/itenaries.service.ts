import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDocs,
} from '@angular/fire/firestore';
import { query, updateDoc, where } from '@firebase/firestore';
import { Observable } from 'rxjs';

import { Holiday } from '../models/Itenaries';

@Injectable({
  providedIn: 'root',
})
export class ItenariesService {
  constructor(private http: HttpClient, private fireStore: Firestore) {}

  async addNewHoliday(holidayDetails: Holiday) {
    const docRef = collection(this.fireStore, 'Holidays');
    const doc = await addDoc(docRef, holidayDetails);

    return this.updateHoliday({ ...holidayDetails, holidayID: doc.id });
  }

  async updateHoliday(holidayDetails: Holiday) {
    const holidayDoc = doc(
      this.fireStore,
      'Holidays',
      holidayDetails.holidayID
    );
    const newHoliday = {
      holidayID: holidayDetails.holidayID,
      userID: holidayDetails.userID,
      holidayName: holidayDetails.holidayName,
      holidayLocation: holidayDetails.holidayLocation,
      holidayStartDate: holidayDetails.holidayStartDate,
      holidayEndDate: holidayDetails.holidayEndDate,
      holidayItenaries: holidayDetails.holidayItenaries,
    };
    return await updateDoc(holidayDoc, newHoliday).then(() => {
      return newHoliday;
    });
  }
  async getAllHolidays(userID: string) {
    const q = query(
      collection(this.fireStore, 'Holidays'),
      where('userID', '==', userID)
    );

    const qSnapShot = await getDocs(q);
    let holidays: Holiday[] = [];

    qSnapShot.forEach((doc) => {
      console.log(doc.id);
      holidays.push(doc.data() as Holiday);
    });

    return holidays;
  }
}
