import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-imageset-modal',
  templateUrl: './imageset-modal.component.html',
  styleUrls: ['./imageset-modal.component.scss']
})
export class ImagesetModalComponent implements OnInit, OnDestroy {
  @Input() index: number;
  private _keydownListener: EventListener;
  images: any;
  displayControl: boolean = true;

  constructor(
    private imageService: ImageService,
    private utils: Utils
  ) { }

  ngOnInit() {
    this.images = this.imageService.currentImages;
    this.displayControl = this.images.length > 1;
    this._keydownListener = this.onKeydown.bind(this);
    window.addEventListener('keydown', this._keydownListener);
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
  }

  next() {
    this.index++;

    if (this.index >= this.images.length) {
      this.index = 0;
    }
  }

  close() {
    this.imageService.closePhotoModal();
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
