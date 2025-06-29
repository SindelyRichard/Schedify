import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { WelcomeComponent } from '../welcome/welcome.component';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, WelcomeComponent,MatButtonModule,MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
