import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from '../../services/connection.service';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {
  public connected: Boolean = false;
  public ipaddress: 'localhost:8091';
  constructor(public router: Router, private connection: ConnectionService) { }

  ngOnInit() {
  }

  test() {
    this.connection.test(this.ipaddress).subscribe(
      (res) => {
        this.connected = res.ok;
        this.router.navigateByUrl('/login');
        console.log('Connected with host : ' + this.ipaddress);
      },
      (err) => console.log(err)
    );

  }

  onCancel() {
    this.router.navigateByUrl('/login');
  }

}
