import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import Brand from '../types/brand';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  httpClient = inject(HttpClient);
  constructor() {}
  getBrands() {
    return this.httpClient.get<Brand[]>(environment.apiUrl + '/brands');
  }
  addBrand(brand: Brand) {
    return this.httpClient.post<Brand>(environment.apiUrl + '/brands', brand);
  }

  getBrandID(brandId: string) {
    return this.httpClient.get<Brand>(
      environment.apiUrl + '/brands/' + brandId
    );
  }

  updateBrand(brand: Brand) {
    return this.httpClient.put<Brand>(
      environment.apiUrl + '/brands/' + brand.id,
      brand
    );
  }
}
