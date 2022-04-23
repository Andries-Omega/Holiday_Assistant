import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from '@angular/fire/auth';
import {
  doc,
  Firestore,
  setDoc,
  getDoc,
  DocumentData,
} from '@angular/fire/firestore';

import { Users } from '../models/Users';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private auth: Auth, private fireStore: Firestore) {}

  async signUpUser(userData: Users): Promise<boolean | string> {
    let signedUp: boolean | string = false;

    await createUserWithEmailAndPassword(
      this.auth,
      userData.email,
      userData.password || ''
    )
      .then((cred) => {
        this.setUserInfo(userData, cred.user.uid);
        signedUp = cred.user.uid;
      })
      .catch((err) => {
        throw new Error(err);
      });
    return signedUp;
  }

  async getUserInfo(userID: string): Promise<DocumentData | boolean> {
    const docSnap = await getDoc(doc(this.fireStore, 'Users', userID));
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return false;
    }
  }

  signInUser(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  private async setUserInfo(userData: Users, userID: string) {
    await setDoc(doc(this.fireStore, 'Users', userID), {
      name: userData.name,
      email: userData.email,
      preferred_name: userData.preferredName,
    });
  }
}
