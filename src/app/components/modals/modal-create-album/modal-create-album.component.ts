import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';
import { fadeAnimation, fadeInAnimation } from 'src/app/utils/animations';
import { AlbumService } from 'src/app/services/album.service';
import { ModalService } from 'src/app/services/modal.service';
import { ModalUploadProgressComponent } from '../modal-upload-progress/modal-upload-progress.component';
import { Album } from 'src/app/models/album.model';

@Component({
  selector: 'app-modal-create-album',
  templateUrl: './modal-create-album.component.html',
  styleUrls: ['./modal-create-album.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation, fadeInAnimation]
})
export class ModalCreateAlbumComponent implements OnInit {
  images = [];
  title: string;
  rollId: string;
  date: number;
  index: number = 0;
  macyInstance: any;
  files: File[];
  rollExists: boolean = false;

  get disableButton() {
    return !this.title || this.title == '' || !this.images.length;
  }

  constructor(
    private ref: ChangeDetectorRef,
    private uploadService: UploadService,
    private albumService: AlbumService,
    private modalService: ModalService
  ) { }

  ngOnInit() { }

  onUpload(files: File[]) {
    this.extendPhotos(files);
  }

  extendPhotos(files: File[]) {
    // console.log(files);

    files.map(file => {
      this.images.unshift({
        file: file,
        src: null
      });
    });

    // this.images = [...files].reverse();
    this.ref.markForCheck();

    this.images.forEach((image: any) => {
      this.generatePreviewThumbnail(image);
    });
  }

  generatePreviewThumbnail(image: any) {
    const imgURL = window.URL.createObjectURL(image.file);
    const imageElement = new Image();

    imageElement.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      let dataSrc: string;
      const delay = 10;

      const revokeObject = () => {
        URL.revokeObjectURL(imgURL);
      }

      const decodeImage = () => {
        image.src = dataSrc;
        this.ref.markForCheck();
        setTimeout(revokeObject, delay);
      }

      const encodeImage = () => {
        dataSrc = canvas.toDataURL('image/jpeg', .5);
        setTimeout(decodeImage, delay);
      }

      const scaleImage = () => {
        ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height);
        setTimeout(encodeImage, delay);
      }

      const maxSize = 200;
      let width = imageElement.width;
      let height = imageElement.height;

      if (width > height) {
        if (width > maxSize) {
          height *= maxSize / width;
          width = maxSize;
        }
      } else {
        if (height > maxSize) {
          width *= maxSize / height;
          height = maxSize;
        }
      }

      canvas.width = width;
      canvas.height = height;

      setTimeout(scaleImage, delay);
    };

    imageElement.src = imgURL;
  }

  removeImage(image: any) {
    this.images.splice(this.images.indexOf(image), 1);
  }

  onCreateAlbum() {
    // console.log('ON CREATE ALBUM');

    const params = {
      title: this.title,
      rollId: this.rollId,
      date: this.date
    };

    this.close();

    this.albumService.create(params).then((album: Album) => {
      // console.log('Album has been created');
      this.images.forEach(image => image.albums = [album._id]);
      this.uploadService.upload(this.images, album._id, album.date);
    });

    this.modalService.open(ModalUploadProgressComponent, 'upload', true, {
      albumTitle: this.title,
      totalImages: this.images.length
    });
  }

  async onRollKeyup() {
    // console.log(this.rollId);
    if (this.rollId) {
      this.rollExists = await this.albumService.rollIdExists(this.rollId);
    } else {
      this.rollExists = false;
    }
    this.ref.markForCheck();
  }

  close() {
    this.modalService.close(this);
  }

  // trackByFunction(index, item) {
  //   if (!item) {
  //     return null;
  //   }
  //   return item.id;
  // }
}
