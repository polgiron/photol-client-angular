import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { Image } from 'src/app/models/image.model';
import { AlbumService } from 'src/app/services/album.service';

@Component({
  selector: 'app-image-thumb',
  templateUrl: './image-thumb.component.html',
  styleUrls: ['./image-thumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageThumbComponent implements OnInit {
  @Output() onDeleteImage: EventEmitter<number> = new EventEmitter();
  @Input() image: Image;
  isAlbumView: boolean = false;
  // editMode: boolean = false;
  editMode: boolean = true;

  constructor(
    private imageService: ImageService,
    private albumService: AlbumService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    // console.log(this.image);
    this.isAlbumView = this.albumService.currentId ? true : false;
  }

  openPhotoModal() {
    this.imageService.openPhotoModal(this.image);
  }

  updateFavorite(event: any) {
    event.stopPropagation();

    this.image.favorite = !this.image.favorite;
    this.ref.markForCheck();

    const params = {
      favorite: this.image.favorite
    };

    this.imageService.update(this.image._id, params);
  }

  updateCover(event: any) {
    event.stopPropagation();
    this.albumService.updateCover(this.image._id);
  }

  delete(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.imageService.delete(this.image._id).then((response: any) => {
      // this.ref.markForCheck();
      this.onDeleteImage.emit(this.image._id);
    });
  }
}
