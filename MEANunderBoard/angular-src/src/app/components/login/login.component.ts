import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = "";
  password: string = "";
  errorMessage: string = "";
  successMessage: string = "";

  constructor(private authService: AuthService,
    private router: Router
    ){}

  ngOnInit(){}

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password,
    }

    this.errorMessage = ""
    // this.successMessage = ""
    this.authService.authenticateUser(user).subscribe(data => {
      if(data.success){
        this.authService.storeUserData(data.token, data.user)
        this.router.navigate(['dashboard'])
        this.successMessage = ("You are now logged in")
        setTimeout(() => {
          this.successMessage = "";
        }, 2000)
      }else {
        this.errorMessage = (data.msg);
        this.router.navigate(['login'])
      }
    })

  }
}
