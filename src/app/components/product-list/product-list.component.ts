import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/app/models/product.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: IProduct[] = [];
  selectedProducts: (IProduct & { quantity: number })[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadSelectedProducts();

    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  private loadSelectedProducts(): void {
    const stored = localStorage.getItem('selectedProducts');
    if (stored) {
      try {
        this.selectedProducts = JSON.parse(stored);
      } catch {
        this.selectedProducts = [];
      }
    }
  }

  private saveSelectedProducts(): void {
    localStorage.setItem(
      'selectedProducts',
      JSON.stringify(this.selectedProducts),
    );
  }

  ShowID(Pid: number): void {
    console.log('Product ID: ', Pid);
  }

  selectProduct(product: IProduct): void {
    const existing = this.selectedProducts.find((p) => p.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.selectedProducts.push({ ...product, quantity: 1 });
    }
    this.saveSelectedProducts();
  }

  removeProduct(productId: number): void {
    this.selectedProducts = this.selectedProducts.filter(
      (p) => p.id !== productId,
    );
    this.saveSelectedProducts();
  }

  changeQuantity(productId: number, delta: number): void {
    const item = this.selectedProducts.find((p) => p.id === productId);
    if (!item) {
      return;
    }

    item.quantity = Math.max(1, item.quantity + delta);
    this.saveSelectedProducts();
  }

  getTotalPrice(): number {
    return this.selectedProducts.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  }
}
