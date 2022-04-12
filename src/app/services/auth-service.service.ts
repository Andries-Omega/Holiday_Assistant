import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  updateProfile,
} from '@angular/fire/auth';
import {
  doc,
  Firestore,
  setDoc,
  getDoc,
  DocumentData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
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
        return updateProfile(cred.user, {
          displayName: userData.preferredName
            ? userData.preferredName
            : userData.name,
        })
          .then(() => {
            setDoc(doc(this.fireStore, 'Users', cred.user.uid), {
              name: userData.name,
              email: userData.email,
              preferred_name: userData.preferredName,
            });

            signedUp = cred.user.uid;
          })
          .catch((error) => {
            throw new Error(error);
          });
      })
      .catch((err) => {
        throw new Error(err);
      });

    return signedUp;
  }

  async getUser(userID: string): Promise<DocumentData | boolean> {
    const docSnap = await getDoc(doc(this.fireStore, 'Users', userID));
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return false;
    }
  }
}
