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
  // @Input() displayTags: boolean = false
  @Input() editMode: boolean = false
  private _alive: boolean = true
  imageLoaded: boolean = false
  addMenuOpen: boolean = false

  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn
  }

  get isAlbumView(): boolean {
    return this.albumService.currentAlbum ? true : false
  }

  get isCover(): boolean {
    return (
      this.isAlbumView &&
      this.albumService.currentAlbum.covers.includes(this.image._id)
    )
  }

  constructor(
    private auth: AuthService,
    private imageService: ImageService,
    private albumService: AlbumService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // if (this.isAlbumView) {
    //   this.albumService
    //     .updateCoverChannel()
    //     .pipe(takeWhile(() => this._alive))
    //     .subscribe((imageId: string) => {
    //       this.isCover = this.image._id === imageId
    //       this.ref.markForCheck()
    //     })
    // }
  }

  ngOnDestroy(): void {
    this._alive = false
  }

  openPhotoModal(): void {
    this.imageService.openLightbox(this.image)
  }

  updateCover(): void {
    if (this.isCover) {
      this.albumService.removeCover(this.image._id)
    } else {
      this.albumService.addCover(this.image._id)
    }
  }

  delete(): void {
    this.imageService.delete(this.image._id)
  }

  onImageLoaded(): void {
    this.imageLoaded = true
  }
}
