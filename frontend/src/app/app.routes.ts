import { Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';
import {  ProductItemComponent } from './pages/product-item/product-item.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'lista-produtos',
        pathMatch: 'full'
    },
    {
        path: 'lista-produtos',
        component: ProductListComponent
    },
    {
        path: 'novo-produto',
        component: ProductItemComponent
    },
    {
        path: 'alterar-produto/:id',
        component: ProductItemComponent
    },
    {
        path: 'detalhar-produto/:id',
        component: ProductItemComponent
    }
];
