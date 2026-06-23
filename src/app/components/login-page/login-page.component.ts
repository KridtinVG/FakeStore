import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(7)]],
    });
  }
  onSubmit(): void {
    if (
      this.loginForm.value.username === 'admin' &&
      this.loginForm.value.password === 'Admin123'
    ) {
      const currentUser = {
        username: 'admin',
        shipping: {
          fullName: 'Admin User',
          address: 'Night city, arasaka tower,2077',
          phone: '0123456789',
          email: 'admin@example.com',
        },
      };
      localStorage.setItem('username', currentUser.username);
      localStorage.setItem('userData', JSON.stringify(currentUser.shipping));
      alert('เข้าสู่ระบบสำเร็จ! ยินดีต้อนรับ admin');
      this.loginForm.reset();
      this.router.navigate(['/']);
      return;
    }

    const { username, password } = this.loginForm.value;
    this.http
      .post('http://localhost:3000/api/login', { username, password })
      .subscribe({
        next: (response: any) => {
          const loggedInUsername = response.username || username;
          localStorage.setItem('username', loggedInUsername);
          alert('เข้าสู่ระบบสำเร็จ! ยินดีต้อนรับ ' + loggedInUsername);
          this.loginForm.reset();
          this.router.navigate(['/']);
        },
        error: (error) => {
          alert('เกิดข้อผิดพลาด: ' + error.error.message);
        },
      });
  }
  registerLink(): void {
    this.router.navigate(['/register']);
  }
}
