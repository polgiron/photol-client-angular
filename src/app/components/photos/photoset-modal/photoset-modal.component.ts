import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-photoset-modal',
  templateUrl: './photoset-modal.component.html',
  styleUrls: ['./photoset-modal.component.scss']
})
export class PhotosetModalComponent implements OnInit, OnDestroy {
  @Input() index: number;
  private _keydownListener: EventListener;
  photos: any;
  displayControl: boolean = true;

  constructor(
    private photoService: PhotoService,
    private utils: Utils
  ) { }

  ngOnInit() {
    this.photos = this.photoService.currentPhotos;
    this.displayControl = this.photos.length > 1;

    this._keydownListener = this.onKeydown.bind(this);
    window.addEventListener('keydown', this._keydownListener);
  }

  getPrevIndex(index: number) {
    if (index - 1 < 0) {
      return this.photos.length - 1;
    } else {
      return index - 1;
    }
  }

  getNextIndex(index: number) {
    if (index + 1 >= this.photos.length) {
      return 0;
    } else {
      return index + 1;
    }
  }

  prev() {
    this.index--;

    if (this.index < 0) {
      this.index = this.photos.length - 1;
    }
  }

  next() {
    this.index++;

    if (this.index >= this.photos.length) {
      this.index = 0;
    }
  }

  close() {
    this.photoService.closePhotoModal();
    this.utils.clearOpenQuery();
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
  }
}
