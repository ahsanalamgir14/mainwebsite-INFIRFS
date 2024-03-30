import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
 
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _localStorageuserKey: string = 'user';
 
  constructor(
  ) {}
 
  public saveToLocalStorageUser(user: User) {
    localStorage.setItem(this._localStorageuserKey, JSON.stringify(user));
  }
 
  public getUser(): User | null {
    const userString = localStorage.getItem(this._localStorageuserKey);
    if (userString) {
      return JSON.parse(userString);
    } else {
      return null;
    }
    console.log(userString);
  }
 
 
}