import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private tokenKey= 'token'

  constructor(private authenticationClient:AuthenticationService,
    private router:Router
    ) { }

  public login(email:string,password:string):any{
    this.authenticationClient.login(email,password).subscribe((token)=> {
      localStorage.setItem(this.tokenKey,token)
      this.router.navigate(['/content']);
    })
  }
  
  public logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem(this.tokenKey);
    return token != null && token.length > 0;
  }


  @Output() change: EventEmitter<any> = new EventEmitter();

  sendData(data: any): any {
    this.change.emit(data);
  }
  
}
