import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml',
  standalone: true,
})
export class SafeHtmlPipe implements PipeTransform {
  private readonly sanitizer = inject(DomSanitizer);

  transform(value: string | null | undefined): SafeHtml {
    if (value === null || value === undefined) {
      return '';
    }
    // This is safe because we are only passing in SVG path data from a trusted source (our own code).
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
