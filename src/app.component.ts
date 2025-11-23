import {
  ChangeDetectionStrategy,
  Component,
  signal,
  effect,
  inject,
  Renderer2,
  AfterViewInit,
  ElementRef,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HeroComponent } from './components/hero/hero.component';
import { ServicesComponent } from './components/services/services.component';
import { ContactComponent } from './components/contact/contact.component';
import { VoiceComponent } from './components/voice/voice.component';
import { WorkComponent } from './components/work/work.component';
import { JourneyComponent } from './components/journey/journey.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeroComponent,
    VoiceComponent,
    ServicesComponent,
    WorkComponent,
    JourneyComponent,
    ContactComponent,
  ],
})
export class AppComponent implements AfterViewInit {
  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT);
  
  title = 'ClickAura';
  currentYear = new Date().getFullYear();
  theme = signal<'light' | 'dark'>('dark');
  isHeaderVisible = signal(true);
  activeSection = signal('home');
  
  private lastScrollY = 0;
  private observer!: IntersectionObserver;

  @ViewChildren('section', { read: ElementRef }) sections!: QueryList<ElementRef>;

  constructor() {
    effect(() => {
      if (this.theme() === 'dark') {
        this.renderer.addClass(this.document.documentElement, 'dark');
      } else {
        this.renderer.removeClass(this.document.documentElement, 'dark');
      }
    });
  }

  ngAfterViewInit(): void {
    this.setupScrollListener();
    this.setupIntersectionObserver();
  }

  private setupScrollListener(): void {
    this.renderer.listen('window', 'scroll', () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 100) {
        this.isHeaderVisible.set(true);
      } else if (currentScrollY > this.lastScrollY) {
        this.isHeaderVisible.set(false);
      } else {
        this.isHeaderVisible.set(true);
      }
      this.lastScrollY = currentScrollY;
    });
  }

  private setupIntersectionObserver(): void {
    const options = {
      rootMargin: '-40% 0px -60% 0px',
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.activeSection.set(entry.target.id);
        }
      });
    }, options);

    this.sections.forEach(section => {
      this.observer.observe(section.nativeElement);
    });
  }

  toggleTheme(): void {
    this.theme.update((current) => (current === 'dark' ? 'light' : 'dark'));
  }
}