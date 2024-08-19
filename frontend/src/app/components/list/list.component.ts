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

  @Output() clickCheckedAction = new EventEmitter<void>();
  @Output() clicknNewProductAction = new EventEmitter<void>();

  constructor() { }

  clickImg(value:any): void {
  }

  clickButton(value: any) {
    console.log('Favorited state:', value.isFavorited);
  }

  clickButtonDelete(value:any){
    this.clickCheckedAction.emit(value);
  }

  clickNewProduct() {
    this.clicknNewProductAction.emit();
  }

}
