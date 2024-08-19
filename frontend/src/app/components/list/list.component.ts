import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  @Input() value: any = {};
  @Input() options: any[] = [];

  @Output() clickImgAction:any;
  @Output() clickButtonAction:any;
  @Output() clickCheckedAction = new EventEmitter<void>();

  constructor() { }

  clickImg(value:any): void {
  }

  clickButton(value: any) {
    console.log('Favorited state:', value.isFavorited);
  }

  clickButtonDelete(value:any){
    this.clickCheckedAction.emit(value);
  }

  addNewProduct() {
    // Lógica para adicionar um novo produto
    console.log('Adicionar novo produto');
    // Você pode redirecionar para uma página de criação, abrir um modal, etc.
  }

}
