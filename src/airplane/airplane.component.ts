import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Aircraft } from './airplane';
import { SeatsComponent } from '../seats/seats.component';
import { Seat } from '../seats/seat';

@Component({
  selector: 'app-airplane',
  standalone: true,
  imports: [CommonModule, SeatsComponent],
  template: `
    <div class="aircraft">
      <div class=row *ngFor="let row of aircraft">
        <div class=seat *ngFor="let seat of row">
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
export class AirplaneComponent implements OnInit {
  rows: number = 3;
  seatsPerRow: number = 8;

  seats: Seat[] = [];

  aircraft: Aircraft[][] = [];

  constructor() {}

  ngOnInit() {
    this.aircraft = this.generateSeats();
  }

  generateSeats() {
    const seats = [];
    for (let row = 1; row <= this.rows; row++) {
      let rowSeats = [];
      for (let seat = 1; seat <= this.seatsPerRow; seat++) {
        rowSeats.push({
          row,
          seat,
          id: `${row}${String.fromCharCode(96 + seat)}`,
          occupied: false,
          allocated: false,
        });
      }
      seats.push(rowSeats);
    }
    return seats;
  }

  allocateSeats(numSeats: number) {
    const allocatedSeats = [];

    while (numSeats > 0 && this.seats.length > 0) {
      let seat;
      if (numSeats === 4) {
        seat = this.allocateFourSeats();
      } else if (numSeats === 3) {
        seat = this.allocateThreeSeats();
      } else if (numSeats === 2) {
        seat = this.allocateTwoSeats();
      } else if (numSeats === 1) {
        seat = this.allocateSingleSeat();
      }

      if (seat) {
        allocatedSeats.push(seat);
        numSeats -= seat.length || 1;
      } else {
        break;
      }
    }

    return allocatedSeats;
  }

  allocateFourSeats() {
    // Allocate 4 seats in the middle of the first available row
    const middleRow = this.findFirstAvailableRow();
    if (middleRow !== -1) {
      return this.allocateSeatsInRow(middleRow, 4);
    }

    // If no row is available, try allocating 2 seats on the right and 2 on the left
    const leftSeats = this.allocateTwoSeats();
    if (leftSeats) {
      const rightSeats = this.allocateTwoSeats();
      if (rightSeats) {
        return leftSeats.concat(rightSeats);
      }
    }

    return null;
  }

  allocateThreeSeats() {
    const middleRow = this.findFirstAvailableRow();
    if (middleRow !== -1) {
      const middleSeats = this.allocateSeatsInRow(middleRow, 3);
      if (middleSeats) {
        return middleSeats;
      }
    }

    // If middle section not available, move to the next row
    const nextRow = this.findFirstAvailableRow(middleRow + 1);
    if (nextRow !== -1) {
      return this.allocateSeatsInRow(nextRow, 3);
    }

    // If no suitable rows are available, return null
    return null;
  }

  allocateTwoSeats() {
    // Allocate 2 edge seats, 2 on the left or right
    const availableSeats = this.seats.filter(
      (seat) => seat.row === 1 && (seat.seat === 1 || seat.seat === 8)
    );
    if (availableSeats.length >= 2) {
      return this.allocateSeatsInRow(1, 2);
    }
    return null;
  }

  allocateSingleSeat() {
    // Allocate 1 seat starting from the edge
    const availableSeat = this.seats.find(
      (seat) => seat.row === 1 && (seat.seat === 1 || seat.seat === 8)
    );
    if (availableSeat) {
      this.seats = this.seats.filter((seat) => seat.id !== availableSeat.id);
      return [availableSeat.id];
    }
    return null;
  }

  findFirstAvailableRow(startRow = 1) {
    for (let row = startRow; row <= this.rows; row++) {
      const occupiedSeats = this.seats
        .filter((seat) => seat.row === row)
        .map((seat) => seat.seat);
      if (
        !occupiedSeats.includes(3) &&
        !occupiedSeats.includes(4) &&
        !occupiedSeats.includes(5)
      ) {
        return row;
      }
    }
    return -1;
  }

  allocateSeatsInRow(row: number, numSeats: number) {
    const availableSeats = this.seats.filter(
      (seat) => seat.row === row && seat.seat > 2 && seat.seat < 7
    );
    if (availableSeats.length >= numSeats) {
      const allocatedSeats = availableSeats.slice(0, numSeats);
      this.seats = this.seats.filter((seat) => !allocatedSeats.includes(seat));
      return allocatedSeats.map((seat) => seat.id);
    }
    return null;
  }
}
