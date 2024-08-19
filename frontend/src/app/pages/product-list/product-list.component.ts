import { Component, OnInit } from '@angular/core';
import { ContainerComponent } from '../../components/container/container.component';
import { ListComponent } from '../../components/list/list.component';
import { ApiService } from '../../service/api.service';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FooterComponent } from "../../components/footer/footer.component";
import { MessageComponent } from '../../components/message/message.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    ContainerComponent,
    ListComponent,
    FooterComponent,
    FooterComponent,
    MessageComponent
],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit{

  options:any[] = [];
  value:any = {};

  indShowMessage:boolean = false;
  message:string = '';

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

  clickNewProduct(){
    this.router.navigate(['/novo-produto'])
  }

  clickDetailProduct(value:any){
    this.router.navigate(['/detalhar-produto', value.id]);
  }

  clickAlterProduct(value:any){
    this.router.navigate(['/alterar-produto', value.id]);
  }

  checkedDelete(value:any){
    this.apiService.deleteProduct(value.id).subscribe({
      error: (error) => {
        console.error('Erro ao enviar dados:', error);
      },
      complete: () => {
        this.message = "Excluido com Sucesso!";
        this.indShowMessage = true;
        this.loadListProduct();
        setTimeout(() => {
          this.indShowMessage = false;
        }, 2000);
      }
    });
  }
  

}
