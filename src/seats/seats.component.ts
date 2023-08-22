import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-seat',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class.allocated]="allocated">{{ seatId }}</div>
  `,
  styles: ['.allocated { background-color: green; }'],
})
export class SeatsComponent {
  @Input() seatId: string = '';
  @Input() allocated: boolean = false;

  constructor() {}
}
