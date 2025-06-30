import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { WelcomeComponent } from '../welcome/welcome.component';
import { Router } from '@angular/router';
import { ApiService } from '../../service';

@Component({
  selector: 'app-home',
  imports: [ WelcomeComponent,MatButtonModule,MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  username:string|null = '';
  constructor(private router: Router, private apiService:ApiService) {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.username = localStorage.getItem('username');
    }
  }

   onLogout(){
    if (typeof window !== 'undefined' && window.localStorage) {
      this.apiService.logout();
      localStorage.removeItem('username');
    }
    this.router.navigate(['/login']);
  }

}
