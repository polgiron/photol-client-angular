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
  @Input() images: Image[];
  private _alive: boolean = true;
  extendedImages: any[];
  settings: Settings;
  containerHeight: number;

  constructor(
    private imageService: ImageService,
    private route: ActivatedRoute,
    private ref: ChangeDetectorRef,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.imageService.currentImages = this.images;
    this.refreshFlickrLayout();

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
        // console.log(this.settings);

        if (!settings.editMode) {
          this.refreshFlickrLayout();
        }

        this.ref.markForCheck();
      });
  }

  refreshFlickrLayout() {
    const layoutArray = [];
    this.images.map(image => {
      layoutArray.push(image.oriWidth / image.oriHeight);
    });

    const containerWidth = this.wrapper.nativeElement.clientWidth;

    const layoutGeometry = flickrLayout(layoutArray, {
      containerWidth: containerWidth,
      containerPadding: 0,
      boxSpacing: 24,
      targetRowHeight: 220,
      targetRowHeightTolerance: 0.25,
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
    if (!this.settings.editMode) {
      this.refreshFlickrLayout();
    }
  }

  openPhotoOnReload(photoId: number) {
    const photo = this.images.find(photo => photo._id == photoId);
    this.imageService.openPhotoModal(photo);
  }

  onDeleteImage(imageId: number) {
    this.images = this.images.filter(image => image._id != imageId);
    this.ref.markForCheck();
  }

  ngOnDestroy() {
    this._alive = false;
  }
}
