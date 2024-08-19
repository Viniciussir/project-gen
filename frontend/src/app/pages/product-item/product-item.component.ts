import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ContainerComponent } from '../../components/container/container.component';
import { InputTextComponent } from '../../components/input-text/input-text.component';
import { InputNumberComponent } from "../../components/input-number/input-number.component";
import { TitleComponent } from '../../components/title/title.component';
import { ButtonComponent } from '../../components/button/button.component';
import { ApiService } from '../../service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageUploadComponent } from '../../components/image-upload/image-upload.component';
import { firstValueFrom } from 'rxjs';
import { MessageComponent } from '../../components/message/message.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [
    CommonModule,
    ContainerComponent,
    InputTextComponent,
    InputNumberComponent,
    TitleComponent,
    ButtonComponent,
    ImageUploadComponent,
    MessageComponent,
    FooterComponent
],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent implements OnInit {

  titleProductAdd:string = 'Produtos'

  valueName:string = '';
  placeholderName:string = 'Digite o nome do produto';

  placeholderDescription:string = 'Digite a descrição do produto';
  valueDescription:string = '';

  placeholderQuantity:string = 'Digite a quantidade de produtos';
  valueQuantity:string = '';

  placeholderPrice:string = 'Digite o valor do produto';
  valuePrice:string = '';

  img:any = '';
  name:any = '';
  selectedImageFile: File | null = null;

  indDisableFields:boolean = false;

  indShowMessage:boolean = false;
  message:string = '';

  operacao:String = '';
  id:string = '';

  constructor(
    private apiService:ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ){
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.checkStatus(this.id);
    });
    
  }

  checkStatus(id:string){
    const currentUrl = this.location.path();
    if (currentUrl.includes('detalhar')) {
      this.apiService.searchProductById(id).subscribe({
        error: (error) => {
          console.error(error);
        },
        next: (response) => {
          this.operacao = 'detalhar';
          this.titleProductAdd = 'Visualize as informações do seu produto';
          this.indDisableFields = true;
          this.valueName = response.product.name;
          this.valueDescription = response.product.description;
          this.valuePrice = response.product.price;
          this.valueQuantity = response.product.quantity;
        },
      })
    } else if (currentUrl.includes('alterar')){
      this.apiService.searchProductById(id).subscribe({
        error: (error) => {
          console.error('Erro ao enviar dados:', error);
        },
        next: (response) => {
          this.operacao = 'alterar';
          this.titleProductAdd = 'Altere as informações do seu produto';
          this.indDisableFields = false;
          this.valueName = response.product.name;
          this.valueDescription = response.product.description;
          this.valuePrice = response.product.price;
          this.valueQuantity = response.product.quantity;
        },
      })
    } else {
      this.operacao = 'incluir';
      this.titleProductAdd = 'Adicione as informações do seu produto';
    }
  }

  onImageSelected(file: File): void {
    this.selectedImageFile = file;
    console.log('Arquivo de imagem selecionado:', file);
  }

  checkSave(){
    if(this.operacao === 'incluir'){
      this.includeProduct();
    } else if(this.operacao === 'alterar'){
      this.EditProduct();
    } else {
      this.return()
    }
  }

  async includeProduct(){
    let product = {
      "name": this.valueName,
      "description": this.valueDescription,
      "price": this.valuePrice,
      "quantity": this.valueQuantity,
      "img": ""
    }
    this.apiService.newProduct(product).subscribe({
      error: (error) => {
        console.error('Erro ao enviar dados:', error);
      },
      complete: () => {
        this.message = "Salvo com Sucesso!";
        this.indShowMessage = true;
        setTimeout(() => {
          this.indShowMessage = false;
          this.return();
        }, 2000);
      }
    });
  }

  async EditProduct(){
    let product = {
      "name": this.valueName,
      "description": this.valueDescription,
      "price": this.valuePrice,
      "quantity": this.valueQuantity,
      "img": ""
    }
    this.apiService.editProduct(this.id, product).subscribe({
      error: (error) => {
        console.error('Erro ao enviar dados:', error);
      },
      complete: () => {
        this.message = "Alterado com Sucesso!";
        this.indShowMessage = true;
        setTimeout(() => {
          this.indShowMessage = false;
          this.return();
        }, 2000);
      }
    });
  }

  return(){
    this.router.navigate(['/lista-produtos'])
  }

}
