import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';

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

  getAllHolidays(userID: string) {}
}
