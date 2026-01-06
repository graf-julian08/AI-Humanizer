import { Component, input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-humanize-results',
  imports: [CommonModule],
  templateUrl: './humanize-results.html',
  styleUrl: './humanize-results.css'
})
export class HumanizeResultsComponent {
  issues = input<string>('');
  improvedText = input<string>('');
  error = input<string>('');
  @Output() onRetry = new EventEmitter<void>();

  retry(): void {
    this.onRetry.emit();
  }
}
