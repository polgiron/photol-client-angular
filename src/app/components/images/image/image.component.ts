import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Output,
  EventEmitter
} from '@angular/core'
import { fadeOutAnimation } from 'src/app/utils/animations'
import { ImageService } from 'src/app/services/image.service'
import { ImageSize } from 'src/app/models/image.model'

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  animations: [fadeOutAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageComponent implements OnInit {
  @ViewChild('wrapper', { static: true }) wrapper: ElementRef
  @Output() onImageLoaded: EventEmitter<boolean> = new EventEmitter()
  @Input() flickrLayout: boolean = false
  @Input() width: number
  @Input() height: number
  @Input() displayLoader: boolean = false
  @Input() id: string
  @Input() set src(value: string) {
    this.isLoaded = false
    this._src = value

    if (!this.flickrLayout) {
      this.setPadding()
    }
  }
  private _src: string
  isLoaded: boolean = false
  isInViewport: boolean = false

  get src() {
    return this._src
  }

  constructor(
    private ref: ChangeDetectorRef,
    private imageService: ImageService
  ) {}

  ngOnInit() {}

  setPadding() {
    const ratio = (this.height / this.width) * 100
    this.wrapper.nativeElement.style.paddingBottom = ratio + '%'
    this.ref.markForCheck()
  }

  onLoad() {
    this.isLoaded = true
    this.onImageLoaded.emit(true)
    this.ref.markForCheck()
  }

  async onError() {
    this._src = await this.imageService.getSignedUrl(this.id, ImageSize.SMALL)
    this.ref.markForCheck()
  }

  async onDeferLoad() {
    this.isInViewport = true
    this.ref.markForCheck()
  }
}
