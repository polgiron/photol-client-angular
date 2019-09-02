import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { Image } from 'src/app/models/image.model';
import { AlbumService } from 'src/app/services/album.service';
import { SettingsService } from 'src/app/services/settings.service';
import { takeWhile } from 'rxjs/operators';
import { Settings } from 'src/app/models/settings.model';
import { fadeAnimation } from 'src/app/utils/animations';

@Component({
  selector: 'app-image-thumb',
  templateUrl: './image-thumb.component.html',
  styleUrls: ['./image-thumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation]
})
export class ImageThumbComponent implements OnInit, OnDestroy {
  @Output() onDeleteImage: EventEmitter<number> = new EventEmitter();
  @Input() image: Image;
  @Input() displayTags: boolean = false;
  @Input() editMode: boolean = false;
  private _alive: boolean = true;
  isAlbumView: boolean = false;
  isCover: boolean = false;

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

  openPhotoModal() {
    this.imageService.openPhotoModal(this.image);
  }

  updateFavorite() {
    this.image.favorite = !this.image.favorite;
    this.ref.markForCheck();

    const params = {
      favorite: this.image.favorite
    };

    this.imageService.update(this.image._id, params);
  }

  updateCover() {
    if (!this.isCover) {
      this.albumService.updateCover(this.image._id);
    }
  }

  delete() {
    this.imageService.delete(this.image._id).then((response: any) => {
      // this.ref.markForCheck();
      this.onDeleteImage.emit(this.image._id);
    });
  }

  ngOnDestroy() {
    this._alive = false;
  }
}
