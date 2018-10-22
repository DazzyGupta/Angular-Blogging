import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { JwtService } from '../services/jwt.service';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { Observable, BehaviorSubject , ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  url = 'https://conduit.productionready.io/api';

  constructor(private http: HttpClient, private jwtService: JwtService) { }

  signUp(user: object){
    return this.http.post(`${this.url}/users`, user);
  }

  login(user){
    return this.http.post(`${this.url}/users/login`, user)
  }

  setAuth(user: User) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.token);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  updateSetting(user){
    return this.http.put(`${this.url}/user`, user, { headers: {Authorization: 'Token ' + localStorage.getItem('jwtToken')}})
  }

  follow(username){
    if(this.jwtService.getToken()){
      return this.http.post(`${this.url}/profiles/${username}/follow`,{},{ headers: {Authorization: 'Token ' + localStorage.getItem('jwtToken')}})
    }else{
      return this.http.post(`${this.url}/profiles/${username}/follow`,{});
    }
  }

  unfollow(username){
    if(this.jwtService.getToken()){
      return this.http.delete(`${this.url}/profiles/${username}/follow`,{ headers: {Authorization: 'Token ' + localStorage.getItem('jwtToken')}})
    }else{
      return this.http.delete(`${this.url}/profiles/${username}/follow`);
    }
  }

  getUser(){
    return this.http.get(`${this.url}/user`,{ headers: {Authorization: 'Token ' + localStorage.getItem('jwtToken')}});
  }

  populate(){
    if(this.jwtService.getToken()){
      this.getUser().subscribe((user: any) => {
        this.setAuth(user.user);
      }),
      err => this.purgeAuth()
    }else{
      this.purgeAuth();
    }
  }
}
