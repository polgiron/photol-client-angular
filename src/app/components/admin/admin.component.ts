import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';
import { Utils } from 'src/app/utils/utils';
import { BaseApi } from 'src/app/services/base-api.service';
import { AlbumService } from 'src/app/services/album.service';
import { ImageService } from 'src/app/services/image.service';
import { ModalService } from 'src/app/services/modal.service';
import { ModalPickAlbumComponent } from '../modals/modal-pick-album/modal-pick-album.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent implements OnInit {
  // // private _mousemoveListener: EventListener;
  // // private _mouseupListener: EventListener;
  // images: UploadImage[] = [];
  // selectedImages: UploadImage[] = [];
  // index: number = 0;
  // firstUpload: boolean = true;

  constructor(
    private uploadService: UploadService,
    private utils: Utils,
    private api: BaseApi,
    private albumService: AlbumService,
    private imageService: ImageService,
    private ref: ChangeDetectorRef,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    // this.albumService.getAlbums();
    // this.modalService.open(ModalPickAlbumComponent, 'small');
  }

  // onUpload(files: File[]) {
  //   this.extendPhotos(files);

  //   if (this.firstUpload) {
  //     this.modalService.open(ModalPickAlbumComponent, 'small');
  //   }

  //   this.firstUpload = false;
  // }

  // extendPhotos(files: File[]) {
  //   // console.log(files);

  //   files.forEach((file: File) => {
  //     if (!this.images.find(image => image.file == file)) {
  //       this.index += 1;

  //       // const image: UploadImage = {
  //         // id: this.index,
  //         // title: file.name,
  //         file: file
  //       };

  //       const reader = new FileReader();
  //       reader.onload = (event: any) => {
  //         image.src = event.target.result;
  //         this.images.push(image);
  //         this.ref.markForCheck();
  //         console.log(image);
  //       }
  //       reader.readAsDataURL(file);

  //       // const img = new Image();
  //       // img.src = window.URL.createObjectURL(file);
  //       // img.onload = () => {
  //       //   window.URL.revokeObjectURL(img.src);

  //       //   image.original_width = img.naturalWidth;
  //       //   image.original_height = img.naturalHeight;

  //       //   const reader = new FileReader();
  //       //   reader.onload = (event: any) => {
  //       //     image.src = event.target.result;
  //       //     this.images.push(image);
  //       //     this.ref.markForCheck();
  //       //   }
  //       //   reader.readAsDataURL(file);
  //       // };
  //     }
  //   });
  // }

  // onSelectImage(image: UploadImage) {
  //   image.selected = !image.selected;

  //   // if (image.selected) {
  //   //   this.selectedImages.push(image);
  //   // } else {
  //   //   this.selectedImages.splice(this.selectedImages.indexOf(image), 1);
  //   // }

  //   this.ref.markForCheck();
  // }

  // selectAll() {
  //   this.images.forEach(image => {
  //     image.selected = true;
  //     this.selectedImages.push(image);
  //   });

  //   this.ref.markForCheck();
  // }

  // unselectAll() {
  //   this.images.forEach(image => {
  //     image.selected = false;
  //   });
  //   this.selectedImages = [];

  //   this.ref.markForCheck();
  // }

  // onSave() {
  //   this.uploadService.upload(this.images);
  // }

  // trackByFunction(index, item) {
  //   if (!item) {
  //     return null;
  //   }
  //   return item.id;
  // }

  ngOnDestroy() {
    // this._alive = false;
  }
}
