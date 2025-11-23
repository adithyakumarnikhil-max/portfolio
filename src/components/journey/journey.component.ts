import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TeamMember } from '../../models/team-member.model';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
})
export class JourneyComponent {
  team: TeamMember[] = [
    {
      name: 'Nikhil Adithya Kumar',
      role: 'Developer',
      linkedin: 'https://www.linkedin.com/in/nikhil-adithya/',
      whatsapp: 'https://wa.me/919581341643',
      imageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=300&h=300&auto=format&fit=crop'
    },
    {
      name: 'Chetan Sai Surya',
      role: 'UI/UX Designer',
      linkedin: 'https://www.linkedin.com/in/chetansaisuryakumar/',
      whatsapp: 'https://wa.me/919494905675',
      imageUrl: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=300&h=300&auto=format&fit=crop'
    }
  ];
}