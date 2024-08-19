import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-input-text',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule 
  ],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss'
})
export class InputTextComponent {
  
  @Input() value: string = '';
  @Input() placeholder: string = '';

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  pattern: string = '[a-zA-Z\\s]*';

  onValueChange(event: any) {
    this.valueChange.emit(this.value)
  }

  allowTextOnly(event: KeyboardEvent) {
    const key = event.key;
    if (!/^[a-zA-Z\s]$/.test(key)) {
      event.preventDefault();
    }
  }

}
