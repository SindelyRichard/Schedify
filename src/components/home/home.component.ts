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
  username:string = '';
  level:number = 0;
  xp:number=0;
  nextLevelUp:number = 1000;

  constructor(private router: Router, private apiService:ApiService) {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.username = localStorage.getItem('username') || '';
    }
  }

   onLogout(){
    if (typeof window !== 'undefined' && window.localStorage) {
      this.apiService.logout();
      localStorage.removeItem('username');
    }
    this.router.navigate(['/login']);
  }

  ngOnInit(){
    this.apiService.getLvlAndXp(this.username).subscribe({
      next:(res) => {
        this.level = res.level;
        this.xp = res.xp;
      }
    });
}
 get xpPercent(){
  return Math.min(100,(this.xp/this.nextLevelUp)*100)
 }

}
