import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import Product from '../types/product';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  httpClient = inject(HttpClient);
  constructor() {}

  getProducts() {
    return this.httpClient.get<Product[]>(environment.apiUrl + '/products');
  }

  addProduct(product: Product) {
    return this.httpClient.post<Product>(
      environment.apiUrl + '/products',
      product
    );
  }

  getProductId(productId: string) {
    return this.httpClient.get<Product>(
      environment.apiUrl + '/products/' + productId
    );
  }

  updateProduct(productId: string, product: Product) {
    return this.httpClient.put<Product>(
      environment.apiUrl + '/products/' + productId,
      product
    );
  }
}
