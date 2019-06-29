import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Utils } from 'src/app/utils/utils';
import { fadeAnimation } from 'src/app/utils/animations';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
  animations: [fadeAnimation]
})
export class PhotoComponent implements OnInit {
  photo: any;
  isLoaded: boolean = false;
  isVertical: boolean = false;
  tags: string[] = [];
  time: number;
  contrast: number;
  aperture: number;
  albums: any;

  constructor(
    private route: ActivatedRoute,
    private utils: Utils,
    private photoService: PhotoService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const photoId = params['photoId'];

      this.photoService.getPhoto(photoId).then((photo: any) => {
        this.photo = this.extendPhoto(photo);
      });

      this.photoService.getContext(photoId).then(albums => {
        console.log(albums);
        this.albums = albums;
      });
    });
  }

  extendPhoto(photo: any) {
    console.log(photo);

    photo.photoUrl = this.utils.getPhotoUrl(photo.farm, photo.server, photo.id, photo.secret, 'b');

    photo.tags.tag.forEach(tag => {
      if (tag.raw.includes('settingtime')) {
        this.time = tag.raw.replace('settingtime', '');
      } else if (tag.raw.includes('settingaperture')) {
        this.aperture = tag.raw.replace('settingaperture', '');
      } else if (tag.raw.includes('settingcontrast')) {
        this.contrast = tag.raw.replace('settingcontrast', '');
      } else {
        this.tags.push(tag.raw);
      }
    });

    return photo;
  }
}
