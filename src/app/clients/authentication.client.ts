import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationClient {
  constructor(private http: HttpClient) {}

 public login(email: string, password: string): Observable<any> {
    console.log("Service",email,password)
    console.log("Sonuç",this.http.post(environment.apiUrl + '/login',{
      userName:email,
      password:password
    }).toPromise().then(res=>console.log("Res",res)))
    
    return this.http.post(environment.apiUrl + '/login',{
      userName:email,
      password:password
    });
  }

  public register(
    username: string,
    email: string,
    password: string
  ): Observable<string> {
    return this.http.post(
      environment.apiUrl + '/user',
      {
        username: username,
        email: email,
        password: password,
      },
      { responseType: 'text' }
    );
  }

  public feedback(rateQuality:string,userExperience:string):Observable<any>{
    let userId=localStorage.getItem('userId')
    console.log("feedback",userId)
    let data={
      serviceId:1,
      userId:userId,
      rateQuality:rateQuality,
      userExperience:userExperience
    }
    return this.http.post(environment.feedbackUrl,data)

  }
}