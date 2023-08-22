import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Aircraft } from './airplane';
import { SeatsComponent } from '../seats/seats.component';
import { SeatAllocationComponent } from '../seat-allocation/seat-allocation.component';
import { AirplaneViewComponent } from '../airplane-view/airplane-view.component';

@Component({
  selector: 'app-airplane',
  standalone: true,
  imports: [
    CommonModule,
    SeatsComponent,
    SeatAllocationComponent,
    AirplaneViewComponent,
  ],
  template: `
    <div class="aircraft">
      <app-airplane-view [rows]="numRows" [cols]="seatsPerRow" [seats]="seats"></app-airplane-view>
    </div>
    <app-seat-allocation (allocateEvent)="handleSeatAllocation($event)"></app-seat-allocation>
    <div><p *ngIf="resultSeats?.length">Allocated seats: {{ resultSeats }}</p></div>
  `,
  styles: ['.aircraft { display: flex; flex-direction: column; }'],
})
export class AirplaneComponent implements OnInit, OnChanges {
  @Input() numRows: number = 0;
  @Input() seatsPerRow: number = 0;

  seats: Aircraft[] = [];
  resultSeats: any;

  constructor() {}

  ngOnInit() {
    this.seats = this.generateSeats();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.numRows || changes.seatsPerRow) {
      this.seats = this.generateSeats();
    }
  }

  generateSeats() {
    const seats = [];
    for (let row = 1; row <= this.numRows; row++) {
      for (let seat = 1; seat <= this.seatsPerRow; seat++) {
        seats.push({
          row,
          seat,
          id: `${row}${String.fromCharCode(96 + seat)}`,
          allocated: false,
        });
      }
    }
    return seats;
  }

  handleSeatAllocation(numSeats: number) {
    if (numSeats == -1) {
      this.resetSeatAllocation();
      return;
    }
    this.resultSeats = this.allocateSeats(numSeats)[0];
  }

  resetSeatAllocation() {
    this.seats.forEach((item) => (item.allocated = false));
  }

  allocateSeats(numSeats: number) {
    if (numSeats > 4) {
      alert('Please enter less than 4 seats');
    }
    if (numSeats < 0) {
      alert('Please enter positive value');
    }
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
      (seat) =>
        seat.allocated === false &&
        (seat.seat === 1 ||
          seat.seat === 2 ||
          seat.seat === 7 ||
          seat.seat === 8)
    );
    if (availableSeats.length >= 2) {
      return this.allocateAndMarkSeats(availableSeats, 2);
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
    for (let row = startRow; row <= this.numRows; row++) {
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

  allocateAndMarkSeats(availableSeats: Aircraft[], numSeats: number) {
    console.log(JSON.stringify(this.seats));
    const allocatedSeats = availableSeats.slice(0, numSeats);
    this.seats = this.seats.map((seat) => {
      if (allocatedSeats.includes(seat)) {
        return {
          ...seat,
          allocated: true,
        };
      } else return seat;
    });
    console.log(JSON.stringify(this.seats));
    return allocatedSeats.map((seat) => seat.id) || null;
  }
}
