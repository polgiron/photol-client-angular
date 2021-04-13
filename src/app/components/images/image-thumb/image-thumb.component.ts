import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core'
import { ImageService } from 'src/app/services/image.service'
import { Image } from 'src/app/models/image.model'
import { AlbumService } from 'src/app/services/album.service'
import { takeWhile } from 'rxjs/operators'
import { fadeAnimation, fadeInAnimation } from 'src/app/utils/animations'
import { Tag } from 'src/app/models/tag.model'
import { AuthService } from 'src/app/services/authentication.service'

@Component({
  selector: 'app-image-thumb',
  templateUrl: './image-thumb.component.html',
  styleUrls: ['./image-thumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation, fadeInAnimation]
})
export class ImageThumbComponent implements OnInit, OnDestroy {
  @Input() image: Image
  @Input() tags: Tag[] // Separate tags in order to refresh
  @Input() stars: number // Separate stars in order to refresh
  @Input() displayTags: boolean = false
  @Input() editMode: boolean = false
  private _alive: boolean = true
  isAlbumView: boolean = false
  isCover: boolean = false
  imageLoaded: boolean = false
  addMenuOpen: boolean = false

  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn
  }

  constructor(
    private auth: AuthService,
    private imageService: ImageService,
    private albumService: AlbumService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isAlbumView = this.albumService.currentAlbum ? true : false

    if (this.isAlbumView) {
      if (this.albumService.currentAlbum.cover) {
        this.isCover =
          this.albumService.currentAlbum.cover._id == this.image._id
      }

      this.albumService
        .updateCoverChannel()
        .pipe(takeWhile(() => this._alive))
        .subscribe((image: Image) => {
          this.isCover = this.image._id == image._id
          this.ref.markForCheck()
        })
    }
  }

  ngOnDestroy(): void {
    this._alive = false
  }

  openPhotoModal(): void {
    this.imageService.openLightbox(this.image)
  }

  updateCover(): void {
    if (!this.isCover) {
      this.albumService.updateCover(this.image._id)
    }
  }

  delete(): void {
    this.imageService.delete(this.image._id)
  }

  onImageLoaded(): void {
    this.imageLoaded = true
  }
}
