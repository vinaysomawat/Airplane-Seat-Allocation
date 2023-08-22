import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Aircraft } from 'src/airplane/airplane';

@Component({
  selector: 'app-airplane-view',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class=row *ngFor="let row of aircraft">
    <div class=seat *ngFor="let seat of row">
      <app-seat
        [seatId]="seat.id"
        [allocated]="seat.allocated"
      ></app-seat>
    </div>
  </div>
  `,
  styles: [
    '.row { display: flex; justify-content: center; margin: 5px 0; }',
    '.seat { margin: 0 5px; }',
  ],
})
export class AirplaneViewComponent implements OnChanges {
  @Input() seats: Aircraft[] = [];
  @Input() rows: number = 0;
  @Input() cols: number = 0;
  aircraft: Aircraft[][] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes.array || changes.rows || changes.cols) {
      this.generateMatrix();
    }
  }

  private generateMatrix() {
    this.aircraft = [];
    let index = 0;

    for (let i = 0; i < this.rows; i++) {
      const row = [];
      for (let j = 0; j < this.cols; j++) {
        if (index < this.seats.length) {
          row.push(this.seats[index]);
          index++;
        }
      }
      this.aircraft.push(row);
    }
  }
}
