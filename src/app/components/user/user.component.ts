import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: User;
  users: User[] = [];
  id: number;
  name: string;
  email: string;
  private sub: any;
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private service: UserService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.getUser(this.id);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getUser(userId: number) {
    this.service.load().subscribe(
      (res) => {
        this.users = JSON.parse(JSON.stringify(res.data));
        for (const use of this.users) {
          if (userId === use.id) {
            this.user = use;
            break;
          }
        }
      },
      (err) => console.log(err)
    );
  }

  onBack() {
    this.router.navigateByUrl('/user');
  }

}
