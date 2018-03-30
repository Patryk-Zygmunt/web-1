import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  userModel: any = {};

  @ViewChild('form') registerForm: NgForm;

  constructor(private router: Router, private userService: UserService) {
  }

  onSubmit() {
    this.userService.create(this.userModel).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['']);
      },
      error => {
        //always throws error, so for testing
        this.router.navigate(['']);
      }
    )

  }

}
