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

  @Input() options: any[] = [];

  @Output() clicknNewProductAction = new EventEmitter<void>();
  @Output() clickImgAction = new EventEmitter<any>(); // Corrigido o tipo para 'any'
  @Output() clickAlterAction = new EventEmitter<any>(); // Corrigido o tipo para 'any'
  @Output() clickDeleteAction = new EventEmitter<any>(); // Corrigido o tipo para 'any'

  constructor() { }

  clickImg(value: any): void {
    this.clickImgAction.emit(value);
  }

  clickButtonEdit(value: any) {
    this.clickAlterAction.emit(value);
  }

  clickButtonDelete(value: any){
    this.clickDeleteAction.emit(value);
  }

  clickNewProduct() {
    this.clicknNewProductAction.emit();
  }
}