import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private apiUrl: string = 'http://localhost:5000/api';

    constructor(private http: HttpClient) { }

    getLvlAndXp(): Observable<any> {
        return this.http.get(`${this.apiUrl}/getLevelXp`, { withCredentials: true });
    }

    updateLevelAndXp(level: number, xp: number) {
        return this.http.post(`${this.apiUrl}/updateLevelXp`, { level, xp }, { withCredentials: true });
    }

    getDailyTask() {
        return this.http.get(`${this.apiUrl}/getDailyTask`, { withCredentials: true });
    }

    completeTask(taskId: string) {
        return this.http.patch(`${this.apiUrl}/tasks/${taskId}/complete`, {}, { withCredentials: true });
    }

    login(username: string, password: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, { username, password }, { withCredentials: true });
    }

    register(username: string, password: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, { username, password }, { withCredentials: true });
    }

    logout() {
        return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true });
    }

    addTask(title:string):Observable<any>{
        return this.http.post(`${this.apiUrl}/addTask`,{title},{withCredentials:true});
    }

    getYourTask(){
        return this.http.get(`${this.apiUrl}/getYourTask`, { withCredentials: true });
    }

    getMotivation(){
        return this.http.get(`${this.apiUrl}/getMotivation`,{withCredentials:true});
    }

    getTopUser(){
        return this.http.get(`${this.apiUrl}/getTopUsers`,{withCredentials:true});
    }


}


