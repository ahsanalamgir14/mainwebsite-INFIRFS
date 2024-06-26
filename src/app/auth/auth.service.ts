import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from './auth-response.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthRequest } from './auth-request.model';
import { TokenService } from './token.service';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 private user: User = {
   id: 0,
   email: '',
 }

 private _loginEndpoint: string = environment.base_url + '/auth/login';
 private _registerEndpoint: string = environment.base_url + '/auth/register';

  public $userIsLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private tokenService: TokenService, private userService: UserService) {
    if (this.tokenService.isValid()) {
      this.$userIsLoggedIn.next(true);
    }
  }


  public login(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(this._loginEndpoint, authRequest)
      .pipe(
        tap((authResponse: AuthResponse) => {
         console.log(authResponse);
         console.log("dfkjdklfmdkmfkldmfkldmfkmklmfkfmfkl");
          this.user.id = authResponse.id;
          this.user.email = authResponse.email;
          this.tokenService.storeToken(authResponse.token);
          this.userService.saveToLocalStorageUser(this.user);
          this.$userIsLoggedIn.next(true);
        })
      );
  }

  public register(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(this._registerEndpoint, authRequest)
      .pipe(
        tap((authResponse: AuthResponse) => {
          this.tokenService.storeToken(authResponse.token);
          this.user.id = authResponse.id;
          this.user.email = authResponse.email;
          this.userService.saveToLocalStorageUser(this.user);
          this.$userIsLoggedIn.next(true);
       })
      );
  }

  public logOut(): void {
    this.tokenService.removeToken();
    this.$userIsLoggedIn.next(false);
  }

  public saveUser(data: {email:string; password: string }) {
   return this.http.post(this._registerEndpoint, data)
 }
}
