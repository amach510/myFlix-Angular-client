import { Component, OnInit, Input } from '@angular/core';
// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
// import { UserRegistrationService } from '../fetch-api-data.service';

/**
 * @description Component representing the signup form.
 * @selector 'app-user-registration-form'
 * @templateUrl './user-registration-form.component.html'
 * @styleUrls ['./user-registration-form.component.scss']
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { username: '', password: '', email: '', birthday: '' };

/**
 * @constructor - Constructor for UserProfileComponent.
 * @param {FetchApiDataService} fetchApiData - Service for fetching data from the API.
 * @param {MatDialogRef<UserRegistrationFormComponent>} dialogRef - Material dialog service for opening dialogs.
 * @param {MatSnackBar} snackBar - Material snack bar service for displaying notifications.
 */
constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

ngOnInit(): void {
}

/**
 * Function responsible for sending the form inputs to the backend.
 * @returns Close the modal on success/ Error "Something bad happened; please try again later. "
 */
registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
  // Logic for a successful user registration goes here!
     this.dialogRef.close(); // This will close the modal on success!
     this.snackBar.open(result, 'OK', {
        duration: 2000
     });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

}
