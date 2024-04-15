import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  @Output() checkIntro: EventEmitter<any> = new EventEmitter();

  @Output() checkHover: EventEmitter<any> = new EventEmitter();

  @Output() checkFeedback: EventEmitter<any> = new EventEmitter();

  @Output() checkChat: EventEmitter<any> = new EventEmitter();

  sharedIntro(data: any): any {
    this.checkIntro.emit(data);
  }

  sharedAddActive(data:any){
    this.checkHover.emit(data);
  }
  sharedCloseFeedback(data:any){
    this.checkFeedback.emit(data);
  }

  sharedChat(data:any){
    this.checkChat.emit(data)

  }

  

  constructor() { }
}
