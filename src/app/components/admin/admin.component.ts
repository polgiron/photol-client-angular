import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';
import { takeWhile } from 'rxjs/operators';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  private _alive: boolean = true;
  // private _mousemoveListener: EventListener;
  // private _mouseupListener: EventListener;
  // uploadPhotos: File[];
  uploadPhotos = [
    { id: 1, selected: false },
    { id: 2, selected: false },
    { id: 3, selected: false },
    { id: 4, selected: false },
    { id: 5, selected: false },
    { id: 6, selected: false },
    { id: 7, selected: false },
    { id: 8, selected: false },
    { id: 9, selected: false }
  ];
  selectedPhotos: number[] = [];

  constructor(
    private uploadService: UploadService,
    private utils: Utils
  ) { }

  ngOnInit() {
    this.uploadService.uploadPhotosChannel()
      .pipe(takeWhile(() => this._alive))
      .subscribe((uploadPhotos: File[]) => {
        if (uploadPhotos) {
          this.extendPhotos(uploadPhotos);
          // this.uploadPhotos = uploadPhotos;
          console.log(uploadPhotos);
        }
      });
  }

  extendPhotos(photos: any) {
    photos.forEach(photo => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        photo.src = event.target.result;
      }
      reader.readAsDataURL(photo);
    })
  }

  onSelectPhoto(photo: any) {
    photo.selected = !photo.selected;

    if (photo.selected) {
      this.selectedPhotos.push(photo.id);
    } else {
      console.log(this.selectedPhotos.indexOf(photo.id));
      this.selectedPhotos.splice(this.selectedPhotos.indexOf(photo.id), 1);
    }
  }

  selectAll() {
    this.uploadPhotos.forEach(photo => {
      photo.selected = true;
      this.selectedPhotos.push(photo.id);
    });
  }

  unselectAll() {
    this.uploadPhotos.forEach(photo => {
      photo.selected = false;
    });
    this.selectedPhotos = [];
  }

  ngOnDestroy() {
    this._alive = false;
  }
}
