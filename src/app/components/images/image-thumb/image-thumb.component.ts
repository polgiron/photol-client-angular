import { Component, OnInit, Input } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { Image } from 'src/app/models/image.model';

@Component({
  selector: 'app-image-thumb',
  templateUrl: './image-thumb.component.html',
  styleUrls: ['./image-thumb.component.scss']
})
export class ImageThumbComponent implements OnInit {
  @Input() image: Image;

  constructor(
    private imageService: ImageService
  ) { }

  ngOnInit() {

  }

  openPhotoModal() {
    this.imageService.openPhotoModal(this.image);
  }
}
