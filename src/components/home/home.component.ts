import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { WelcomeComponent } from '../welcome/welcome.component';
import { Router } from '@angular/router';
import { ApiService } from '../../service';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskComponent } from '../task/task.component';

const NEXT_LEVEL_UP = 1000;

@Component({
  selector: 'app-home',
  imports: [WelcomeComponent, MatButtonModule, MatIconModule,CommonModule,MatDialogModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  username: string = '';
  level: number = 0;
  xp: number = 0;
  dailyTasks:any[] = [];
  yourTasks:any = [];

  get nextLevelUp(){
    return NEXT_LEVEL_UP;
  }

  constructor(private router: Router, private apiService: ApiService,private dialog:MatDialog) {

  }
  ngOnInit() {
    this.apiService.getLvlAndXp().subscribe({
    next: (res) => {
      this.level = res.level;
      this.xp = res.xp;
      this.username = res.username;
    },
    error: (err) => {
      if (err.status === 401) {
        this.router.navigate(['/login']);
      }
    }
  });
  this.apiService.getDailyTask().subscribe({
    next: (tasks: any) => {
      this.dailyTasks = tasks;
    },
    error: (err) => {
      if (err.status === 401) {
        this.router.navigate(['/login']);
      }
    }
  });
  this.apiService.getYourTask().subscribe({
    next: (tasks: any) => {
      this.yourTasks = tasks;
    },
    error: (err) => {
      if (err.status === 401) {
        this.router.navigate(['/login']);
      }
    }
  });


    this.loadTasks();
    this.loadYourTasks();
  }

  levelUpIfNeeded() {
    if (this.xp >= this.nextLevelUp) {
      this.xp -= this.nextLevelUp;
      this.level += 1;
    }
    this.apiService.updateLevelAndXp(this.level, this.xp).subscribe();

  }
  get xpPercent() {
    return Math.min(100, (this.xp / this.nextLevelUp) * 100)
  }

  toggleTaskComplete(task: any) {
    if (task.completed) return;
    this.apiService.completeTask(task._id).subscribe({
        next: (updatedTask: any) => {
            task.completed = true;
            this.xp += 100;
            this.levelUpIfNeeded();
        }
    });
}
loadTasks() {
  this.apiService.getDailyTask().subscribe({
    next: (tasks: any) => {
      this.dailyTasks = tasks;
    },
    error: (err) => {
      if (err.status === 401) {
        this.router.navigate(['/login']);
      }
    }
  });
}

onLogout() {
  this.apiService.logout().subscribe({
    next: () => {
      this.router.navigate(['/login']);
    }
  });
}

addTask(){
  this.dialog.open(TaskComponent,{
    width:'600px',
    height:'400px'
  });

}

loadYourTasks(){
  this.apiService.getYourTask().subscribe({
    next: (tasks: any) => {
      this.yourTasks = tasks;
    },
    error: (err) => {
      if (err.status === 401) {
        this.router.navigate(['/login']);
      }
    }
  });

}

}
