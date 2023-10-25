import { Component, OnInit } from '@angular/core'
import { ValidateService } from 'src/app/services/validate.service'
import { AuthService } from 'src/app/services/auth.service'
import { Router } from '@angular/router'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  firstname: string = ""
  lastname: string = ""
  phone: string = ""
  email: string =""
  username: string = ""
  password: string = ""
  errorMessage: string = ""
  successMessage: string = ""

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router
    ) {}
  
  ngOnInit() {
      
  }

  onRegisterSubmit() {
    const user = {
      firstname: this.firstname,
      lastname: this.lastname,
      phone: this.phone,
      email: this.email,
      username: this.username,
      password: this.password
    }

    this.errorMessage = ""
  
    // First, check if all required fields are filled
    if (!this.validateService.validateRegister(user)) {
      // console.log("Please fill in all fields.")
      // this.messageHTML = '<div class="alert alert-danger">Please fill in all fields.</div>'
      this.errorMessage = 'Please fill in all fields.';
      return false;
    }
  
    // Then, validate the email format
    if (!this.validateService.validateEmail(user.email)) {
      // console.log("Please use a valid email");
      this.errorMessage = 'Please use a valid email.';
      return false;
    }

    // Register user
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.successMessage = ('You are now registered and can log in.')
        this.router.navigate(['/login'])
        
        setTimeout(() => {
          this.successMessage = "";
        }, 2000)

      }else {
        this.errorMessage = ('Something went wrong')
        this.router.navigate(['/register'])
      }
    })
    
    return true;
  }
}
