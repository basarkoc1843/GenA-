import { Component, Input, OnInit, Output,EventEmitter, ViewChild, ElementRef, ViewChildren } from '@angular/core';
import { trigger, style,state, animate, transition } from '@angular/animations';

import {ChatService, Message } from '../services/chat.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ViewportScroller } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';
import { TestService } from '../services/test.service';




@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
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
export class ContentComponent implements OnInit {
  checkChat:boolean=true
  checkFeedback:boolean=false
  checkMessage:boolean=false
  checkMessage1:boolean=true
  checkContentMessage:boolean=true
  checkService:boolean=true
  checkTest:boolean=false
  UserMessage:Message[]=[]
  Message:Message[]=[]
  // ChatMessage:ChatMessage[]=[]
  value:any;
  deneme?:SafeHtml;

  content:any
  container!: HTMLElement; 
  

  

  constructor(public chatService: ChatService,private _sanitizer: DomSanitizer,private authenticationService:AuthenticationService,private closeService:TestService) { }
  ngAfterViewInit() {        
         
  }
 

 

  ngOnInit(): void {
    this.closeService.change.subscribe(emitedValue=> {
      
      let content = document.getElementById('content') as HTMLElement;
      content?.classList.remove('yellow')
      this.checkFeedback=!emitedValue;
     
      this.checkContentMessage=!this.checkContentMessage;
      this.checkMessage=!this.checkMessage
    })
    this.content=document.getElementById('content')
    setTimeout(function(){
      let prop = document.getElementById('footer-beginner') as HTMLElement;
      prop?.classList.add('default')

      
    }, 2000)
    console.log("TESTTTTTTTTTTTTT")
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
  // onclick() {
  //   this.visible = !this.visible
  //   this.width=71.97;
  //   if(this.test ===true) {
  //     this.test=false
  //   }else {
  //     this.test=true
  //   }
    
  // }
  // clickSuggest() {
    
    
  //   if(this.visible2) {
  //     this.top=86;
  //   }else {
  //     this.top=64;
  //   }
  //   this.visible2=!this.visible2
    

  // }
  startChat(){
    let name = document.getElementById('sidebar') as HTMLElement;
    name?.style.setProperty('transition','height 4s')
    name?.style.setProperty('display','flex')

    let assistant = document.getElementById('assistant') as HTMLElement;
    assistant?.style.setProperty('display','none')

    let chat = document.getElementById('chat') as HTMLElement;
    chat?.style.setProperty('display','flex')
  }

  checkStart(){
    this.checkChat=!this.checkChat
    this.checkMessage=!this.checkMessage
    this.checkMessage1=!this.checkMessage1
    this.checkService=!this.checkService

  }
  endMeeting(){

    let content = document.getElementById('content') as HTMLElement;
    content?.classList.add('yellow')
    this.checkFeedback=!this.checkFeedback;
    this.checkContentMessage=!this.checkContentMessage;
    this.checkMessage=!this.checkMessage

    if(this.checkFeedback === true){
      let content= document.getElementsByClassName('contain')
      console.log(content)
    }

    
    
    
  }
  closeFeedback(){
    let content = document.getElementById('content') as HTMLElement;
    content?.classList.remove('yellow')
    this.checkFeedback=!this.checkFeedback;
   
    this.checkContentMessage=!this.checkContentMessage;
    this.checkMessage=!this.checkMessage
    
  }

  sidebarover(){
    let footer = document.getElementById('footer') as HTMLElement
    let content = document.getElementById('content') as HTMLElement;
    let sidebar = document.getElementById('sidebar') as HTMLElement;
    sidebar?.classList.add('active')
    content?.classList.add('active')
    footer?.classList.add('active')
  }
  sidebarleave(){
    let footer = document.getElementById('footer') as HTMLElement
    let content = document.getElementById('content') as HTMLElement;
    let sidebar = document.getElementById('sidebar') as HTMLElement;
    sidebar?.classList.remove('active')
    content?.classList.remove('active')
    footer?.classList.remove('active')
  }
  displaySuggestions(){
    this.checkTest = !this.checkTest
    let display = document.getElementById('display') as HTMLElement;
    let hidden = document.getElementById('hidden') as HTMLElement;
    display?.classList.toggle('active');
    hidden.classList.toggle('active')
  }
  sendMessage(){
    this.chatService.getBotAnswer(this.value);
    
    console.log(this.value)
    this.value=''
   
  }
  sendMessageBeginner(){
    this.checkChat=!this.checkChat
    this.checkMessage=!this.checkMessage
    this.checkMessage1=!this.checkMessage1
    this.checkService=!this.checkService
    this.chatService.getBotAnswer(this.value);
    console.log(this.value)
    this.value=''

  }
  suggestionChat(event:any){
    console.log(event)
    let x=document.getElementById(`${event}`)?.innerHTML
    this.value=x
    this.checkChat=!this.checkChat
    this.checkMessage=!this.checkMessage
    this.checkMessage1=!this.checkMessage1
    this.checkService=!this.checkService
    this.chatService.getBotAnswer(this.value);
    console.log(this.value)
    this.value=''

  }
  sendFeedback(){
    console.log("Bruada")
    this.authenticationService.sendFeedback("good","it was perfect")
  }
  logout(){
    this.authenticationService.logout()
    
  }

 
}
