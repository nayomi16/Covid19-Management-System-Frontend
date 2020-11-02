import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  islogged: boolean;
  // clickEventsubscription: Subscription;
  // constructor(private router: Router) {
  //
  //   // this.clickEventsubscription = this.sharedService.getClickEvent().subscribe(() => {
  //   //   this.islogged = true;
  //   // });
  // }

  ngOnInit(): void {
  }

  logout() {
    // this.authservice.logout();
    this.islogged = false;
    // this.router.navigate(['/home']);
  }
}
