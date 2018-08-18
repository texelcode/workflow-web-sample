import { Injectable, Output, EventEmitter  } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  isOpen = false;

  @Output() change: EventEmitter<boolean> = new EventEmitter();
  constructor() { }
  toggle() {
    this.isOpen = !this.isOpen;
    this.change.emit(this.isOpen);
  }

  getChange() {
    return this.change;
  }
}
