import { Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductAddComponent } from './pages/product-add/product-add.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'list-product',
        pathMatch: 'full'
    },
    {
        path: 'list-product',
        component: ProductListComponent
    },
    {
        path: 'add-new-product',
        component: ProductAddComponent
    }
];
