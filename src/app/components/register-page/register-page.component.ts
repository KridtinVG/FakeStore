import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(7)]],
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{9,10}$/)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { username, password, fullName, address, phone, email } =
        this.registerForm.value;
      this.http
        .post('http://localhost:3000/api/register', {
          username,
          password,
          fullName,
          address,
          phone,
          email,
        })
        .subscribe({
          next: (response: any) => {
            alert('สมัครสมาชิกสำเร็จ! ข้อมูลถูกบันทึกไปที่หลังบ้านเรียบร้อย');
            this.registerForm.reset();
          },
          error: (error) => {
            alert('เกิดข้อผิดพลาด: ' + error.error.message);
          },
        });
    }
  }
}
