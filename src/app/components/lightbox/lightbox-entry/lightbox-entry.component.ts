import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core'
import { ImageService } from 'src/app/services/image.service'
import { Router, ActivatedRoute } from '@angular/router'
import { Image } from 'src/app/models/image.model'
import { fadeInAnimation } from 'src/app/utils/animations'
import { AuthService } from 'src/app/services/authentication.service'

@Component({
  selector: 'app-lightbox-entry',
  templateUrl: './lightbox-entry.component.html',
  styleUrls: ['./lightbox-entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation]
})
export class LightboxEntryComponent implements OnInit {
  @ViewChild('imageWrapper', { static: true }) imageWrapperElement: ElementRef
  @Input() set image(value: Image) {
    this._image = value
    this.extendImage()
    this.setDialogWidth()
  }
  @Input() set active(value: boolean) {
    // if (value) {
    //   this.setQueryParameter()
    // }
    // this._active = value
  }
  @Input() width: number
  @Input() height: number
  @Input() editMode: boolean = false
  private _resizeListener: EventListener
  private _image: Image
  // private _active: boolean
  imageSrc: string
  mobileBreakpoint: number = 767
  imageLoaded: boolean = false

  get image(): Image {
    return this._image
  }

  // get active(): boolean {
  //   return this._active
  // }

  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn
  }

  constructor(
    private imageService: ImageService,
    private router: Router,
    private route: ActivatedRoute,
    private ref: ChangeDetectorRef,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this._resizeListener = this.onWindowResize.bind(this)
    window.addEventListener('resize', this._resizeListener)
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this._resizeListener)
  }

  setQueryParameter(): void {
    // changes the route without moving from the current view or
    // triggering a navigation event,
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        open: this.image._id
      },
      queryParamsHandling: 'merge'
      // preserve the existing query params in the route
      // skipLocationChange: true
      // do not trigger navigation
    })
  }

  onWindowResize(): void {
    this.setDialogWidth()
  }

  setDialogWidth(): void {
    let padding: number = 32

    if (window.innerWidth < this.mobileBreakpoint) {
      padding = 0
    }

    const maxHeight = window.innerHeight - 2 * padding
    const maxWidth = window.innerWidth - 2 * padding

    let newWidth = (this.image.oriWidth * maxHeight) / this.image.oriHeight
    let newHeight = maxHeight

    if (newWidth > maxWidth) {
      newWidth = maxWidth
      newHeight = (this.image.oriHeight * newWidth) / this.image.oriWidth
    }

    this.imageWrapperElement.nativeElement.style.width = newWidth + 'px'
    this.imageWrapperElement.nativeElement.style.height = newHeight + 'px'

    this.ref.markForCheck()
  }

  async extendImage(): Promise<void> {
    const image: Image = await this.imageService.getImage(
      this._image._id,
      this._image.public
    )
    this.imageSrc = image.signedUrl
    this.ref.markForCheck()
  }

  onImageLoaded(): void {
    this.imageLoaded = true
  }
}
