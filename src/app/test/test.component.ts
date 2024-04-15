import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { trigger, style,state, animate, transition } from '@angular/animations';

import { AuthenticationService } from '../services/authentication.service';
import { ChatService, Message } from '../services/chat.service';
import { TestService } from '../services/test.service';
import { SharedService } from '../services/shared.service';

import * as $ from 'jquery'; 

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  
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
export class TestComponent implements OnInit {

  
  checkFeedback:boolean=false
  userExperience:string=''
  rateQuality:string=''
  
 
 
  
  
  

  

  constructor(public chatService: ChatService,private closeService:TestService,private sharedService:SharedService,private authenticationService:AuthenticationService) {
    
   }

  
  @Output() newItemEvent = new EventEmitter<string>();
  

  ngOnInit(): void {
   
    let me=this
    $('.user-body .user-feedback .user-feedback-item').click(function(e) {
      if(!($(this).parent().hasClass('focused'))) {
            
           
        // $(this).parent().parent().find('.menu').slideUp('fast')
        $(this).parent().find('.user-feedback-item').removeClass('focused')
    }
    $(this).addClass('focused')
    $(this).parent().parent().addClass('toggle')
  })


  $('.user-body .user-feedback .user-feedback-item .feedback-content').click(function(e) {
   
    me.rateQuality=$(this).text().valueOf()
   
   
    
   
  })



  
    
        
  }



 


  closeFeedback(){
    
    this.sharedService.sharedCloseFeedback(false)
    this.sharedService.sharedChat(true)
    
    
  }

  sendFeedback() {
    let spinner=document.getElementById('spinner') as HTMLElement
    spinner.style.display='flex'
    this.authenticationService.sendFeedback(this.rateQuality,this.userExperience)
    this.userExperience=''
    this.removeFocusedClass()
   


    
  }

  removeFocusedClass(){
    let data=document.querySelector('.user-feedback-item.focused');
    data?.classList.remove('focused')
  }


  


  

}
