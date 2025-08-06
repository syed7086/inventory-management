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
import { ActivatedRoute, Router } from '@angular/router';

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
  route = inject(ActivatedRoute);
  brands: Brand[] = [];
  product!: Product;

  ngOnInit() {
    // Fetching the ID to edit in the DB
    const id = this.route.snapshot.params['id'];
    console.log(id);

    if (id) {
      this.productService.getProductId(id).subscribe((res) => {
        this.product = res;
        this.productForm.patchValue(this.product);
      });
    }

    // Getting all the Brands
    this.brandService.getBrands().subscribe((res) => (this.brands = res));
  }

  // Reactive From for Product Template
  productForm: FormGroup = this.builder.group({
    name: ['', Validators.required],
    details: [''],
    brandId: ['', Validators.required],
    purchasePrice: ['', Validators.required],
    salePrice: ['', Validators.required],
    availableQuantity: ['', [Validators.required]],
  });

  // Add Product Functionality
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

  // Update Product Functionality
  updateProduct() {
    if (this.productForm.invalid) {
      alert('Enter valid details of the product');
      return;
    }

    let product: Product = this.productForm.value;
    this.productService
      .updateProduct(this.product.id!, product)
      .subscribe((res) => {
        alert('Product updated successfully!!');
        this.router.navigateByUrl('/products');
      });
  }
}
