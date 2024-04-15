import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  checkIntro:boolean=true
  checkFeedback:boolean=false
  checkChat:boolean=false

  constructor(private sharedService:SharedService) { }

  ngOnInit(): void {
    this.sharedService.checkIntro.subscribe(eventedEmit=> {
      this.checkIntro=eventedEmit
    })
    this.sharedService.checkHover.subscribe(eventedEmit=>{
      if(eventedEmit === 'active') {
        let intro = document.getElementById('intro') as HTMLElement;
        intro?.classList.add('active')
      }else {
        let intro = document.getElementById('intro') as HTMLElement;
        intro?.classList.remove('active')
      }
    })

    this.sharedService.checkFeedback.subscribe(evetedEmit => {
      this.checkFeedback=evetedEmit;
    })

    this.sharedService.checkChat.subscribe(evetedEmit=> {
      console.log("Eveted",evetedEmit)
      this.checkChat=evetedEmit;
    })
  }

}
