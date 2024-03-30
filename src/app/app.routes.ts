import { Routes } from '@angular/router';
 
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
 
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  // { path: 'categories', component: CategoriesComponent, canActivate: [authGuard] },
  { path: 'cart', component: CartComponent },
  {path: 'auth/login', component: LoginComponent },
  {path: 'auth/register', component: RegisterComponent},
  // {
  //   path: 'auth', children: [
  //     { path: 'login', component: LoginComponent },
  //     // { path: 'register', component: RegisterComponent }
  //     // { path: 'logout', }
  //   ]
  // }
  //{path: 'unprotected', component: UnprotectedComponent },
  //{//path: 'protected', component: ProtectedComponent, canActivate: [authGuard] },
  
];
 