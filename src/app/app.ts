import { Component, signal, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./header/header";
import { CommonModule } from '@angular/common';
import { DeepseekService } from './services/deepseek.service';
import { HumanizeFormComponent } from './humanize-form/humanize-form';
import { HumanizeResultsComponent } from './humanize-results/humanize-results';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, CommonModule, HumanizeFormComponent, HumanizeResultsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('AI-Humanizer');
  formComponent = viewChild(HumanizeFormComponent);

  issues = signal('');
  improvedText = signal('');
  error = signal('');

  constructor(private deepseekService: DeepseekService) {}

  onHumanize(text: string): void {
    const form = this.formComponent();
    if (!form) return;

    form.setLoading(true);
    this.error.set('');
    this.issues.set('');
    this.improvedText.set('');

    this.deepseekService.humanizeText(text).subscribe({
      next: (result) => {
        this.issues.set(result.issues);
        this.improvedText.set(result.improved);
        form.setLoading(false);
      },
      error: (err) => {
        this.error.set('Fehler bei der API-Anfrage: ' + err.message);
        form.setLoading(false);
      }
    });
  }

  onReset(): void {
    this.issues.set('');
    this.improvedText.set('');
    this.error.set('');
  }
}
