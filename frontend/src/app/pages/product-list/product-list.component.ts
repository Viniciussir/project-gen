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

  options: any[] = [];
  message: string = '';
  indShowMessage: boolean = false;
  colorMessage:any = '';

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadListProduct();
  }

  async loadListProduct() {
    try {
      const data = await firstValueFrom(this.apiService.getListProduct());
  
      this.options = data.map(item => ({
        ...item,
        img: item.img ? this.convertBufferToBase64(item.img) : null // Verifique se item.img não é null
      }));
    } catch (error) {
      console.error('Erro', error);
    }
  }  

  convertBufferToBase64(img: { type: string; data: number[] } | null): string | null {
    if (img && img.type && img.data) {
      const byteArray = new Uint8Array(img.data);
      const base64String = btoa(
        Array.from(byteArray).map(byte => String.fromCharCode(byte)).join('')
      );
      return `data:${img.type};base64,${base64String}`;
    } else {
      console.warn('Imagem inválida:', img);
      return null; // Retorne null se a imagem for inválida
    }
  }
   
  clickNewProduct() {
    this.router.navigate(['/novo-produto']);
  }

  clickDetailProduct(value: any) {
    this.router.navigate(['/detalhar-produto', value.id]);
  }

  clickAlterProduct(value: any) {
    this.router.navigate(['/alterar-produto', value.id]);
  }

  checkedDelete(value: any) {
    this.apiService.deleteProduct(value.id).subscribe({
      error: (error) => {
        console.error('Erro ao enviar dados:', error);
      },
      complete: () => {
        this.message = "Excluído com Sucesso!";
        this.colorMessage = 'green'
        this.indShowMessage = true;
        this.loadListProduct();
        setTimeout(() => {
          this.indShowMessage = false;
        }, 2000);
      }
    });
  }
}
