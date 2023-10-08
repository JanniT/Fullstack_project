import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  successMessage: string = "";

  constructor(public authService: AuthService,
    private router: Router
    ){}

  ngOnInit(){}

  onLogoutClick(){
    this.successMessage = ""
    this.successMessage = ("You are now logged out")
    this.authService.logout()
    
    setTimeout(() => {
      this.successMessage = "";
    }, 2000)

    this.router.navigate(['/login'])
    return false; 
  }

}
