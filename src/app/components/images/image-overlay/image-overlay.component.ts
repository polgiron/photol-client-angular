import { Component, OnInit, Input } from '@angular/core';
import { Image } from 'src/app/models/image.model';
import { ImageService } from 'src/app/services/image.service';
import { Tag } from 'src/app/models/tag.model';

@Component({
  selector: 'app-image-overlay',
  templateUrl: './image-overlay.component.html',
  styleUrls: ['./image-overlay.component.scss']
})
export class ImageOverlayComponent implements OnInit {
  @Input() image: Image;
  @Input() isAlbumView: boolean;
  @Input() editMode: boolean = false;
  @Input() set tags (value: Tag[]) {
    this._tags = value;
    if (value.length > this.maxTags) {
      this.displayedTags = value.slice(0, this.maxTags);
    } else {
      this.displayedTags = value;
    }
  };
  @Input() stars: number;
  private _tags: Tag[];
  displayedTags: Tag[];
  maxTags: number = 4;

  get tags() {
    return this._tags;
  }

  constructor(
    private imageService: ImageService
  ) { }

  ngOnInit() { }

  onRatingClick(event: any) {
    this.saveRating(event.target.title);
  }

  clearRating() {
    this.saveRating(0);
  }

  saveRating(value: number) {
    console.log('save rating');
    this.stars = value;
    this.imageService.update(this.image._id, {
      stars: this.stars
    }).then(() => {
      const images = this.imageService.currentImages;
      images.map(image => {
        if (image._id == this.image._id) {
          image.stars = this.stars;
        }
      });
      this.imageService.updateCurrentImages(images);
    });
  }
}
