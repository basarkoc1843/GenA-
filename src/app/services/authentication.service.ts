import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationClient } from '../clients/authentication.client';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private tokenKey= 'token'
  private userId='userId';
 

  constructor(private authenticationClient:AuthenticationClient,
    private router:Router
    ) { }

  public login(email:string,password:string):any{
    this.authenticationClient.login(email,password).subscribe((token)=> {
      localStorage.setItem(this.tokenKey,token['token'])
      localStorage.setItem(this.userId,token['userId'])
      let spinner=document.querySelector('sa-spinner-round-outlined ') as HTMLElement
      spinner?.style.setProperty('display','none')
      this.router.navigate(['/content']);
    })
   
  }
  
  public logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userId)
    this.router.navigate(['/login']);
  }

  public sendFeedback(rateQuality:string,userExperience:string){
    console.log("Test")

    
    try{
      this.authenticationClient.feedback(rateQuality,userExperience).subscribe((res)=>{
      
        
      },(err)=>{
        console.log(rateQuality,userExperience)
        let spinner=document.getElementById('spinner') as HTMLElement
        spinner?.style.setProperty('display','none')
      })

    }catch{
      console.log("Girdi catche")
        

    }
   

    
    
    
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem(this.tokenKey);
    return token != null && token.length > 0;
  }
  public getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
  }

}
