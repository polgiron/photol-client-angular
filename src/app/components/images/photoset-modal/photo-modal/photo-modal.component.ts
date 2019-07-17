import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-photo-modal',
  templateUrl: './photo-modal.component.html',
  styleUrls: ['./photo-modal.component.scss']
})
export class PhotoModalComponent implements OnInit {
  @ViewChild('photoWrapper') photoWrapperElement: ElementRef;
  @Input() set image(value: any) {
    // console.log(value);

    this._image = value;

    this.extendImage();
    this.setDialogWidth();

    // this.photoService.getContext(this.photo.id).then(albums => {
    //   this.albums = albums;
    // });
  };
  @Input() set active(value: boolean) {
    if (value) {
      this.setQueryParameter();
    }
  }
  private _resizeListener: EventListener;
  private _image: any;
  imageSrc: string;
  padding: number = 32;
  mobileBreakpoint: number = 767;
  tags: string[] = [];
  time: number;
  contrast: number;
  aperture: number;
  albums: any;

  get image() {
    return this._image;
  }

  constructor(
    private imageService: ImageService,
    private router: Router,
    private route: ActivatedRoute
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
  }

  async extendImage() {
    // Image src
    this.imageService.getImageBigSignedUrl(this.image._id).then(data => {
      this.imageSrc = data.signedUrl;
    });

    // Extend tags
    // this.photo.tags.split(' ').forEach(tag => {
    //   if (tag.includes('settingtime')) {
    //     this.time = tag.replace('settingtime', '');
    //   } else if (tag.includes('settingaperture')) {
    //     this.aperture = tag.replace('settingaperture', '');
    //   } else if (tag.includes('settingcontrast')) {
    //     this.contrast = tag.replace('settingcontrast', '');
    //   } else {
    //     this.tags.push(tag);
    //   }
    // });
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this._resizeListener);
  }
}
