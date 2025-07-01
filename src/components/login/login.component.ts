import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username:string = '';
  password:string = '';

  constructor(private router: Router, private apiService:ApiService) {}

  onRegister() {
    this.apiService.register(this.username,this.password).subscribe({
      next:(res) => {
        alert('Registered!');
      },
      error: (err) =>{
        alert('Registration error!');
      }
    });
  }

  onLogin(){
    this.apiService.login(this.username,this.password).subscribe({
      next:(res) => {
        localStorage.setItem('username',this.username);
        this.router.navigate(['/home']);
      },
      error:(err) => {
        alert('Invalid username or password!');
      }
    });
  }
}
