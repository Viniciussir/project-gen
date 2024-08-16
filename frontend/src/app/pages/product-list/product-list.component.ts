import { Component } from '@angular/core';
import { ContainerComponent } from '../../components/container/container.component';
import { ListComponent } from '../../components/list/list.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    ContainerComponent,
    ListComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {

  options:any[] = [];
  value:string = '';

}
