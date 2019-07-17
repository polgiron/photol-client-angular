import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseApi } from 'src/app/services/base-api.service';
import { Image } from '../models/image.model';

@Injectable()
export class ImageService {
  private _modalPhoto: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  currentPhotos: Image[];

  constructor(
    private api: BaseApi
  ) { }

  getImages() {
    return this.api.get('image/all').then((images: Image[]) => {
      // console.log(images);
      return images;
    });
  }

  getImageBigSignedUrl(imageId: number): Promise<any> {
    return this.api.get(`image/${imageId}/big`).then(data => {
      // console.log(data);
      return data;
    });
  }

  public modalPhotoChannel(): Observable<any> {
    return this._modalPhoto.asObservable();
  }

  openPhotoModal(photo: any) {
    // console.log('open photo modal');
    // console.log(this.currentPhotos);
    // console.log(photo._id);
    this._modalPhoto.next(this.currentPhotos.indexOf(photo));
    document.body.classList.add('is-static');
  }

  closePhotoModal() {
    this._modalPhoto.next(null);
    document.body.classList.remove('is-static');
  }
}
