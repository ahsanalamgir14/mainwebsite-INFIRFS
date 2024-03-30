import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
 
import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';
import { AuthService } from '../auth/auth.service';
 
@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {
  public title: string = 'INFIRFS - Webshop';
 
  public amountOfProducts: number = 0;
 
  constructor(private cartService: CartService, private authService: AuthService, private router: Router) { }
 
  ngOnInit() {
    this.cartService.$productInCart.subscribe((products: Product[]) => {
      this.amountOfProducts = products.length;
      this.checkLoginState();
    })
  }
 
  public showHotCupIcon: boolean = false;
  public userIsLoggedIn: boolean = false;
 
  public onLogout(): void{
    this.authService.logOut();
    this.router.navigate(['/']);
  }
 
  public checkLoginState(): void{
 
    this.authService
      .$userIsLoggedIn
      .subscribe((loginState: boolean) => {
        this.userIsLoggedIn = loginState;
      });
  }
}
 