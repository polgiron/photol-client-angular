import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { Image } from 'src/app/models/image.model';

@Component({
  selector: 'app-image-thumb',
  templateUrl: './image-thumb.component.html',
  styleUrls: ['./image-thumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageThumbComponent implements OnInit {
  @Output() onDeleteImage: EventEmitter<number> = new EventEmitter();
  @Input() image: Image;
  isFavorite: boolean = false;

  constructor(
    private imageService: ImageService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.isFavorite = this.image.favorite ? this.image.favorite : false;
    // console.log(this.image);
  }

  openPhotoModal() {
    this.imageService.openPhotoModal(this.image);
  }

  updateFavorite(event: any) {
    event.stopPropagation();

    this.isFavorite = !this.isFavorite;
    this.ref.markForCheck();

    const params = {
      favorite: this.isFavorite
    };

    this.imageService.update(this.image._id, params);
  }

  delete(event: any) {
    event.stopPropagation();

    this.imageService.delete(this.image._id).then(response => {
      // this.ref.markForCheck();
      this.onDeleteImage.emit(this.image._id);
    });
  }
}
