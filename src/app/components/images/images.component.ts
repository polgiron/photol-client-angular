import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { ActivatedRoute } from '@angular/router';
import { Utils } from 'src/app/utils/utils';
import { Image } from 'src/app/models/image.model';
import { SettingsService } from 'src/app/services/settings.service';
import { takeWhile } from 'rxjs/operators';
import { Settings } from 'src/app/models/settings.model';
// import Macy from 'Macy';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImagesComponent implements OnInit, OnDestroy {
  @Input() images: Image[];
  @Input() columns: number = 3;
  private _alive: boolean = true;
  settings: Settings;
  // macyInstance: any;

  constructor(
    private imageService: ImageService,
    private route: ActivatedRoute,
    private utils: Utils,
    private ref: ChangeDetectorRef,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.extendImages();

    const params: any = this.route.queryParams;
    const photoId = params.value.open;

    if (photoId) {
      setTimeout(() => {
        this.openPhotoOnReload(photoId);
      }, 500);
    } else {
      this.utils.hideSplashscreen();
    }

    this.settingsService.settingsChannel()
      .pipe(takeWhile(() => this._alive))
      .subscribe((settings: Settings) => {
        this.settings = settings;
        console.log('new settings');
        console.log(this.settings);
        this.ref.markForCheck();
      });

    // this.macyInstance = Macy({
    //   container: '#images-list',
    //   columns: 3,
    //   trueOrder: true,
    //   margin: 16,
    //   // breakAt: {
    //   //   992: {
    //   //     margin: 16,
    //   //     columns: 2
    //   //   },
    //   //   767: {
    //   //     margin: 16,
    //   //     columns: 1
    //   //   }
    //   // }
    // });
  }

  extendImages() {
    this.reorder(this.images);
    this.imageService.currentImages = this.images;
  }

  openPhotoOnReload(photoId: number) {
    const photo = this.images.find(photo => photo._id == photoId);
    this.imageService.openPhotoModal(photo);
    this.utils.hideSplashscreen();
  }

  reorder(array: any[]) {
    array.forEach((element, index) => {
      element.index = index;
    });

    const out = [];
    let col = 0;

    while (col < this.columns) {
      for (let i = 0; i < array.length; i += this.columns) {
        let _val = array[i + col];
        if (_val !== undefined) {
          out.push(_val);
        }
      }
      col++;
    }

    this.images = out;
  }

  onDeleteImage(imageId: number) {
    this.images = this.images.filter(image => image._id != imageId);
    this.ref.markForCheck();
  }

  ngOnDestroy() {
    this._alive = false;
  }
}
