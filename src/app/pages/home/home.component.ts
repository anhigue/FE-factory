import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  url: string[];

  loggedIn: boolean;

  constructor(
    private router: Router,
  ) {
    this.getUrlTags();
  }

  async ngOnInit() {}

  getUrlTags(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.url = event.url.split('/');
      }
    });
  }
}
