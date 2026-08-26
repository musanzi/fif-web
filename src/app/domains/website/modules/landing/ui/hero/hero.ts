import { afterNextRender, Component, DestroyRef, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { FESTIVAL } from '../../data/festival';

@Component({
  selector: 'hero',
  imports: [MatButtonModule, RouterLink],
  templateUrl: './hero.html'
})
export class Hero {
  private readonly destroyRef = inject(DestroyRef);

  protected readonly festival = FESTIVAL;
  protected readonly heroImages = [
    '/images/gallery/img-1.jpg',
    '/images/gallery/img-2.jpg',
    '/images/gallery/img-3.jpg',
    '/images/gallery/img-4.jpg',
    '/images/gallery/img-5.jpg'
  ] as const;
  protected readonly activeImageIndex = signal(0);

  constructor() {
    afterNextRender(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      const sliderTimer = window.setInterval(() => {
        this.activeImageIndex.update((index) => (index + 1) % this.heroImages.length);
      }, 6000);

      this.destroyRef.onDestroy(() => window.clearInterval(sliderTimer));
    });
  }
}
