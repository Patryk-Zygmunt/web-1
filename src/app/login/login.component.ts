import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../services/user.service';

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

  // userExists: Boolean = true;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnLink'] || '';
    }

  onSubmit() {
    this.authService.login(this.userModel.login, this.userModel.password)
      .subscribe(
        user => {
          localStorage.setItem("currentUser", JSON.stringify(user));
          this.authService.loggedInStatus.emit(true);
          this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log(error);
          this.userModel.login = '';
          this.userModel.password = '';
        });
  }

  private routeToPath(routePath: string) {
    this.router.navigate([routePath]);
  }
}
