import { Component, OnInit } from '@angular/core';
import { ContainerComponent } from '../../components/container/container.component';
import { ListComponent } from '../../components/list/list.component';
import { ApiService } from '../../service/api.service';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    ContainerComponent,
    ListComponent,
    FooterComponent,
    FooterComponent
],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit{

  options:any[] = [];
  value:any = {};

  constructor(
    private apiService:ApiService,
    private router: Router,
  ){}

  ngOnInit() {
    this.loadListProduct();
  }

  async loadListProduct(){
    try{
    this.options = [];
    const observable = this.apiService.getListProduct();
    const data = await firstValueFrom(observable);
      for (const value of data) {
        value.img = 'img/laranja.jpeg';
        this.options.push(value);
      }
    }
    catch(error){
      console.error('Erro', error);
    }
  }

  checkedDelete(value:any){

  }

  clicknNewProduct(){
    this.router.navigate(['/add-new-product'])
  }
  

}
