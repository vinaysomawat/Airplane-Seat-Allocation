import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { AirplaneComponent } from './airplane/airplane.component';
import { SeatsComponent } from './seats/seats.component';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, AirplaneComponent, SeatsComponent],
  template: `
  <app-airplane></app-airplane>
  `,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
