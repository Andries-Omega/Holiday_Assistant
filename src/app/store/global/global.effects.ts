import { Injectable } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  catchError,
  concatMap,
  delay,
  from,
  map,
  mergeMap,
  of,
  repeat,
} from 'rxjs';
import {
  firstSignIn,
  secondSignIn,
} from 'src/app/components/Algorithms/Authentication/signPurgatory';
import { Users } from 'src/app/models/Users';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ItenariesService } from 'src/app/services/itenaries.service';
import {
  deleteUser,
  deleteUserInfo,
  deleteUserTrips,
  getTrips,
  getUserInfo,
  procedureFailure,
  reAuthenticate,
  saveUserTrips,
  setLoggedInUser,
  signIn,
  signOutUser,
  signUp,
  updateEmail,
  updatePassword,
  updateProfile,
} from './global.actions';

@Injectable()
export class GlobalEffects {
  getTrips$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTrips),
      mergeMap(({ userID }) =>
        from(this.itenaryService.getAllTrips(userID)).pipe(
          delay(2000), //sometimes it's so fast, you don't get to see the cool spinner
          map((trips) => {
            this.notifiation.create(
              trips.length ? 'success' : 'warning',
              trips.length
                ? ' Retrieved ' + trips.length + ' Trips Successfully'
                : ' You have no trips added '
            );
            return saveUserTrips({ userTrips: trips });
          })
        )
      ),
      catchError(() => {
        this.notifiation.create('error', 'Failed to retrieve user trips');
        return of(saveUserTrips({ userTrips: [] }));
      }),
      repeat()
    )
  );

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUp),
      mergeMap(({ userData }) =>
        from(this.authService.signUpUser(userData)).pipe(
          map((result) => {
            if (typeof result !== 'boolean') {
              this.router.navigateByUrl('dashboard');
              return setLoggedInUser({ loggedInUser: firstSignIn(result) });
            } else {
              this.notifiation.create('warning', 'Something went wrong');
              return procedureFailure();
            }
          })
        )
      ),
      catchError((error: Error) => {
        const errorMessage =
          error.message ===
          'FirebaseError: Firebase: Error (auth/email-already-in-use).'
            ? 'The email you have provided already exists'
            : 'error occured while signing you up, please try again';
        this.notifiation.create('error', errorMessage, { nzDuration: 5000 });
        return of(procedureFailure());
      }),
      repeat()
    )
  );

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signIn),
      mergeMap(({ email, password }) =>
        from(this.authService.signInUser(email, password)).pipe(
          map((result) => {
            this.router.navigateByUrl('dashboard');
            catchError(() => of(procedureFailure()));
            return setLoggedInUser({
              loggedInUser: firstSignIn(result.user.uid),
            });
          })
        )
      ),
      catchError((error: Error) => {
        const errorMessage =
          error.message === 'Firebase: Error (auth/wrong-password).' ||
          'Firebase: Error (auth/user-not-found).'
            ? 'Invalid email or (and) password'
            : 'Unable to sign in';
        this.notifiation.create('error', errorMessage, { nzDuration: 5000 });
        return of(procedureFailure());
      }),
      repeat()
    )
  );

  getUserInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserInfo),
      mergeMap(({ userID }) =>
        from(this.authService.getUserInfo(userID)).pipe(
          map((result) => {
            if (typeof result !== 'boolean') {
              const theUser: Users = secondSignIn(
                userID,
                result?.['name'],
                result?.['preferredName'],
                result?.['email']
              );
              this.notifiation.create('success', 'Signed In Successfully');
              return setLoggedInUser({ loggedInUser: theUser });
            } else {
              this.notifiation.create(
                'error',
                'Failed To Retrieve Your Infomation'
              );
              return procedureFailure();
            }
          })
        )
      ),
      catchError(() => {
        this.notifiation.create('error', 'Failed To Retrieve Your Infomation');
        return of(procedureFailure());
      }),
      repeat()
    )
  );

  updateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProfile),
      concatMap(({ newUserInfo, updatedLogin }) =>
        from(
          this.authService.updateUserProfile(
            newUserInfo.email,
            newUserInfo.name,
            newUserInfo.preferredName,
            newUserInfo.userID
          )
        ).pipe(
          map((result) => {
            if (result) {
              this.notifiation.create('success', 'Updated profile');
              if (updatedLogin) {
                signOut(this.auth);
                location.reload();
                return signOutUser();
              } else {
                return setLoggedInUser({ loggedInUser: newUserInfo });
              }
            } else {
              this.notifiation.create('error', 'Failed To Update Profile');
              return procedureFailure();
            }
          })
        )
      ),
      catchError((e: Error) => {
        console.log(e);
        console.log(e.message);
        this.notifiation.create('error', 'Failed To Update Profile');
        return of(procedureFailure());
      }),
      repeat()
    )
  );

  updateEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateEmail),
      concatMap(({ userData, newPassword, newEmail }) =>
        from(this.authService.updateEmail(newEmail)).pipe(
          map((updatedemail) => {
            if (updatedemail) {
              this.notifiation.create('success', 'Updated email');
              return updatePassword({ userData, newPassword });
            } else {
              this.notifiation.create('error', 'Failed to update email');
              return procedureFailure();
            }
          })
        )
      ),
      catchError(() => {
        this.notifiation.create('error', 'Failed to update email');
        return of(procedureFailure());
      }),
      repeat()
    )
  );

  updatePassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePassword),
      concatMap(({ userData, newPassword }) =>
        from(this.authService.updatePassword(newPassword)).pipe(
          map((result) => {
            if (result) {
              this.notifiation.create('success', 'Updated password');
              return updateProfile({
                newUserInfo: userData,
                updatedLogin: true,
              });
            } else {
              this.notifiation.create('error', 'Failed To Update Password');
              return procedureFailure();
            }
          })
        )
      ),
      catchError(() => {
        this.notifiation.create('error', 'Failed To Update Password');
        return of(procedureFailure());
      }),
      repeat()
    )
  );

  reAuthenticate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(reAuthenticate),
      concatMap(
        ({ reAuthIntention, userData, newPassword, oldPassword, email }) =>
          from(this.authService.reAuthenticate(oldPassword, email)).pipe(
            map((authenticated) => {
              if (authenticated) {
                this.notifiation.create('success', 'Re-Authenticated');
                if (reAuthIntention === 'Update') {
                  return updateEmail({
                    userData,
                    newPassword,
                    newEmail: userData.email,
                  });
                } else if (reAuthIntention === 'Delete') {
                  return deleteUserTrips({ userID: userData.userID });
                } else {
                  this.notifiation.create(
                    'error',
                    'Failed To ReAthenticate (or determine whether you are deleting or updating)'
                  );
                  return procedureFailure();
                }
              } else {
                this.notifiation.create('error', 'Failed To ReAthenticate');
                return procedureFailure();
              }
            })
          )
      ),
      catchError(() => {
        this.notifiation.create('error', 'Failed To RaAthenticate');
        return of(procedureFailure());
      }),
      repeat()
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUser),
      concatMap(() =>
        from(this.authService.deleteUser(this.auth)).pipe(
          map((deleted) => {
            if (deleted) {
              this.notifiation.create('success', 'You are deleted');
            } else {
              this.notifiation.create('error', 'Failed to delete you');
            }
            signOut(this.auth);
            location.reload();
            return signOutUser();
          })
        )
      ),
      catchError(() => {
        this.notifiation.create('error', 'Failed to delete you');
        return of(signOutUser());
      }),
      repeat()
    )
  );

  deleteUserInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUserInfo),
      concatMap(({ userID }) =>
        from(this.authService.deleteUserInfo(userID)).pipe(
          map(() => {
            this.notifiation.create('success', 'Your Info Is Deleted');
            return deleteUser();
          })
        )
      ),
      catchError(() => {
        this.notifiation.create('error', 'Failed to delete your info');
        return of(procedureFailure());
      }),
      repeat()
    )
  );

  deleteUserTrips$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUserTrips),
      concatMap(({ userID }) =>
        from(this.authService.deleteUserTrips(userID)).pipe(
          map(() => {
            this.notifiation.create('success', 'Your Info Is Deleted');
            return deleteUserInfo({ userID });
          })
        )
      ),
      catchError(() => {
        this.notifiation.create('error', 'Failed to delete your trips');
        return of(procedureFailure());
      }),
      repeat()
    )
  );

  constructor(
    private actions$: Actions,
    private itenaryService: ItenariesService,
    private authService: AuthServiceService,
    private notifiation: NzMessageService,
    private router: Router,
    private auth: Auth
  ) {}
}
