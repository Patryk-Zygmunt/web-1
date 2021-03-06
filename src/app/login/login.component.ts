import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from "../_models";
import { UserService } from '../_services/user.service';
import { MatSnackBar, MatSnackBarConfig } from "@angular/material";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @ViewChild('form') loginForm: NgForm;

  //TODO: find a better way to retrieve form values
  userModel: User = new User();
  returnUrl: string;
  showSpinner = false;
  config = new MatSnackBarConfig();



  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    public snackBar: MatSnackBar,
    private userService: UserService) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
    if (this.authService.isAuthenticated()) {
      this.router.navigate([this.returnUrl]);
    }
    this.config.extraClasses = ['gal-snack'];
    this.config.duration = 500;

  }

  onSubmit() {
    this.showSpinner = true;
    this.authService.login(this.userModel.email, this.userModel.password)
      .subscribe(
        auth => {
          this.authService.storeCredentials(auth);
          this.authService.loggedInStatus.emit(true);
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.showSpinner = false;
          console.log(error);
          this.userModel.email = '';
          this.userModel.password = '';
        });
  }

  private routeToPath(routePath: string) {
    this.router.navigate([routePath]);
  }

  passReset() {
    if (!this.userModel.email) {
      this.snackBar.open("Podaj adres email.", "", this.config);
    } else {
      this.authService.sendResetEmail(this.userModel.email).subscribe(
        data => this.snackBar.open('Sprawdź skrzynkę email!', "", this.config),
        error => {
          if (error.status == 401) {
            this.snackBar.open("Niepoprawny adres email.", "", this.config);
          } else
            this.snackBar.open('Ups! Coś poszło nie tak.', "", this.config);
        }
      );
    }
  }


}
