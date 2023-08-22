import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Aircraft } from './airplane';
import { SeatsComponent } from '../seats/seats.component';

@Component({
  selector: 'app-airplane',
  standalone: true,
  imports: [CommonModule, SeatsComponent],
  template: `
    <div class="aircraft">
      <div class="row" *ngFor="let row of aircraft">
        <div class="seat" *ngFor="let seat of row">
          <app-seat
            [seatId]="seat.id"
            [occupied]="seat.occupied"
            [allocated]="seat.allocated"
          ></app-seat>
        </div>
      </div>
    </div>
  `,
  styles: [
    '.aircraft { display: flex; flex-direction: column; }',
    '.row { display: flex; justify-content: center; margin: 5px 0; }',
    '.seat { margin: 0 5px; }',
  ],
})
export class AirplaneComponent {
  aircraft: Aircraft[][] = [
    [
      { id: 'id', occupied: false, allocated: false },
      { id: 'id', occupied: false, allocated: false },
      { id: 'id', occupied: false, allocated: false },
      { id: 'id', occupied: false, allocated: false },
    ],
    [
      { id: 'id', occupied: false, allocated: false },
      { id: 'id', occupied: false, allocated: false },
      { id: 'id', occupied: false, allocated: false },
      { id: 'id', occupied: false, allocated: false },
    ],
    [
      { id: 'id', occupied: false, allocated: false },
      { id: 'id', occupied: false, allocated: false },
      { id: 'id', occupied: false, allocated: false },
      { id: 'id', occupied: false, allocated: false },
    ],
  ];

  constructor() {}
}
