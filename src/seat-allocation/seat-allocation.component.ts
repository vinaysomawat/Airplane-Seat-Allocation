// seat-allocation.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-seat-allocation',
  standalone: true,
  imports: [FormsModule],
  template: `
  <div class="allocation-form">
    <label for="numSeats">Number of Seats to Allocate:</label>
    <input id="numSeats" type="number" [(ngModel)]="numSeats">
    <button (click)="allocateSeats()">Allocate</button>
    <button (click)="resetAllocation()">Reset</button>
  </div>
  `,
  styles: [
    '.allocation-form { display: flex; align-items: center; gap: 10px; margin-top: 20px }',
  ],
})
export class SeatAllocationComponent {
  numSeats: number = 0;
  @Output() allocateEvent = new EventEmitter<number>();

  allocateSeats() {
    this.allocateEvent.emit(this.numSeats);
  }

  resetAllocation() {
    this.allocateEvent.emit(-1);
  }
}
