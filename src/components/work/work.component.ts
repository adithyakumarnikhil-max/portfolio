import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
})
export class WorkComponent {
  projects: Project[] = [
    {
      title: 'Creo Designers',
      description: 'A modern, dynamic portfolio website for a creative design agency.',
      image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&h=450&auto=format&fit=crop',
      link: 'https://www.creodesigners.com/',
      status: 'Completed',
      status_desc: 'October 2025'
    },
    {
      title: 'Creo Construction',
      description: 'A professional and clean website for a modern construction company.',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&h=450&auto=format&fit=crop',
      link: 'https://gem3-creo1.vercel.app/',
      status: 'Ongoing',
      status_desc: 'Development in progress'
    }
  ];
}
