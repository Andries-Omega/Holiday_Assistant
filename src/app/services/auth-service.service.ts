import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  UserCredential,
} from '@angular/fire/auth';
import {
  doc,
  DocumentData,
  Firestore,
  getDoc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { updateEmail, updatePassword } from '@firebase/auth';
import { Users } from '../models/Users';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private auth: Auth, private fireStore: Firestore) {}

  async signUpUser(userData: Users): Promise<boolean | string> {
    let signedUp: boolean | string = false;
    console.log(userData);
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

  async reAuthenticate(oldPassword: string, email: string) {
    const user = this.auth.currentUser;
    if (user) {
      const cred = EmailAuthProvider.credential(email, oldPassword);
      return await reauthenticateWithCredential(user, cred)
        .then(() => {
          return true;
        })
        .catch(() => {
          return false;
        });
    } else {
      return false;
    }
  }

  async updateEmail(newEmail: string) {
    const user = this.auth.currentUser;
    if (user) {
      return updateEmail(user, newEmail)
        .then(() => {
          return true;
        })
        .catch(() => {
          return false;
        });
    } else {
      return false;
    }
  }

  async updatePassword(newPassword: string) {
    const user = this.auth.currentUser;
    if (user) {
      return updatePassword(user, newPassword)
        .then(() => {
          return true;
        })
        .catch(() => {
          return false;
        });
    } else {
      return false;
    }
  }
  async updateUserProfile(
    newEmail: string,
    newName: string,
    newPreferredName: string,
    userID: string
  ) {
    const userDoc = doc(this.fireStore, 'Users', userID);
    const newUserDetails = {
      email: newEmail,
      name: newName,
      preferredName: newPreferredName,
    };

    return await updateDoc(userDoc, newUserDetails)
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }
  signInUser(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  private async setUserInfo(userData: Users, userID: string) {
    await setDoc(doc(this.fireStore, 'Users', userID), {
      name: userData.name,
      email: userData.email,
      preferredName: userData.preferredName,
    });
  }
}
