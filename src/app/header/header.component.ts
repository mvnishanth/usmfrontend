import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../services/authenticate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  hidden: boolean = false;

  constructor(public router: Router,public authenticationService: AuthenticateService) { }
logtype:any;
  ngOnInit() {
    this.logtype=localStorage.getItem('Designation')
  }
  logout() {
    this.authenticationService.getCall();

    localStorage.clear();
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}
