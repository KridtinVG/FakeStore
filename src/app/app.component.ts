import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'FakeStore';
  username = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.syncUsername();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.syncUsername();
      });
  }

  get isLoggedIn(): boolean {
    return !!this.username;
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.username = '';
    localStorage.removeItem('username');
    this.router.navigate(['/']);
  }

  private syncUsername(): void {
    this.username = localStorage.getItem('username') || '';
  }
}
