import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  sidebarOpen = false;

  @Output() sidebarChange: EventEmitter<boolean> = new EventEmitter();
  @Output() userLogin: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  sidebarToggle() {
    this.sidebarOpen = !this.sidebarOpen;
    this.sidebarChange.emit(this.sidebarOpen);
  }

  logedIn(logedIn: boolean) {
    this.userLogin.emit(logedIn);
  }

}
