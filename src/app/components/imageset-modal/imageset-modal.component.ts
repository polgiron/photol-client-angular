import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { Utils } from 'src/app/utils/utils';
import { SettingsService } from 'src/app/services/settings.service';
import { takeWhile } from 'rxjs/operators';
import { Settings } from 'src/app/models/settings.model';

@Component({
  selector: 'app-imageset-modal',
  templateUrl: './imageset-modal.component.html',
  styleUrls: ['./imageset-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImagesetModalComponent implements OnInit, OnDestroy {
  @Input() index: number;
  private _keydownListener: EventListener;
  private _alive: boolean = true;
  images: any;
  displayControl: boolean = true;
  settings: Settings;

  constructor(
    private imageService: ImageService,
    private utils: Utils,
    private settingsService: SettingsService,
    private ref: ChangeDetectorRef
  ) { }

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
    this.imageService.closePhotoModal();
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
