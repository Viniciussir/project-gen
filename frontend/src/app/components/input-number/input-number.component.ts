import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-number',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './input-number.component.html',
  styleUrl: './input-number.component.scss'
})
export class InputNumberComponent {

  @Input() value: string = '';
  @Input() placeholder: string = '';

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  onValueChange(value: any) {
    this.valueChange.emit(this.value);
  }

  allowNumberOnly(event: KeyboardEvent) {
    const key = event.key;
    if (!/^\d$/.test(key)) {
      event.preventDefault();
    }
  }
}
