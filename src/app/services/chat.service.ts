import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { environment } from 'src/environments/environment.prod';




export class Message {
  constructor(public name: string,public date:string, public content: string) {}
}

// export class ChatMessage {
//   constructor(public name: string,public date:string, public content: string) {}
// }



@Injectable({
  providedIn: 'root'
})
export class ChatService {
  
  audioFile = new Audio(
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/success.mp3"
  );

  constructor(private http:HttpClient) { }
  conversation = new Subject<Message[]>();
  // conversationChat= new Subject<ChatMessage[]>();

  messageMap = {
    Hi: "Hello",
    "Who are you": "My name is Agular Bot",
    "What is Angular": "Angular is the best framework ever",
    default: "I can't understand. Can you please repeat"
  };


  async getBotAnswer(msg: string) {
    let userId=localStorage.getItem('userId')
    
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrb2NkaWdpdGFsIiwiaWF0IjoxNzA3MTcwMTA5LCJleHAiOjE3MDcxNzYxMDl9.1jglT-bVXYXK75vffPe7Vgp-8AW5WV1gFNpgHoaEgZLsuCy7yLXtFBXF9munnBYDphrVx5rf4S57SNr1m5bk2Q`,
        })
      };
    let body= JSON.stringify("{\"question\": \"Who is Atatürk\"}")
   
    const userMessage = new Message("user","07:56 PM", msg);
    this.conversation.next([userMessage]);
   
   
    // const botMessage = new ChatMessage("Service Asistant","07:56 PM", this.getBotMessage(msg));
    
    let data={
      userId:userId,
      serviceId:1,
      message:`${msg}`
    }
    let result:any
    
    //const botMessage = new Message('bot',"07:56", this.getBotMessage(msg));

    const rest=await fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    
    
    await this.http.post(environment.askUrl,data).toPromise().then(res=>result=res)
    

    const botMessage = new Message('bot',"07:56",result['result']);
    setTimeout(()=>{
      this.conversation.next([botMessage]);
    },2500)
    
    
    
   

    
    
      

     
   
      
      
    
      
  }


 
  getBotMessage(question: string) {
    let answer = this.messageMap[question];
    return answer || this.messageMap["default"];
  }
}
