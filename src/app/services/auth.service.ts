import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

interface TokenResponse {
  token: string;
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject : BehaviorSubject<User>;
  private currentUser : Observable<User>;

  constructor(private http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User{
    return this.currentUserSubject.value;
  }


  login(user: User){
    var baseURL = 'http://localhost:3000/';
    return this.http.post<any>(baseURL+'auth/login', user, httpOptions).pipe(map(user => {
      // login successful if there's a jwt token in the response
      if (user && user.accessToken) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);

      }else{
        return false;
      }
      return user;
    })
    )
  }

  logout(){
    localStorage.removeItem('currentuser');
    this.currentUserSubject.next(null);
  }
}
