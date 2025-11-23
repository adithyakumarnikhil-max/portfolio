import { ChangeDetectionStrategy, Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeminiService } from '../../services/gemini.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule]
})
export class ContactComponent {
  private geminiService = inject(GeminiService);

  formState = signal<'idle' | 'submitting' | 'submitted'>('idle');
  aiReply = signal<string | null>(null);

  // Use individual signals for each form field for cleaner two-way binding
  name = signal('');
  email = signal('');
  message = signal('');

  async submitForm(): Promise<void> {
    if (!this.name() || !this.email() || !this.message()) {
      return;
    }
    
    this.formState.set('submitting');
    this.aiReply.set(null); // Reset previous reply

    // Simulate network delay for form submission feel
    await new Promise(resolve => setTimeout(resolve, 500));

    this.formState.set('submitted');
    
    // Get AI reply
    const reply = await this.geminiService.getAutomatedReply(this.name(), this.message());
    this.aiReply.set(reply);
  }

  resetForm(): void {
    this.name.set('');
    this.email.set('');
    this.message.set('');
    this.formState.set('idle');
    this.aiReply.set(null);
  }
}
