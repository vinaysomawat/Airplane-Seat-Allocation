import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeatsComponent } from 'src/seats/seats.component';

@Component({
  selector: 'app-airplane',
  standalone: true,
  imports: [CommonModule, SeatsComponent],
  templateUrl: './airplane.component.html',
})
export class AirplaneComponent {
  name = 'Angular';
}
