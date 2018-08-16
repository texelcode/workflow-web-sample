import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ConnectionService } from '../../services/connection.service';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {
  connected = false;
  ipaddress = 'localhost:8091';
  private readonly notifier: NotifierService;
  constructor(
    public router: Router,
    private connection: ConnectionService,
    notifierService: NotifierService) {
      this.notifier = notifierService;
    }

  ngOnInit() {
  }

  test() {
    this.connection.test(this.ipaddress).subscribe(
      (res) => {
        this.connected = res.ok;
        if (res.ok) {
          this.notifier.notify( 'success', 'Connection success!' );
          this.router.navigateByUrl('/login');
          console.log('Connected with host : ' + this.ipaddress);
        } else {
          this.notifier.notify( 'error', 'Connection denied!' );
        }

      },
      (err) => {
        this.notifier.notify( 'error', 'Connection test error!' );
        console.log(err);
      }
    );

  }

  onCancel() {
    this.router.navigateByUrl('/login');
  }

}
