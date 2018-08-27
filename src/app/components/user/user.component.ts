import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy, AfterViewInit {

  user: User;
  users: User[] = [];
  id: number;
  name: string;
  email: string;
  private sub: any;
  private readonly notifier: NotifierService;
  constructor(
    private changeDetector: ChangeDetectorRef,
    public router: Router,
    private route: ActivatedRoute,
    private service: UserService,
    private notifierService: NotifierService,
    private loading: SlimLoadingBarService) {
      this.notifier = notifierService;
    }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.loading.start();
    this.getUser(this.id);
  }

  ngAfterViewInit() {
    this.changeDetector.detectChanges();
    this.loading.complete();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getUser(userId: number) {
    this.service.load().subscribe(
      (res) => {
        this.users = JSON.parse(JSON.stringify(res.data));
        this.user = this.users.find(x => x.id === userId);
        // for (const use of this.users) {
        //   if (userId === use.id) {
        //     this.user = use;
        //     break;
        //   }
        // }
      },
      (err) => {
        this.notifier.notify( 'error', 'User loading error!' );
        console.log(err);
      }
    );
  }

  onBack() {
    this.router.navigateByUrl('/user');
  }

}
