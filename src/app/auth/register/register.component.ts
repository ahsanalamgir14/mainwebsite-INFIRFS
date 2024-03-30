import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  
  public registerForm: FormGroup;
  
  constructor(private fb: FormBuilder, private authService: AuthService){
 
  }
 
 
  ngOnInit(): void {
 
    this.registerForm = this.fb.group({
      email: ['', [Validators.email, Validators.required, Validators.maxLength(64), Validators.minLength(5)]],
      password: ['', [Validators.minLength(8), Validators.maxLength(128)]],
      repeated_password: ['']
    });
  }
 
  
    public onSubmit(): void {
    if (this.registerForm.valid) {
      const authRequest = {
        email: this.registerForm.value.email,
        password: this.registerForm.value.password
      };
 
      this.authService.register(authRequest).subscribe(
        () => {
          // Registration successful
          console.log('Registration successful');
          this.authService.saveUser(authRequest).subscribe((result)=>{
            console.warn(result)
          })
          // Optionally, you can redirect the user to a different page or display a success message.
        },
        error => {
          // Registration failed, handle the error
          console.error('Registration failed:', error);
          // Optionally, you can display an error message to the user.
        }
      );
    } else {
      // Form is invalid, do not submit or handle accordingly
      console.log('Form is invalid');
      // Optionally, you can display a message to the user indicating that the form is invalid.
    }
 
 
 
  }
}