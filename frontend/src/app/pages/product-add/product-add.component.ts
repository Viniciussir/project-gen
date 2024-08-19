import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ContainerComponent } from '../../components/container/container.component';
import { InputTextComponent } from '../../components/input-text/input-text.component';
import { InputNumberComponent } from "../../components/input-number/input-number.component";
import { TitleComponent } from '../../components/title/title.component';
import { ButtonComponent } from '../../components/button/button.component';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';
import { ImageUploadComponent } from '../../components/image-upload/image-upload.component';
import { firstValueFrom } from 'rxjs';
import { MessageComponent } from '../../components/message/message.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-product-add',
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
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.scss'
})
export class ProductAddComponent {

  titleProductAdd:string = 'Adicione as informações do seu produto'

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

  accordionItems = [
    { title: 'Dados Gerais', expanded: true }
  ]

  indShowMessage:boolean = false;
  message:string = '';

  constructor(
    private apiService:ApiService,
    private router: Router,
  ){}

  onImageSelected(file: File): void {
    this.selectedImageFile = file;
    console.log('Arquivo de imagem selecionado:', file);
  }

  async save(){
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

  return(){
    this.router.navigate(['/list-product'])
  }

}
