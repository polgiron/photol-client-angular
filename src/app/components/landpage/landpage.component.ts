import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { Utils } from 'src/app/utils/utils';
import { fadeAnimation } from 'src/app/utils/animations';
import { CacheService } from 'src/app/services/cache.service';
import { BaseApi } from 'src/app/services/base-api.service';
import { Image } from 'src/app/models/image.model';

@Component({
  selector: 'app-landpage',
  templateUrl: './landpage.component.html',
  styleUrls: ['./landpage.component.scss'],
  animations: [fadeAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandpageComponent implements OnInit {
  images: Image[];

  constructor(
    private imageService: ImageService,
    private utils: Utils,
    private cache: CacheService,
    private api: BaseApi,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getLandpage();
  }

  async getLandpage() {
    // this.utils.hideSplashscreen();
    // this.photostream = JSON.parse(this.cache.get('photostream'));
    // if (!this.photostream) {
    //   this.photostream = await this.photoService.getPhotostream();
    //   this.cache.set('photostream', JSON.stringify(this.photostream));
    //   this.utils.hideSplashscreen();
    // } else {
    //   this.utils.hideSplashscreen();
    // }

    console.log('GET LANDPAGE');
    this.images = await this.imageService.getImages();
    // console.log(this.images);
    this.ref.markForCheck();
  }
}
