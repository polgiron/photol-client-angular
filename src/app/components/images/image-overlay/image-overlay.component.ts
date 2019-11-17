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
  @Input() tags: Tag[];
  @Input() stars: number;

  constructor(
    private imageService: ImageService
  ) { }

  ngOnInit() { }

  clearRating() {
    this.stars = 0;
    this.saveRating();
  }

  saveRating() {
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
