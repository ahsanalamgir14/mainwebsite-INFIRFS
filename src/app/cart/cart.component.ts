import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
 
import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';
import { UserService } from '../auth/user.service';
import { Order } from '../models/order.model';
import { Cart } from '../models/cart.model';
 
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  public products_in_cart: Product[];
  public isOrderPlaced: boolean = false;
  public showEmptyCartMessage: boolean = false
  public products_in_cart2: Order;
  public CartComponents: Cart[];
  public CartComponents1: Cart;
  isloading: boolean = true;
 
  constructor(private cartService: CartService, private userService: UserService) { }
 
  ngOnInit() {
    this.cartService.getCartItems(this.userService.getUser()?.id).subscribe((cartcomponents) => {this.products_in_cart2 = cartcomponents;
      this.CartComponents = cartcomponents.cartComponents;
      console.log(cartcomponents)
      this.CartComponents1 = this.CartComponents[0];
      this.isloading = false;
      // for (let index = 0; index < 2; index++) {
        // const element = this.products_in_cart2.shoppingitem[index];
        // console.log(element)
      // }
    })
 
    // this.products_in_cart = this.cartService.allProductsInCart();
    // this.cartService.$productInCart.subscribe((products: Product[]) => {
    //   this.products_in_cart = products;
    // })
  }
 
  public checkout() {
 
    this.showEmptyCartMessage = this.products_in_cart.length === 0;
  }
 
  public removeProductFromCart(product: any) {
    try {
      this.cartService.removeProductFromCart(product.cartItemDTO);
      const productId = product.cartItemDTO.id;
      this.products_in_cart2.cartComponents = this.products_in_cart2.cartComponents.filter(item => item.id !== productId);
    } catch (error) {
      console.error('Fout bij het verwijderen van product uit de winkelwagen.', error)
    }
  }

  public totalPrice(){
    
  }

  // public  removeProductFromCart(){

  // }
 
  public calculateTotalprice(): number {
    if (!this.products_in_cart2) {
      return 0;
    }
    
    return this.products_in_cart2.cartComponents.reduce((total, cartItem) => total + (cartItem.price), 0);
  }

  public removeAllProductsFromCart() {
    try {
      this.products_in_cart2.cartComponents.forEach((product, index) => {
        this.cartService.checkoutCart(product);
      });

      this.products_in_cart = [];
      this.products_in_cart2.cartComponents = [];
      this.isOrderPlaced = true;
      console.log(this.products_in_cart.length);

    } catch (error) {
      console.error('error.', error)
    }

}
}
