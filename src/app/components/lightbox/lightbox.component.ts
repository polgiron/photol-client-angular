import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, HostListener } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { Utils } from 'src/app/utils/utils';
import { SettingsService } from 'src/app/services/settings.service';
import { takeWhile } from 'rxjs/operators';
import { Settings } from 'src/app/models/settings.model';
import { Image } from 'src/app/models/image.model';

@Component({
  selector: 'app-lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LightboxComponent implements OnInit, OnDestroy {
  @Input() index: number;
  private _keydownListener: EventListener;
  private _alive: boolean = true;
  images: Image[];
  displayControl: boolean = true;
  settings: Settings;
  navButtonLeftOpacity: number = 0;

  constructor(
    private imageService: ImageService,
    private utils: Utils,
    private settingsService: SettingsService,
    private ref: ChangeDetectorRef
  ) { }

  @HostListener('document:mousemove', ['$event']) onMousemove(event: MouseEvent): void {
    const mouseX: number = event.clientX;
    const mouseY: number = event.clientY;

    const pointX: number = 64;
    const pointY: number = window.innerHeight / 2;

    // Distance to point from mouse
    const distance: number = Math.sqrt(Math.pow((pointY - mouseY), 2) + Math.pow((pointX - mouseX), 2));
    console.log('distance: ' + distance);





    if (distance < 100) {
      this.navButtonLeftOpacity = 1;
    } else if (distance >= 100 && distance <= 300) {
      this.navButtonLeftOpacity = 1 - (distance / 100);
      // this.navButtonLeftOpacity = .5;
    } else if (distance > 300) {
      this.navButtonLeftOpacity = .1;
    }

    // console.log(mouseX);
    console.log(this.navButtonLeftOpacity);

    this.ref.markForCheck();
  };

  ngOnInit() {
    this.images = this.imageService.currentImages;
    this.displayControl = this.images.length > 1;
    this._keydownListener = this.onKeydown.bind(this);
    window.addEventListener('keydown', this._keydownListener);

    this.settingsService.settingsChannel()
      .pipe(takeWhile(() => this._alive))
      .subscribe((settings: Settings) => {
        this.settings = settings;
        this.ref.markForCheck();
      });
  }

  getPrevIndex(index: number) {
    if (index - 1 < 0) {
      return this.images.length - 1;
    } else {
      return index - 1;
    }
  }

  getNextIndex(index: number) {
    if (index + 1 >= this.images.length) {
      return 0;
    } else {
      return index + 1;
    }
  }

  prev() {
    this.index--;

    if (this.index < 0) {
      this.index = this.images.length - 1;
    }

    this.ref.markForCheck();
  }

  next() {
    this.index++;

    if (this.index >= this.images.length) {
      this.index = 0;
    }

    this.ref.markForCheck();
  }

  close() {
    this.imageService.closeLightbox();
    this.utils.clearOpenQuery();
    this.ref.markForCheck();
  }

  onKeydown(event: any) {
    switch (event.key) {
      case 'Escape':
        this.close();
        break;
      case 'ArrowLeft':
        this.prev();
        break;
      case 'ArrowRight':
        this.next();
        break;
    }
  }

  ngOnDestroy() {
    window.removeEventListener('keydown', this._keydownListener);
    this._alive = false;
  }
}
