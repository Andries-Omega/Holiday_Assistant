import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  Firestore,
  getDocs,
} from '@angular/fire/firestore';
import { query, where } from '@firebase/firestore';
import { Observable } from 'rxjs';

import { Holiday } from '../models/Itenaries';

@Injectable({
  providedIn: 'root',
})
export class ItenariesService {
  constructor(private http: HttpClient, private fireStore: Firestore) {}

  async addNewHoliday(holidayDetails: Holiday) {
    const docRef = collection(this.fireStore, 'Holidays');
    return await addDoc(docRef, holidayDetails);
  }

  async getAllHolidays(userID: string) {
    const q = query(
      collection(this.fireStore, 'Holidays'),
      where('userID', '==', userID)
    );

    const qSnapShot = await getDocs(q);
    let holidays: Holiday[] = [];

    qSnapShot.forEach((doc) => {
      holidays.push(doc.data() as Holiday);
    });

    return holidays;
  }
}
