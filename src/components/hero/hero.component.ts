import { ChangeDetectionStrategy, Component, ElementRef, inject, signal, computed } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
})
export class HeroComponent {
  private hostEl = inject(ElementRef);
  
  private rotateX = signal(0);
  private rotateY = signal(0);

  // Use a computed signal to create the transform style string
  // This is more efficient as it only recalculates when rotateX or rotateY changes
  transformStyle = computed(() => `rotateX(${this.rotateX()}deg) rotateY(${this.rotateY()}deg)`);

  onMouseMove(event: MouseEvent): void {
    const rect = this.hostEl.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const { width, height } = rect;
    
    const tiltIntensity = 15; 

    const newRotateX = (y / height - 0.5) * tiltIntensity * -1;
    const newRotateY = (x / width - 0.5) * tiltIntensity;

    this.rotateX.set(newRotateX);
    this.rotateY.set(newRotateY);
  }

  onMouseLeave(): void {
    this.rotateX.set(0);
    this.rotateY.set(0);
  }
}