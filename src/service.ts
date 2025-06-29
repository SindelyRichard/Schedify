import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private apiUrl: string = 'http://localhost:5000/api';

    constructor(private http: HttpClient) { }

    register(username: string, password: string): Observable<any>{
        return this.http.post(`${this.apiUrl}/register`, { username, password });
    }

    login(username: string, password:string):Observable<any>{
        return this.http.post(`${this.apiUrl}/login`,{username, password});
    }
    
}
