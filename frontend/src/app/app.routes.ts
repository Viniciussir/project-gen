import { Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'list-product',
        pathMatch: 'full'
    },
    {
        path: 'list-product',
        component: ProductListComponent
    }
];
