import { Component } from '@angular/core';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  usuario_id:string = '';
  nome:string = '';
  valor:number = 0;
  quantidade:number = 0;
  descricao:string = '';
  categoria:string = '';
  caracteristicas:string = '';
  imagens:string = '';

}
