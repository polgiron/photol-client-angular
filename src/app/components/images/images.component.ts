import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { ActivatedRoute } from '@angular/router';
import { Utils } from 'src/app/utils/utils';
import { Image } from 'src/app/models/image.model';
import { AlbumService } from 'src/app/services/album.service';
// import Macy from 'Macy';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImagesComponent implements OnInit {
  // @Output() onUpdateCover: EventEmitter<number> = new EventEmitter();
  @Input() images: Image[];
  @Input() columns: number = 3;
  // macyInstance: any;

  constructor(
    private imageService: ImageService,
    private route: ActivatedRoute,
    private utils: Utils,
    private ref: ChangeDetectorRef,
    private albumService: AlbumService
  ) { }

  ngOnInit() {
    this.extendImages();

    const params: any = this.route.queryParams;
    const photoId = params.value.open;

    if (photoId) {
      setTimeout(() => {
        this.openPhotoOnReload(photoId);
      }, 500);
    } else {
      this.utils.hideSplashscreen();
    }

    // this.macyInstance = Macy({
    //   container: '#images-list',
    //   columns: 3,
    //   trueOrder: true,
    //   margin: 16,
    //   // breakAt: {
    //   //   992: {
    //   //     margin: 16,
    //   //     columns: 2
    //   //   },
    //   //   767: {
    //   //     margin: 16,
    //   //     columns: 1
    //   //   }
    //   // }
    // });
  }

  extendImages() {
    this.reorder(this.images);
    this.imageService.currentImages = this.images;
  }

  openPhotoOnReload(photoId: number) {
    // console.log(photoId);
    // console.log(this.images);
    const photo = this.images.find(photo => photo._id == photoId);
    // console.log(photo._id);
    this.imageService.openPhotoModal(photo);
    this.utils.hideSplashscreen();
  }

  reorder(array: any[]) {
    array.forEach((element, index) => {
      element.index = index;
    });

    const out = [];
    let col = 0;

    while (col < this.columns) {
      for (let i = 0; i < array.length; i += this.columns) {
        let _val = array[i + col];
        if (_val !== undefined) {
          out.push(_val);
        }
      }
      col++;
    }

    this.images = out;
  }

  onDeleteImage(imageId: number) {
    this.images = this.images.filter(image => image._id != imageId);
    this.ref.markForCheck();
  }

  // onUpdateCover(imageId: number) {
  //   this.images = this.images.filter(image => image._id != imageId);
  //   this.ref.markForCheck();
  // }

  // openPhotoModal(image: Image) {
  //   this.imageService.openPhotoModal(image);
  // }

  // updateFavorite(image: Image, event: any) {
  //   event.stopPropagation();

  //   image.favorite = !image.favorite;
  //   this.ref.markForCheck();

  //   const params = {
  //     favorite: image.favorite
  //   };

  //   this.imageService.update(image._id, params);
  // }

  // deleteImage(imageId: number, event: any) {
  //   event.stopPropagation();

  //   this.imageService.delete(imageId).then(response => {
  //     this.images = this.images.filter(image => image._id != imageId);
  //     this.ref.markForCheck();
  //   });
  // }

  // updateCover(imageId: number, event: any) {
  //   event.stopPropagation();
  //   // this.onUpdateCover.emit(imageId);
  //   this.albumService.updateCover(imageId);
  // }
}
