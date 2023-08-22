import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AirplaneComponent } from '../airplane/airplane.component';

@Component({
  selector: 'app-manage-airplane',
  standalone: true,
  imports: [CommonModule, FormsModule, AirplaneComponent],
  template: `
    <div class="form-container">
      <div class="form-card">
        <h2>Seat Allocation</h2>
        <div class="form-group">
          <label for="numRows">Number of Rows:</label>
          <input id="numRows" type="number" [(ngModel)]="numRows">
        </div>
        <div class="form-group">
          <label for="seatsPerRow">Seats per Row:</label>
          <input id="seatsPerRow" type="number" [(ngModel)]="seatsPerRow">
        </div>
        <button class="btn-primary" (click)="generateSeats()">Generate Seats</button>
        <button class="btn-secondary" (click)="resetSeats()">Reset Seats</button>
      </div>
    </div>
    <app-airplane *ngIf="isSeatsAllocated" [numRows]="numRows" [seatsPerRow]="seatsPerRow"></app-airplane>
  `,
  styles: [
    '.form-container { display: flex; justify-content: center; align-items: center; height: 50vh; }',
    '.form-card { border: 1px solid #ccc; padding: 20px; width: 300px; text-align: center; }',
    '.form-group { margin-bottom: 15px; }',
    '.form-group label { display: block; margin-bottom: 5px; }',
    '.form-group input { width: 100%; padding: 5px; }',
    '.btn-primary { background-color: #007bff; color: #fff; border: none; padding: 10px 20px; cursor: pointer; }',
    '.btn-primary:hover { background-color: #0056b3; }',
    '.btn-secondary { background-color: #6c757d; color: #fff; border: none; padding: 10px 20px; cursor: pointer; }',
    '.btn-secondary:hover { background-color: #5a6268; }',
  ],
})
export class ManageAirplane implements OnInit {
  numRows: number = 3;
  seatsPerRow: number = 8;
  isSeatsAllocated: boolean = false;

  ngOnInit() {}

  generateSeats() {
    if (this.numRows && this.seatsPerRow) {
      this.isSeatsAllocated = true;
    } else {
      alert('rows or seats per rows should not be empty');
    }
  }

  resetSeats() {
    this.isSeatsAllocated = false;
  }
}
