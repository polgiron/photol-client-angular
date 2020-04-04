import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { Image } from 'src/app/models/image.model';
import { AlbumService } from 'src/app/services/album.service';
import { takeWhile } from 'rxjs/operators';
import { fadeAnimation, fadeInAnimation } from 'src/app/utils/animations';
import { Tag } from 'src/app/models/tag.model';

@Component({
  selector: 'app-image-thumb',
  templateUrl: './image-thumb.component.html',
  styleUrls: ['./image-thumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation, fadeInAnimation]
})
export class ImageThumbComponent implements OnInit, OnDestroy {
  @Input() image: Image;
  @Input() tags: Tag[]; // Separate tags in order to refresh
  @Input() stars: number; // Separate stars in order to refresh
  @Input() displayTags: boolean = false;
  @Input() editMode: boolean = false;
  private _alive: boolean = true;
  isAlbumView: boolean = false;
  isCover: boolean = false;
  imageLoaded: boolean = false;

  constructor(
    private imageService: ImageService,
    private albumService: AlbumService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.isAlbumView = this.albumService.currentAlbum ? true : false;

    if (this.isAlbumView) {
      if (this.albumService.currentAlbum.cover) {
        this.isCover = this.albumService.currentAlbum.cover._id == this.image._id;
      }

      this.albumService.updateCoverChannel()
        .pipe(takeWhile(() => this._alive))
        .subscribe((image: Image) => {
          this.isCover = this.image._id == image._id;
          this.ref.markForCheck();
        });
    }
  }

  ngOnDestroy() {
    this._alive = false;
  }

  openPhotoModal() {
    this.imageService.openLightbox(this.image);
  }

  updateCover() {
    if (!this.isCover) {
      this.albumService.updateCover(this.image._id);
    }
  }

  delete() {
    this.imageService.delete(this.image._id);
  }

  onImageLoaded() {
    this.imageLoaded = true;
  }

  toggleToPrint() {
    this.image.toPrint = !this.image.toPrint;
    this.imageService.update(this.image._id, {
      toPrint: this.image.toPrint
    }).then(() => {
      const images = this.imageService.currentImages;
      images.map((image: Image) => {
        if (image._id == this.image._id) {
          image.toPrint = this.image.toPrint
        }
      });
      this.imageService.updateCurrentImages(images);
    });
  }
}
