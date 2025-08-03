import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BrandService } from '../../services/brand.service';
import { OrderService } from '../../services/order.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  imports: [MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  totalProducts!: number;
  totalOrders!: number;
  totalBrands!: number;

  brandService = inject(BrandService);
  orderService = inject(OrderService);
  productService = inject(ProductService);

  ngOnInit() {
    this.brandService
      .getBrands()
      .subscribe((res) => (this.totalBrands = res.length));

    this.orderService
      .getOrders()
      .subscribe((res) => (this.totalOrders = res.length));

    this.productService
      .getProducts()
      .subscribe((res) => (this.totalProducts = res.length));
  }
}
