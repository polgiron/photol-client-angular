import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { fadeAnimation } from 'src/app/utils/animations';
import { Image } from 'src/app/models/image.model';

@Component({
  selector: 'app-landpage',
  templateUrl: './landpage.component.html',
  styleUrls: ['./landpage.component.scss'],
  animations: [fadeAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandpageComponent implements OnInit {
  images: Image[] = [];
  hasMore: boolean = true;
  page: number = 1;

  constructor(
    private imageService: ImageService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getImages();
  }

  onScroll() {
    if (this.hasMore) {
      this.getImages(true);
    }
  }

  async getImages(more: boolean = false) {
    if (more) {
      this.page += 1;
    }

    const response: any = await this.imageService.getAll(this.page);
    // console.log(response);
    this.hasMore = response.hasMore;
    this.images = this.images.concat(response.images);

    this.ref.markForCheck();
  }
}
