import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FESTIVAL } from '../../data/festival';

@Component({
  selector: 'hero',
  imports: [MatButtonModule],
  templateUrl: './hero.html'
})
export class Hero {
  protected readonly festival = FESTIVAL;
}
