import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseApi } from 'src/app/services/base-api.service';
import { Image } from '../models/image.model';

@Injectable()
export class ImageService {
  private _modalPhoto: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  currentPhotos: any;

  constructor(
    private api: BaseApi
  ) { }

  getImages() {
    return this.api.get('image/all').then((images: Image[]) => {
      // console.log(images);
      return images;
    });
  }









  public modalPhotoChannel(): Observable<any> {
    return this._modalPhoto.asObservable();
  }

  openPhotoModal(photo: any) {
    console.log('open photo modal');
    console.log(this.currentPhotos);
    console.log(photo.id);
    this._modalPhoto.next(this.currentPhotos.indexOf(photo));
    document.body.classList.add('is-static');
  }

  closePhotoModal() {
    this._modalPhoto.next(null);
    document.body.classList.remove('is-static');
  }

  getPhoto(photoId: number) {
    return this.api.get('photo/' + photoId);
  }

  getContext(photoId: number) {
    return this.api.get(`photo/${photoId}/context`);
  }

  getPhotostream() {
    return this.api.get(`photostream`);
  }

  getBigThumbnail(farm: number, server: number, id: number, secret: number) {
    return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_b.jpg`;
    // return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_[mstzb].jpg`;
  }
}
