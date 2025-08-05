import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Product from '../../../types/product';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { BrandService } from '../../../services/brand.service';
import Brand from '../../../types/brand';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent {
  builder = inject(FormBuilder);
  brandService = inject(BrandService);
  productService = inject(ProductService);
  router = inject(Router);
  brands: Brand[] = [];
  ngOnInit() {
    this.brandService.getBrands().subscribe((res) => (this.brands = res));
  }
  productForm: FormGroup = this.builder.group({
    name: ['', Validators.required],
    details: [''],
    brandId: ['', Validators.required],
    purchasePrice: ['', Validators.required],
    salePrice: ['', Validators.required],
    availableQuantity: ['', [Validators.required]],
  });

  addProduct() {
    console.log(this.productForm.value);
    if (this.productForm.invalid) {
      alert('Enter all the details');
      return;
    }
    let product: Product = this.productForm.value;

    this.productService.addProduct(product).subscribe((res) => {
      alert('Product added successfully!!');
      this.router.navigateByUrl('/products');
    });
  }
}
