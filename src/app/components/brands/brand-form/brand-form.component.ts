import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import Brand from '../../../types/brand';
import { BrandService } from '../../../services/brand.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-brand-form',
  imports: [MatFormFieldModule, MatButtonModule, MatInputModule, FormsModule],
  templateUrl: './brand-form.component.html',
  styleUrl: './brand-form.component.scss',
})
export class BrandFormComponent {
  brandService = inject(BrandService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  brand!: Brand;

  name!: string;

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    console.log(id);
    if (id) {
      this.brandService.getBrandID(id).subscribe((res) => {
        this.brand = res;
        this.name = res.name;
      });
    }
  }

  addBrand() {
    if (!this.name) {
      alert('Add Valid Brand Name'); // Later will add toast notification instead of this
      return;
    }
    let brand: Brand = {
      name: this.name,
    };

    this.brandService.addBrand(brand).subscribe((res) => {
      alert('Brand Added Successfully');
      this.router.navigateByUrl('/brands');
    });
  }

  // Function to update the brand name
  updateBrand() {
    if (!this.name) {
      alert('Add Valid Brand Name'); // Later will add toast notification instead of this
      return;
    }
    let brand: Brand = {
      id: this.brand.id,
      name: this.name,
    };

    this.brandService.updateBrand(brand).subscribe((res) => {
      alert('Brand Updated Successfully');
      this.router.navigateByUrl('/brands');
    });
  }
}
