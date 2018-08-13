import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  user: User;
  users: User[] = [];
  rows: Array<any> = [];
  loadingIndicator = true;
  reorderable = true;
  selected: User[] = [];
  columns = [
    { name: 'ID', width: 50, minWidth: 50, maxWidth: 50, canAutoResize: false},
    { name: 'Name', width: 400, minWidth: 100, maxWidth: 500, canAutoResize: true},
    { name: 'Email', width: 1000, minWidth: 600, maxWidth: 1200, canAutoResize: true}
  ];

  // iconsCss = {
  //   sortAscending: 'fa fa-angle-down',
  //   sortDescending: 'fa fa-angle-up',
  //   pagerLeftArrow: 'fa fa-angle-double-left',
  //   pagerRightArrow: 'fa fa-angle-double-right',
  //   pagerPrevious: 'fa fa-angle-left',
  //   pagerNext: 'fa fa-angle-right' };

  constructor(
    public router: Router,
    private service: UserService) { }

  ngOnInit() {
    this.service.load().subscribe(
      (res) => {
        this.users = JSON.parse(JSON.stringify(res.data));
        this.rows = this.users;
      },
      (err) => console.log(err)
    );
  }


  addItem() {
    this.router.navigateByUrl('/add-user');
  }

  // onSelect(usr: User) {
  //   this.router.navigate(['/user', usr.id]);
  // }

  public onCellClick(data: any): any {
    console.log(data);
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);
    this.user = this.selected[0];
    console.log('Select User', this.user);
    this.router.navigate(['/user', this.user.id]);
  }

  onActivate(event) {
    console.log('Activate Event', event);
  }

}
