import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  public showHotCupIcon: boolean = false;
  public userIsLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router){}
  
  public ngOnInit(): void {
    this.checkLoginState();
  }

  public onLogout(): void{
    this.authService.logOut();
    this.router.navigate(['/']);

  }

  public checkLoginState(): boolean{

    this.authService
      .$userIsLoggedIn
      .subscribe((loginState: boolean) => {
        this.userIsLoggedIn = loginState;
      });
    return false;
  }

}
