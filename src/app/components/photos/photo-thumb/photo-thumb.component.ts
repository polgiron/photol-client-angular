import { Component, OnInit, Input } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-photo-thumb',
  templateUrl: './photo-thumb.component.html',
  styleUrls: ['./photo-thumb.component.scss']
})
export class PhotoThumbComponent implements OnInit {
  @Input() photo: any;

  constructor(
    private photoService: PhotoService
  ) { }

  ngOnInit() {

  }

  openPhotoModal() {
    this.photoService.openPhotoModal(this.photo);
  }
}
