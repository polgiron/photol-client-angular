import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Image } from 'src/app/models/image.model';
import { SettingsService } from 'src/app/services/settings.service';
import { takeWhile } from 'rxjs/operators';
import { Settings } from 'src/app/models/settings.model';
import flickrLayout from 'justified-layout';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImagesComponent implements OnInit, OnDestroy {
  @ViewChild('wrapper', { static: true }) wrapper: ElementRef;
  private _alive: boolean = true;
  images: Image[];
  extendedImages: any[];
  settings: Settings;
  containerHeight: number;
  tabletBreakpoint: number = 992;
  mobileBreakpoint: number = 767;

  constructor(
    private imageService: ImageService,
    private route: ActivatedRoute,
    private ref: ChangeDetectorRef,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.settingsService.settingsChannel()
      .pipe(takeWhile(() => this._alive))
      .subscribe((settings: Settings) => {
        this.settings = settings;
        this.ref.markForCheck();
      });

    this.imageService.currentImagesChannel()
      .pipe(takeWhile(() => this._alive))
      .subscribe((images: Image[]) => {
        if (images.length) {
          this.updateImages(images);
        }
      });
  }

  updateImages(images: Image[]) {
    this.images = images;

    // Layout
    // TODO: add window on resize
    if (window.innerWidth < this.mobileBreakpoint) {
      this.refreshFlickrLayout(100);
    } else if (window.innerWidth < this.tabletBreakpoint) {
      this.refreshFlickrLayout(150);
    } else {
      this.refreshFlickrLayout();
    }

    console.log('getting images');
    console.log(images);
    this.openLightbox();

    this.ref.markForCheck();
  }

  openLightbox() {
    console.log('open lightbox');
    const params: Params = this.route.queryParams;
    const photoId: string = params.value.open;

    if (photoId) {
      this.openPhotoOnReload(photoId);
    }
  }

  refreshFlickrLayout(rowHeight: number = 200) {
    const layoutArray = [];
    this.images.map(image => {
      layoutArray.push(image.ratio);
    });

    const containerWidth = this.wrapper.nativeElement.clientWidth;

    const layoutGeometry = flickrLayout(layoutArray, {
      containerWidth: containerWidth,
      containerPadding: 0,
      boxSpacing: 24,
      targetRowHeight: rowHeight,
      // targetRowHeightTolerance: .25,
      targetRowHeightTolerance: .2,
      forceAspectRatio: false,
      showWidows: true,
      fullWidthBreakoutRowCadence: false
    });
    // console.log(layoutGeometry);
    this.containerHeight = layoutGeometry.containerHeight;

    this.extendedImages = [];
    layoutGeometry.boxes.map((box, index) => {
      this.extendedImages[index] = this.images[index];
      this.extendedImages[index].box = box;
    });

    this.ref.markForCheck();
  }

  onResize() {
    this.refreshFlickrLayout();
  }

  openPhotoOnReload(photoId: string) {
    const photo = this.images.find(photo => photo._id == photoId);
    this.imageService.openPhotoModal(photo);
  }

  onDeleteImage(imageId: string) {
    this.images = this.images.filter(image => image._id != imageId);
    this.ref.markForCheck();
  }

  trackByFunction(index, item) {
    if (!item) {
      return null;
    }
    return item._id;
  }

  ngOnDestroy() {
    this._alive = false;
  }
}
