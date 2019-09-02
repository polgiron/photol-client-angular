import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { ActivatedRoute } from '@angular/router';
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
  // @Input() images: Image[];
  @Input() set images (value: Image[]) {
    this.updateImages(value);
  };
  private _alive: boolean = true;
  private _images: Image[];
  extendedImages: any[];
  settings: Settings;
  containerHeight: number;
  tabletBreakpoint: number = 992;
  mobileBreakpoint: number = 767;

  get images() {
    return this._images;
  }

  constructor(
    private imageService: ImageService,
    private route: ActivatedRoute,
    private ref: ChangeDetectorRef,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    // console.log('---IMAGES');
    // console.log(this.images);

    const params: any = this.route.queryParams;
    const photoId = params.value.open;
    if (photoId) {
      this.openPhotoOnReload(photoId)
    }

    this.settingsService.settingsChannel()
      .pipe(takeWhile(() => this._alive))
      .subscribe((settings: Settings) => {
        this.settings = settings;
        // console.log('new settings');
        // console.log(this.settings.editMode);
        this.ref.markForCheck();
      });
  }

  updateImages(images: Image[]) {
    this._images = images;
    this.imageService.currentImages = this.images;

    console.log('---IMAGES');
    console.log(images);

    // Layout
    // TODO: add window on resize
    if (window.innerWidth < this.mobileBreakpoint) {
      this.refreshFlickrLayout(100);
    } else if (window.innerWidth < this.tabletBreakpoint) {
      this.refreshFlickrLayout(150);
    } else {
      this.refreshFlickrLayout();
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

  openPhotoOnReload(photoId: number) {
    const photo = this.images.find(photo => photo._id == photoId);
    this.imageService.openPhotoModal(photo);
  }

  onDeleteImage(imageId: number) {
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
