import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.scss'
})
export class ImageUploadComponent {
  @Output() imageSelected = new EventEmitter<File | null>();
  @Input() previewUrl: string | ArrayBuffer | null = null;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files ? input.files[0] : null;

    if (file) {
      this.imageSelected.emit(file);
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.previewUrl = e.target?.result as string | ArrayBuffer;
      };
      reader.readAsDataURL(file);
    } else {
      this.imageSelected.emit(null);
      this.previewUrl = null;
    }
  }
}
