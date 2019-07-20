import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseApi } from 'src/app/services/base-api.service';
import { Image } from '../models/image.model';

@Injectable()
export class ImageService {
  private _modalPhoto: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  currentPhotos: Image[];
  document: string = 'image/';

  constructor(
    private api: BaseApi
  ) { }

  getAll() {
    return this.api.get(this.document + 'all').then((images: Image[]) => {
      // console.log(images);
      return images;
    });
  }

  getImageBigSignedUrl(imageId: number): Promise<any> {
    return this.api.get(this.document + `${imageId}/big`).then(data => {
      // console.log(data);
      return data;
    });
  }

  update(imageId: number, params: object) {
    this.api.put(this.document + imageId, params);
  }

  delete(imageId: number) {
    return this.api.delete(this.document + imageId);
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
