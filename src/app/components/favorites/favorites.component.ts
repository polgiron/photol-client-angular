import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { Image } from 'src/app/models/image.model';
import { fadeAnimation } from 'src/app/utils/animations';
// import { TopbarService } from 'src/app/services/topbar.service';

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
    private ref: ChangeDetectorRef,
    // private topbarService: TopbarService
  ) { }

  ngOnInit() {
    // this.topbarService.updatePageTitle('Favorites');
    this.getLandpage();
  }

  async getLandpage() {
    this.images = await this.imageService.getFavorites();
    this.ref.markForCheck();
  }
}
