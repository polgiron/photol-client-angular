import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';
import { fadeAnimation } from 'src/app/utils/animations';
import { AlbumService } from 'src/app/services/album.service';
import { Album } from 'src/app/models/album.model';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-modal-create-album',
  templateUrl: './modal-create-album.component.html',
  styleUrls: ['./modal-create-album.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation]
})
export class ModalCreateAlbumComponent implements OnInit {
  images = [];
  loading: boolean = false;
  title: string;
  rollId: number;

  constructor(
    private ref: ChangeDetectorRef,
    private uploadService: UploadService,
    private albumService: AlbumService
  ) { }

  ngOnInit() {
  }

  onUpload(files: File[]) {
    this.extendPhotos(files);
  }

  async extendPhotos(files: File[]) {
    // console.log(files);
    // this.loading = true;

    files.forEach(async (file: File) => {
      await this.generateImagePreview(file);
      console.log('here');
    });
  }

  generateImagePreview(file: File) {
    const reader = new FileReader();

    reader.onload = (readerEvent: any) => {
      const image = new Image();
      image.onload = () => {
        // Resize the image
        const canvas = document.createElement('canvas');
        const maxSize = 200;
        let width = image.width;
        let height = image.height;

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
        canvas.getContext('2d').drawImage(image, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg');

        this.images.push({
          file: file,
          src: dataUrl
          // src: readerEvent.target.result
        });

        // if (this.images.length == files.length) {
        //   this.loading = false;
        // }

        this.ref.markForCheck();
      }
      image.src = readerEvent.target.result;
    }
    reader.readAsDataURL(file);
  }

  removeImage(image: Object) {
    this.images.splice(this.images.indexOf(image), 1);
  }

  onCreateAlbum() {
    const params = {
      title: this.title,
      rollId: this.rollId
    };

    this.albumService.createAlbum(params).then((album: Album) => {
      console.log('Album has been created');
      this.images.forEach(image => image.albums = [album._id]);
      this.uploadService.upload(this.images);
    });
  }

  trackByFunction(index, item) {
    if (!item) {
      return null;
    }
    return item.id;
  }
}
