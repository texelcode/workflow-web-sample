import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  isLogedIn = false;
  constructor(private events: EventService) { }

  ngOnInit() {
    this.events.userLogin.subscribe(logedIn => {
      this.isLogedIn = logedIn;
    });
  }

}
