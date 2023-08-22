import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-seat',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class.occupied]="occupied" [class.allocated]="allocated">{{ seatId }}</div>
  `,
  styles: [
    '.occupied { background-color: gray; }',
    '.allocated { background-color: green; }',
  ],
})
export class SeatsComponent {
  @Input() seatId: string = '';
  @Input() occupied: boolean = false;
  @Input() allocated: boolean = false;

  constructor() {}
}
