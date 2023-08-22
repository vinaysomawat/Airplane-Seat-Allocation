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

// Constants for seat allocation
const EDGE_SEATS = [1, 2];
const MIDDLE_FOUR_SEATS = [3, 4, 5, 6];
const MIDDLE_THREE_SEATS = [3, 4, 5];

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
    // Generate seats on initialization
    this.seats = this.generateSeats();
  }

  ngOnChanges(changes: SimpleChanges) {
    // Regenerate seats when numRows or seatsPerRow change
    if (changes.numRows || changes.seatsPerRow) {
      this.seats = this.generateSeats();
    }
  }

  generateSeats() {
    const seats = [];
    for (let row = 1; row <= this.numRows; row++) {
      for (let seat = 1; seat <= this.seatsPerRow; seat++) {
        // Create seat objects
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
    // Handle seat allocation event
    if (numSeats === -1) {
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
      return [];
    }
    if (numSeats < 0) {
      alert('Please enter a positive value');
      return [];
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

      if (!seat) {
        break;
      }

      allocatedSeats.push(seat);
      numSeats -= seat.length || 1;
    }
    return allocatedSeats;
  }

  allocateFourSeats(startRow = 1) {
    let availableFourSeats: Aircraft[] = [];

    for (let row = startRow; row <= this.numRows; row++) {
      availableFourSeats = this.seats.filter(
        (seat) =>
          seat.row === row &&
          seat.allocated === false &&
          MIDDLE_FOUR_SEATS.includes(seat.seat)
      );

      if (availableFourSeats.length >= 4) {
        return this.allocateAndMarkSeats(availableFourSeats, 4);
      }
    }

    // If not enough available in a row, try allocating 2 seats on each side
    const leftSeats = this.allocateTwoSeats();
    if (leftSeats) {
      const rightSeats = this.allocateTwoSeats();
      if (rightSeats) {
        return leftSeats.concat(rightSeats);
      }
    }

    return null;
  }

  allocateThreeSeats(startRow = 1) {
    let availableThreeSeats: Aircraft[] = [];

    for (let row = startRow; row <= this.numRows; row++) {
      availableThreeSeats = this.seats.filter(
        (seat) =>
          seat.row === row &&
          seat.allocated === false &&
          MIDDLE_THREE_SEATS.includes(seat.seat)
      );

      if (availableThreeSeats.length >= 3) {
        return this.allocateAndMarkSeats(availableThreeSeats, 3);
      }
    }

    return null;
  }

  allocateTwoSeats() {
    const availableTwoSeats = this.seats.filter(
      (seat) =>
        seat.allocated === false &&
        (EDGE_SEATS.includes(seat.seat) ||
          seat.seat === this.seatsPerRow - 1 ||
          seat.seat === this.seatsPerRow)
    );

    if (availableTwoSeats.length >= 2) {
      return this.allocateAndMarkSeats(availableTwoSeats, 2);
    }

    return null;
  }

  allocateSingleSeat() {
    const availableSingleSeats = this.seats.filter((seat) => !seat.allocated);

    if (availableSingleSeats.length >= 1) {
      return this.allocateAndMarkSeats(availableSingleSeats, 1);
    }

    return null;
  }

  allocateAndMarkSeats(availableSeats: Aircraft[], numSeats: number) {
    const allocatedSeats = availableSeats.slice(0, numSeats);

    this.seats = this.seats.map((seat) => {
      if (allocatedSeats.includes(seat)) {
        return {
          ...seat,
          allocated: true,
        };
      } else {
        return seat;
      }
    });

    return allocatedSeats.map((seat) => seat.id) || null;
  }
}
