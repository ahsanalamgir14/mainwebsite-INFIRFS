import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Cart } from '../models/cart.model';
import { Order } from '../models/order.model';
 
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl: string = environment.base_url + "/cart";
 

  public $productInCart2: BehaviorSubject<Order> = new BehaviorSubject<Order>({
    id: 0,
    price: 0,
    cartComponents: [],
  });
 
  public $productInCart: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  productsInCart: any;
 
  constructor(private http: HttpClient) {
    this.loadProductsFromBackend();
  }
 
  public addProductToCart(Cartcomponents: Cart) {
    this.addProduct(Cartcomponents).subscribe((cart ) => {this.loadProductsFromBackend()})
  }
  public addProduct(cartcomponents: Cart): Observable<Cart> {
    return this.http.post<Cart>(this.baseUrl, cartcomponents);
  }
 
  public removeProductFromCart(productId: number) {
    this.http.delete(`${this.baseUrl}/${productId}`).subscribe(() => {
      this.loadProductsFromBackend();
    });
  }

  // public totalPrice(price: Order){
  //     this.http.get(price.price).subscribe((pricetotal) => {this.loadProductsFromBackend()})
  // }
 
  public allProductsInCart2(userid?: Number) {
    this.getCartItems(userid).subscribe((order) => {this.saveProductsAndNotifyChange(order)})
  }
 
  public getCartItems(userid?: Number): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/${userid}`);
  }
  public allProductsInCart(): Product[] {
      return this.productsInCart.slice();
    }
 
  // ------------ PRIVATE ------------------
 
  
  private loadProductsFromBackend(): void {
    this.$productInCart.next([])
    // this.http.get<Product[]>(this.baseUrl).subscribe(products => {
    //   this.$productInCart.next(products);
    // });
  }
  
  private saveProductsAndNotifyChange(order: Order): void {
    this.$productInCart2.next(order);
  }
}