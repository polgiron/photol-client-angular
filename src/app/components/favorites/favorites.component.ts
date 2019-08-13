import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { Image } from 'src/app/models/image.model';
import { fadeAnimation } from 'src/app/utils/animations';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  animations: [fadeAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesComponent implements OnInit {
  images: Image[];

  constructor(
    private imageService: ImageService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getLandpage();
  }

  async getLandpage() {
    this.images = await this.imageService.getFavorites();
    this.ref.markForCheck();
  }
}
