import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player-mobile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-mobile.component.html',
  styleUrl: './player-mobile.component.scss'
})
export class PlayerMobileComponent {
  @Input() name: string = '';
  @Input() playerActive: boolean = false;
  @Input() image = '1.png';
}
