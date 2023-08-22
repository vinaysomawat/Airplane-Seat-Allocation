import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { ManageAirplane } from './manage-seats/manage-seats.component';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, ManageAirplane],
  template: `
  <app-manage-airplane></app-manage-airplane>
  `,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
