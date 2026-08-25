import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { FESTIVAL } from '../../data/festival';

@Component({
  selector: 'hero',
  imports: [MatButtonModule, RouterLink],
  templateUrl: './hero.html'
})
export class Hero {
  protected readonly festival = FESTIVAL;
}
