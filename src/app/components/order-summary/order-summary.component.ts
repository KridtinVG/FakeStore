import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css'],
})
export class OrderSummaryComponent implements OnInit {
  order: any = null;
  items: any[] = [];
  total = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const raw = localStorage.getItem('currentOrder');
    if (!raw) {
      // no order stored — go back to products
      this.router.navigate(['/']);
      return;
    }

    try {
      this.order = JSON.parse(raw);
      this.items = this.order.items || [];
      this.total =
        this.order.total ||
        this.items.reduce(
          (s: number, it: any) => s + it.price * it.quantity,
          0,
        );
    } catch {
      this.router.navigate(['/']);
    }
  }
}
