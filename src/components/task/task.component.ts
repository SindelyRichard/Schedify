import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task',
  imports: [MatDialogModule,FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  title:string = '';

  constructor(private router: Router, private apiService:ApiService,private dialog:MatDialog) {}

  addTask(){
    this.apiService.addTask(this.title).subscribe({
      next:(res) => {
        this.dialog.closeAll();
      },
      error: (err) =>{
        alert('Error!');
      }
    });
  }

}
