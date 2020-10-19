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

  get disableButton(): boolean {
    return !this.title || this.title == '' || !this.images.length;
  }

  constructor(
    private ref: ChangeDetectorRef,
    private uploadService: UploadService,
    private albumService: AlbumService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void { }

  onUpload(files: File[]): void {
    this.extendPhotos(files);
  }

  extendPhotos(files: File[]): void{
    // console.log(files);

    files.map(file => {
      this.images.unshift({
        file: file,
        src: window.URL.createObjectURL(file).toString()
      });
    });

    this.ref.markForCheck();
  }

  removeImage(image: any): void {
    this.images.splice(this.images.indexOf(image), 1);
  }

  onCreateAlbum(): void {
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

  async onRollKeyup(): Promise<void> {
    if (this.rollId) {
      this.rollExists = await this.albumService.rollIdExists(this.rollId);
    } else {
      this.rollExists = false;
    }
    this.ref.markForCheck();
  }

  close(): void {
    this.modalService.close(this);
  }
}
