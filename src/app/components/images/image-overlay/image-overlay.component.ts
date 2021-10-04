import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core'
import { Image } from 'src/app/models/image.model'
import { ImageService } from 'src/app/services/image.service'
import { Tag } from 'src/app/models/tag.model'
import { AlbumService } from 'src/app/services/album.service'
import { fadeAnimation } from 'src/app/utils/animations'
import { ModalImageInfosComponent } from '../../modals/modal-image-infos/modal-image-infos.component'
import { ModalService } from 'src/app/services/modal.service'

@Component({
  selector: 'app-image-overlay',
  templateUrl: './image-overlay.component.html',
  styleUrls: ['./image-overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation]
})
export class ImageOverlayComponent implements OnInit {
  @Input() image: Image
  @Input() editMode: boolean = false
  @Input() inLightbox: boolean = false
  @Input() stars: number // We keep input stars to refresh the component, needs refactor maybe
  @Input() tags: Tag[] // Same

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
    private imageService: ImageService,
    private albumService: AlbumService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {}

  onRatingClick(event: any): void {
    // this.saveRating(event.target.title)
    this.saveRating()
  }

  clearRating(): void {
    // this.saveRating(0)
    this.image.stars = 0
    this.saveRating()
  }

  // async saveRating(value: number): Promise<void> {
  async saveRating(): Promise<void> {
    // this.stars = value
    console.log(this.image)
    await this.imageService.update(this.image._id, this.image)
    const images = this.imageService.currentImages
    images.forEach((image) => {
      if (image._id === this.image._id) {
        image.stars = this.image.stars
      }
    })
    this.imageService.updateCurrentImages(images)
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

  onClickGoToAlbum(): void {
    this.imageService.closeLightbox()
  }

  onClickInfos(): void {
    this.modalService.open(ModalImageInfosComponent, 'image-infos', false, {
      image: this.image
    })
  }
}
