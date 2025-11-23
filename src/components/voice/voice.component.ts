import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-voice',
  templateUrl: './voice.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VoiceComponent {}
