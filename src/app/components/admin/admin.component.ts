import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  tabs: any[] = [
    { title: 'User', content: 'user' },
    { title: 'User Group', content: 'user group' },
    { title: 'Job', content: 'job' },
    { title: 'Job Group', content: 'job group' },
    { title: 'Organization', content: 'organization' }
  ];
  constructor() { }

  ngOnInit() {
    this.tabs[0].active = true;
  }

}
