import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from '../services/chat.service';
import { SharedService } from '../services/shared.service';
import { trigger, style,state, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ],
      
    ),
    trigger(
      'enterAnimationn', [
        transition(':enter', [
          style({transform: 'translateX(0%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateX(0%)', opacity: 0}))
        ])
      ],
      
    )
 
  ]
})
export class ChatComponent implements OnInit {
  Message:Message[]=[]
  container!: HTMLElement;
  value:any;
  

  constructor(private chatService: ChatService,private sharedService:SharedService) { }

  ngOnInit(): void {


    this.chatService.conversation.subscribe((val) => {
      
      let sayac=0;
       val.forEach(function(val){
        if(val.name==='bot'){
          sayac=0;
        
          
        }else {
          
          sayac=sayac+1
        }
       })
       if(sayac === 0){
        console.log("Bot")
        
        this.Message=this.Message.concat(val)
       
        
        // this.deneme= this._sanitizer.bypassSecurityTrustHtml(``);
       }else {
        console.log("User")
       
        this.Message=this.Message.concat(val)
        
        // this.deneme= this._sanitizer.bypassSecurityTrustHtml(``);
       
  
       }
       console.log("Scrool height",this.container.scrollHeight)
       this.container=document.getElementById("content") as HTMLElement;           
      this.container.scrollTop = this.container.scrollHeight;
  
      });
     
  }

  endMeeting(){
    console.log("End meeting")
    this.sharedService.sharedCloseFeedback(true);
    this.sharedService.sharedChat(false)

  }
  sendMessage(){
    console.log("?????????")
    this.chatService.getBotAnswer(this.value);
    
    console.log(this.value)
    this.value=''
   
  }

}
