import { Component, OnInit } from '@angular/core'
// import { ValidateService } from 'src/app/services/validate.service'
import { AuthService } from 'src/app/services/auth.service'
// import { Router } from '@angular/router'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  message: string = ''
  successMessage: string = '' // Property to store success message
  errorMessage: string = ''

  constructor(public authService: AuthService) {}

  onSubmit() {

    if (this.authService.loggedIn()){
      if (this.message.trim() === ''){
        this.errorMessage = ('Message cannot be empty!')
        return
      }
    }

    const messageData = {
      message: this.message,
    }

    const serverUrl = 'http://localhost:3000'

    this.authService.postMessage(messageData, serverUrl).subscribe((data: any) => {
      if (data.success) {
        // Clear the message input field
        this.message = ''

        // Display a success message
        this.successMessage = 'Message sent successfully'

        // Automatically hide the success message after a few seconds (e.g., 3 seconds)
        // setTimeout(() => {
        //   this.successMessage = ''
        // }, 3000)
    } else {
      console.error('Failed to post the message:', data.msg)
      this.errorMessage = 'Failed to post the message'
      }
    })
  }
}
