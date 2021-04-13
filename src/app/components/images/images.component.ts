import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core'
import { ImageService } from 'src/app/services/image.service'
import { ActivatedRoute, Params } from '@angular/router'
import { FlickerBox, Image } from 'src/app/models/image.model'
import { SettingsService } from 'src/app/services/settings.service'
import { takeWhile } from 'rxjs/operators'
import { Settings } from 'src/app/models/settings.model'
import flickrLayout from 'justified-layout'

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImagesComponent implements OnInit, OnDestroy {
  @ViewChild('wrapper', { static: true }) wrapper: ElementRef
  private _alive: boolean = true
  images: Image[]
  extendedImages: any[]
  settings: Settings
  containerHeight: number
  tabletBreakpoint: number = 992
  mobileBreakpoint: number = 767

  loaderImages: FlickerBox[]

  constructor(
    private imageService: ImageService,
    private route: ActivatedRoute,
    private ref: ChangeDetectorRef,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.displayLoader()

    this.settingsService
      .settingsChannel()
      .pipe(takeWhile(() => this._alive))
      .subscribe((settings: Settings) => {
        this.settings = settings
        this.ref.markForCheck()
      })

    this.imageService
      .currentImagesChannel()
      .pipe(takeWhile(() => this._alive))
      .subscribe((images: Image[]) => {
        if (images) {
          this.updateImages(images)
        }
      })
  }

  // ngAfterViewInit(): void {
  // }

  ngOnDestroy(): void {
    this._alive = false
  }

  updateImages(images: Image[]): void {
    this.images = images

    // Layout
    if (window.innerWidth < this.mobileBreakpoint) {
      this.refreshFlickrLayout(300, 16)
    } else if (window.innerWidth < this.tabletBreakpoint) {
      this.refreshFlickrLayout(150)
    } else {
      this.refreshFlickrLayout()
    }

    this.openLightbox()

    this.ref.markForCheck()
  }

  openLightbox(): void {
    // console.log('open lightbox');
    const params: Params = this.route.queryParams
    const photoId: string = params.value.open

    if (photoId) {
      this.openPhotoOnReload(photoId)
    }
  }

  refreshFlickrLayout(rowHeight: number = 200, boxSpacing: number = 24): void {
    const layoutArray: number[] = []

    this.images.forEach((image) => {
      // console.log(image.ratio)
      layoutArray.push(image.ratio)
    })

    const containerWidth = this.wrapper.nativeElement.clientWidth

    const layoutGeometry = flickrLayout(layoutArray, {
      containerWidth: containerWidth,
      containerPadding: 0,
      boxSpacing: boxSpacing,
      targetRowHeight: rowHeight,
      // targetRowHeightTolerance: .25,
      targetRowHeightTolerance: 0.2,
      forceAspectRatio: false,
      showWidows: true,
      fullWidthBreakoutRowCadence: false
    })
    // console.log(layoutGeometry);
    this.containerHeight = layoutGeometry.containerHeight

    this.extendedImages = []
    layoutGeometry.boxes.forEach((box: FlickerBox, index: number) => {
      this.extendedImages[index] = this.images[index]
      this.extendedImages[index].box = box
    })

    this.ref.markForCheck()
  }

  onResize(): void {
    this.refreshFlickrLayout()
  }

  openPhotoOnReload(photoId: string): void {
    const photo = this.images.find((photo) => photo._id == photoId)
    this.imageService.openLightbox(photo)
  }

  trackByFunction(index: number, item: any): void {
    if (!item) {
      return null
    }
    return item._id
  }

  displayLoader(): void {
    const ratios: number[] = []
    for (let i = 0; i < 10; i++) {
      ratios.push(1.5)
    }
    const containerWidth = this.wrapper.nativeElement.clientWidth
    const layoutGeometry = flickrLayout(ratios, {
      containerWidth: containerWidth,
      containerPadding: 0,
      boxSpacing: 24,
      targetRowHeight: 200,
      targetRowHeightTolerance: 0.2,
      forceAspectRatio: false,
      showWidows: true,
      fullWidthBreakoutRowCadence: false
    })
    this.containerHeight = layoutGeometry.containerHeight
    this.loaderImages = layoutGeometry.boxes
    console.log(this.loaderImages)
    this.ref.markForCheck()
  }
}
