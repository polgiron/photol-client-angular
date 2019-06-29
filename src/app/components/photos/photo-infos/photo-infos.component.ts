import { Component, OnInit, Input } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-photo-infos',
  templateUrl: './photo-infos.component.html',
  styleUrls: ['./photo-infos.component.scss']
})
export class PhotoInfosComponent implements OnInit {
  @Input() title: string;
  @Input() description: string;
  @Input() tags: string[] = [];
  @Input() time: string;
  @Input() contrast: string;
  @Input() aperture: string;
  @Input() albums: any;

  constructor(
    private photoService: PhotoService
  ) { }

  ngOnInit() {
    // console.log(this.tags);

    if (this.description == '') {
      this.description = 'No description';
    }
  }

  onClickAlbum() {
    this.photoService.closePhotoModal();
  }
}
