import { Component, OnInit, Input } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { ActivatedRoute } from '@angular/router';
import { Utils } from 'src/app/utils/utils';
import { Image } from 'src/app/models/image.model';
// import Macy from 'Macy';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {
  @Input() images: Image[];
  @Input() columns: number = 3;

  constructor(
    private imageService: ImageService,
    private route: ActivatedRoute,
    private utils: Utils
  ) { }

  ngOnInit() {
    // this.reorder(this.photos);
    // this.photoService.currentPhotos = this.photos;

    // const params: any = this.route.queryParams;
    // const photoId = params.value.open;

    // if (photoId) {
    //   setTimeout(() => {
    //     this.openPhotoOnReload(photoId);
    //   }, 500);
    // } else {
    //   this.utils.hideSplashscreen();
    // }

    // const macyInstance = Macy({
    //   container: '#photos-list',
    //   columns: 3,
    //   trueOrder: true,
    //   margin: 16,
    //   breakAt: {
    //     992: {
    //       margin: 16,
    //       columns: 2
    //     },
    //     767: {
    //       margin: 16,
    //       columns: 1
    //     }
    //   }
    // });
  }

  // openPhotoOnReload(photoId: number) {
  //   // console.log(photoId);
  //   console.log(this.photos);
  //   const photo = this.photos.find(photo => photo.id == photoId);
  //   console.log(photo.id);
  //   this.photoService.openPhotoModal(photo);
  //   this.utils.hideSplashscreen();
  // }

  // reorder(array) {
  //   array.forEach((element, index) => {
  //     element.index = index;
  //   });

  //   const out = [];
  //   let col = 0;

  //   while (col < this.columns) {
  //     for (let i = 0; i < array.length; i += this.columns) {
  //       let _val = array[i + col];
  //       if (_val !== undefined) {
  //         out.push(_val);
  //       }
  //     }
  //     col++;
  //   }

  //   this.photos = out;
  // }
}
