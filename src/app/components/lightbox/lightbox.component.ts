import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core'
import { ImageService } from 'src/app/services/image.service'
import { Utils } from 'src/app/utils/utils'
import { SettingsService } from 'src/app/services/settings.service'
import { Settings } from 'src/app/models/settings.model'
import { Image } from 'src/app/models/image.model'
import { Observable } from 'rxjs'
import { fadeAnimation } from 'src/app/utils/animations'

@Component({
  selector: 'app-lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation]
})
export class LightboxComponent implements OnInit, OnDestroy {
  @Input() index: number
  private _keydownListener: EventListener
  settings: Observable<Settings> = this.settingsService.settingsChannel()

  get currentImages(): Image[] {
    return this.imageService.currentImages
  }

  // get currentImage(): Image {
  //   return this.imageService.currentImages[this.index]
  // }

  get displayControl(): boolean {
    return this.currentImages.length > 1
  }

  constructor(
    private imageService: ImageService,
    private utils: Utils,
    private settingsService: SettingsService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._keydownListener = this.onKeydown.bind(this)
    window.addEventListener('keydown', this._keydownListener)
  }

  ngOnDestroy(): void {
    window.removeEventListener('keydown', this._keydownListener)
  }

  // getPrevIndex(index: number) {
  //   if (index - 1 < 0) {
  //     return this.images.length - 1
  //   } else {
  //     return index - 1
  //   }
  // }

  // getNextIndex(index: number) {
  //   if (index + 1 >= this.images.length) {
  //     return 0
  //   } else {
  //     return index + 1
  //   }
  // }

  prev(): void {
    this.index--

    if (this.index < 0) {
      this.index = this.currentImages.length - 1
    }

    this.ref.markForCheck()
  }

  next(): void {
    this.index++

    if (this.index >= this.currentImages.length) {
      this.index = 0
    }

    this.ref.markForCheck()
  }

  close(): void {
    this.imageService.closeLightbox()
    this.utils.clearOpenQuery()
    this.ref.markForCheck()
  }

  onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Escape':
        this.close()
        break
      case 'ArrowLeft':
        this.prev()
        break
      case 'ArrowRight':
        this.next()
        break
    }
  }
}
