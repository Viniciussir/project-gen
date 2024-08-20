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

  titleProductAdd:string = 'Produtos';

  placeholderName:string = 'Digite o nome do produto';
  valueName:string = '';
  limitName:string = '10'

  placeholderDescription:string = 'Digite a descrição do produto';
  valueDescription:string = '';
  limitDescription:string = '20'

  placeholderQuantity:string = 'Digite a quantidade de produtos';
  valueQuantity:any = '';

  placeholderPrice:string = 'Digite o valor do produto';
  valuePrice:any = '';
  limitPrice:string = '10'

  img:any = '';
  name:any = '';
  selectedImageFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  indDisableFields:boolean = false;

  indShowMessage:boolean = false;
  message:string = '';
  colorMessage:any = '';

  operacao:String = '';

  id:string = '';

  constructor(
    private apiService:ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.checkStatus(this.id);
    });
  }

  checkStatus(id: string) {
    const currentUrl = this.location.path();
    if (currentUrl.includes('detalhar')) {
      this.apiService.searchProductById(id).subscribe({
        error: (error) => {
          console.error(error);
        },
        next: async (response) => {
          this.operacao = 'detalhar';
          this.titleProductAdd = 'Visualize as informações do seu produto';
          this.indDisableFields = true;
          this.valueName = response.name;
          this.valueDescription = response.description;
          this.valuePrice = response.price;
          this.valueQuantity = response.quantity;
  
          if (response.img) {
            this.previewUrl = await this.createImageFromBuffer(response.img.data);
          } else {
            this.previewUrl = null;
          }
        },
      });
    } else if (currentUrl.includes('alterar')) {
      this.apiService.searchProductById(id).subscribe({
        error: (error) => {
          console.error('Erro ao enviar dados:', error);
        },
        next: async (response) => {
          this.operacao = 'alterar';
          this.titleProductAdd = 'Altere as informações do seu produto';
          this.indDisableFields = false;
          this.valueName = response.name;
          this.valueDescription = response.description;
          this.valuePrice = response.price;
          this.valueQuantity = response.quantity;
  
          if (response.img) {
            this.previewUrl = await this.createImageFromBuffer(response.img.data);
          } else {
            this.previewUrl = null;
          }
        },
      });
    } else {
      this.operacao = 'incluir';
      this.titleProductAdd = 'Adicione as informações do seu produto';
    }
  }
  
  async createImageFromBuffer(buffer: number[]): Promise<string | null> {
    try {
      const blob = new Blob([new Uint8Array(buffer)], { type: 'image/jpeg' }); // Use o tipo correto da imagem, se não for JPEG ajuste conforme necessário
      const reader = new FileReader();
      return new Promise<string | null>((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Erro ao converter buffer para URL de imagem:', error);
      return null;
    }
  } 

  checkSave(){
    if(this.operacao === 'incluir'){
      this.includeProduct();
    } else if(this.operacao === 'alterar'){
      this.EditProduct();
    } else {
      this.return();
    }
  }

  onImageChange(file: File | null) {
    if (file) {
      this.selectedImageFile = file;
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.previewUrl = e.target?.result as string | ArrayBuffer;
      };
      reader.readAsDataURL(file);
    } else {
      this.selectedImageFile = null;
      this.previewUrl = null;
    }
  }

  async includeProduct(): Promise<false | undefined> {
    if (!this.ValidationFields()) {
      this.message = "Verifique os campos informados!";
      this.colorMessage = 'red';
      this.indShowMessage = true;
      setTimeout(() => {
        this.indShowMessage = false;
      }, 2000);
      return false;
    }
    const formData = new FormData();
    formData.append('name', this.valueName);
    formData.append('description', this.valueDescription);
    formData.append('price', parseFloat(this.valuePrice).toString());
    formData.append('quantity', parseInt(this.valueQuantity, 10).toString());
  
    if (this.selectedImageFile) {
      formData.append('img', this.selectedImageFile, this.selectedImageFile.name);
    } else {
      this.message = "Informe uma imagem para o seu produto";
      this.indShowMessage = true;
      this.colorMessage = 'red';
      setTimeout(() => {
        this.indShowMessage = false;
      }, 2000);
      return false;
    }
  
    try {
      await this.apiService.newProduct(formData).toPromise(); 
      this.message = "Salvo com Sucesso!";
      this.indShowMessage = true;
      this.colorMessage = 'green';
      setTimeout(() => {
        this.indShowMessage = false;
        this.return(); 
      }, 2000);
      return ;
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      return false;
    }
  }
  
  async EditProduct(): Promise<false | undefined> {
    if (!this.ValidationFields()) {
      this.message = "Verifique os campos informados!";
      this.indShowMessage = true;
      this.colorMessage = 'red';
      setTimeout(() => {
        this.indShowMessage = false;
      }, 2000);
      return false;
    }
  
    const formData = new FormData();
    formData.append('name', this.valueName);
    formData.append('description', this.valueDescription);
    formData.append('price', parseFloat(this.valuePrice).toString());
    formData.append('quantity', parseInt(this.valueQuantity, 10).toString());

    if (this.selectedImageFile) {
      formData.append('img', this.selectedImageFile, this.selectedImageFile.name);
    }
  
    try {
      await this.apiService.editProduct(this.id, formData).toPromise();
      this.message = "Alterado com Sucesso!";
      this.indShowMessage = true;
      this.colorMessage = 'green';
      setTimeout(() => {
        this.indShowMessage = false;
        this.return();
      }, 2000);
      return 
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      return false;
    }
  }  

  ValidationFields(){
    if(this.valueName && this.valueDescription && this.valuePrice && this.valueQuantity){
      return true
    }
    return false
  }
  
  return(){
    this.router.navigate(['/lista-produtos']);
  }
}