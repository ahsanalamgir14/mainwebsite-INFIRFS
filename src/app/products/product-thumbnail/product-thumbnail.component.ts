import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
 
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { Cart} from '../../models/cart.model';
import { UserService } from '../../auth/user.service';
import { Order } from '../../models/order.model';
 
@Component({
  selector: 'app-product-thumbnail',
  templateUrl: './product-thumbnail.component.html',
  styleUrl: './product-thumbnail.component.scss'
})
export class ProductThumbnailComponent  implements OnInit{
  constructor(private cartservice: CartService, private userservice: UserService ) {
 
  }
  ngOnInit(): void {
    console.log(this.userservice.getUser()?.id)
    this.cartservice.allProductsInCart2(this.userservice.getUser()?.id);
    this.cartservice.$productInCart2.subscribe((order) => {this.ordergetid = order})
 
  }
 
  ordergetid: Order;
 
  cart: Cart = {
    price: 0,
    quantity: 1,
    productid: 0,
    userid: 0,
    orderId: 0,
    imageUrl: '',
    productName: ''
  }
  @Input() public product!: Product;
  // @Output() public onBuyProduct: EventEmitter<Product> = new EventEmitter<Product>();
 
  public buyProduct() {
    // this.onBuyProduct.emit();
    this.cart.price = this.product.price
    this.cart.productid = this.product.id
    this.cart.userid = this.userservice.getUser()?.id;
    this.cart.orderId = this.ordergetid.id
    this.cartservice.addProductToCart(this.cart);
  }
}