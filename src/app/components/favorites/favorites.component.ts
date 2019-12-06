import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { fadeAnimation } from 'src/app/utils/animations';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  animations: [fadeAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesComponent implements OnInit {
  loading: boolean = true;

  constructor(
    private imageService: ImageService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getFavorites();
  }

  async getFavorites() {
    const images = await this.imageService.getFavorites();
    this.imageService.updateCurrentImages(images);
    this.loading = false;
    this.ref.markForCheck();
  }
}
