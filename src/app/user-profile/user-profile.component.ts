import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

// Import to bring in the API call created in 6.2
import { FetchApiDataService  } from '../fetch-api-data.service';

// Import to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit{

  @Input() userData = { username: "", password: "", email: "", birthday: "" };

  user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
    ) {}

  ngOnInit(): void {
    this.getProfile();
  }

  // function for getting user
  getProfile(): void {
    this.user = this.fetchApiData.getUser();
    this.userData.username = this.user.username;
    this.userData.password = '';
    this.userData.email = this.user.email;
    this.userData.birthday = this.formatDate(this.user.birthday);
  }
  // function for updating user info
  updateUser(): void {
    if (!this.userData.password) {
      this.snackBar.open('Password is required', 'OK', {
        duration: 2000
      });
      return;
    }
    this.fetchApiData.editUser(this.userData).subscribe((result) => {
      console.log('User update success');
      localStorage.setItem('user', JSON.stringify(result));
      this.snackBar.open('User update successful', 'OK', {
        duration: 2000
      });
    }, (error) => {
      console.error('Error updating user:', error);
      this.snackBar.open('Failed to update user', 'OK', {
        duration: 2000
      });
    });
  }
  
  // function to delete user profile
  deleteUser(): void {
    this.router.navigate(['welcome']).then(() => {
      localStorage.clear();
      this.snackBar.open('User successfully deleted.', 'OK', {
        duration: 2000
      });
    })
    this.fetchApiData.deleteUser(this.userData.username).subscribe((result) => {
      console.log(result);
    });
  }
  
  // function to format date to yyyy-MM-dd
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
    const day = ('0' + date.getUTCDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
}