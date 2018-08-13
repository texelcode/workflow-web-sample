import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  id: number;
  constructor(
    public router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = +localStorage.getItem('user_id');
    this.router.navigate(['/user', this.id]);
  }

}
