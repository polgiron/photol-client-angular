import { Component, OnInit, Input, ViewChild, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Utils } from 'src/app/utils/utils';
import { Tag } from 'src/app/models/tag.model';
import { Image } from 'src/app/models/image.model';

@Component({
  selector: 'app-imageset-image',
  templateUrl: './imageset-image.component.html',
  styleUrls: ['./imageset-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImagesetImageComponent implements OnInit {
  @ViewChild('photoWrapper', { static: true }) photoWrapperElement: ElementRef;
  @Input() set image(value: Image) {
    this._image = value;
    this.extendImage();
    this.setDialogWidth();
  };
  @Input() set active(value: boolean) {
    if (value) {
      this.setQueryParameter();
    }
  }
  @Input() width: number;
  @Input() height: number;
  @Input() editMode: boolean = false;
  private _resizeListener: EventListener;
  private _image: Image;
  imageSrc: string;
  padding: number = 32;
  mobileBreakpoint: number = 767;
  tags: Tag[];
  // time: number;
  // contrast: number;
  // aperture: number;
  // albums: any;

  get image() {
    return this._image;
  }

  constructor(
    private imageService: ImageService,
    private router: Router,
    private route: ActivatedRoute,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this._resizeListener = this.onWindowResize.bind(this);
    window.addEventListener('resize', this._resizeListener);
  }

  setQueryParameter() {
    // changes the route without moving from the current view or
    // triggering a navigation event,
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        open: this.image._id
      },
      queryParamsHandling: 'merge',
      // preserve the existing query params in the route
      // skipLocationChange: true
      // do not trigger navigation
    });
  }

  onWindowResize() {
    this.setDialogWidth();
  }

  setDialogWidth() {
    if (window.innerWidth < this.mobileBreakpoint) {
      return;
    }

    const maxHeight = window.innerHeight - 2 * this.padding;
    const maxWidth = window.innerWidth - 2 * this.padding;

    let newWidth = this.image.oriWidth * maxHeight / this.image.oriHeight;
    let newHeight = maxHeight;

    if (newWidth > maxWidth) {
      newWidth = maxWidth;
      newHeight = this.image.oriHeight * newWidth / this.image.oriWidth;
    }

    this.photoWrapperElement.nativeElement.style.width = newWidth + 'px';
    this.photoWrapperElement.nativeElement.style.height = newHeight + 'px';

    this.ref.markForCheck();
  }

  async extendImage() {
    const image: Image = await this.imageService.getImage(this._image._id);
    // console.log(image);
    this.imageSrc = image.signedUrl;
    this.tags = image.tags;
    this.ref.markForCheck();
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this._resizeListener);
  }
}
