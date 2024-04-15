import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  checkIntro:boolean=true;
  checkChat:boolean=true;

  constructor(private sharedService:SharedService) { }

  ngOnInit(): void {
  }

  logout(){

  }
  sidebarover(){
    let sidebar = document.getElementById('sidebar') as HTMLElement;
    sidebar?.classList.add('active')

    this.sharedService.sharedAddActive('active')
    
   
  }
  sidebarleave(){
    let sidebar = document.getElementById('sidebar') as HTMLElement;
    sidebar?.classList.remove('active')
    this.sharedService.sharedAddActive('remove')
   
  }
  mouseup(){
    let service = document.getElementById('service') as HTMLElement;
    service?.classList.toggle('active')

    let itemDesc = document.getElementById('item-desc') as HTMLElement;
    itemDesc?.classList.toggle('active')

    this.checkIntro=!this.checkIntro
    this.sharedService.sharedIntro(this.checkIntro)

    
    this.sharedService.sharedChat(this.checkChat)
    this.checkChat=!this.checkChat;
    
    
  }
 

}
