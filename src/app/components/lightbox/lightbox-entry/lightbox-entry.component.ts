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
import { Image, ImageSize } from 'src/app/models/image.model'
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
  @Input() image: Image
  @Input() editMode: boolean = false
  mobileBreakpoint: number = 767
  imageLoaded: boolean = false

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
    this.getImageBigSignedUrl()
    this.setDialogWidth()
    this.setQueryParameter()
  }

  setQueryParameter(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        open: this.image._id
      },
      queryParamsHandling: 'merge'
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

  async getImageBigSignedUrl(): Promise<void> {
    this.image.signedUrl = await this.imageService.getSignedUrl(
      this.image._id,
      ImageSize.BIG,
      this.image.public
    )
    this.ref.markForCheck()
  }

  onImageLoaded(): void {
    this.imageLoaded = true
    this.ref.markForCheck()
  }
}
