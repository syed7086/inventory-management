import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BrandsComponent } from './components/brands/brands.component';
import { BrandFormComponent } from './components/brands/brand-form/brand-form.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductFormComponent } from './components/products/product-form/product-form.component';

export const routes: Routes = [
    {
        path:'',
        component: HomeComponent
    },
    {
        path:'brands',
        component:BrandsComponent
    },
    {
        path:'brands/add',
        component:BrandFormComponent
    },
    {
        path:'brands/:id',
        component:BrandFormComponent
    },
    {
        path:'products',
        component:ProductsComponent
    },
    {
        path:'products/add',
        component:ProductFormComponent
    },
    {
        path:'products/:id',
        component:ProductFormComponent
    }
];
