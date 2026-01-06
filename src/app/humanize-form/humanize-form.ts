import { Component, signal, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-humanize-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './humanize-form.html',
  styleUrl: './humanize-form.css'
})
export class HumanizeFormComponent {
  @Output() onHumanize = new EventEmitter<string>();
  @Output() onReset = new EventEmitter<void>();

  userText = signal('');
  isLoading = signal(false);

  humanize(): void {
    this.onHumanize.emit(this.userText());
  }

  reset(): void {
    this.userText.set('');
    this.onReset.emit();
  }

  setLoading(isLoading: boolean): void {
    this.isLoading.set(isLoading);
  }
}
