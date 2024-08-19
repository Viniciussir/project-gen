import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ContainerComponent } from '../../components/container/container.component';
import { InputTextComponent } from '../../components/input-text/input-text.component';
import { InputNumberComponent } from "../../components/input-number/input-number.component";

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [
    CommonModule,
    ContainerComponent,
    InputTextComponent,
    InputNumberComponent
],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.scss'
})
export class ProductAddComponent {

  placeholderName:string = 'Digite o nome do produto';
  placeholderValue:string = 'Digite o valor do produto';
  valueName:string = '';
  valueValue:string = '';

  Salvar(event:any){
    console.log(this.valueName,this.valueValue)
  }


}
