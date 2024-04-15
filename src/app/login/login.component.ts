import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  // public authenticationServicee:AuthenticationService;

  constructor(private authenticationService: AuthenticationService) {
    // this.authenticationServicee=authenticationService
   }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    let spinner=document.querySelector('sa-spinner-round-outlined ') as HTMLElement
    spinner?.style.setProperty('display','none')
    
   
  }

  async send(){
    
    let spinner=document.querySelector('sa-spinner-round-outlined ') as HTMLElement
    spinner?.style.setProperty('display','flex')
   
    await this.authenticationService.login(
      this.loginForm.get('email')!.value,
      this.loginForm!.get('password')!.value
    );
    
  }

}
