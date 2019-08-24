import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Api } from 'src/app/services/api.service';
import { Image } from '../models/image.model';

@Injectable()
export class ImageService {
  private _modalPhoto: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  currentImages: Image[];
  document: string = 'image/';

  constructor(
    private api: Api
  ) { }

  async getAll() {
    const response: any = await this.api.get(this.document + 'all');
    return response.images;
  }

  async getImage(imageId: number) {
    const response: any = await this.api.get(this.document + `${imageId}`);
    return response.image;
  }

  async getFavorites() {
    const response: any = await this.api.get(this.document + 'favorites');
    return response.images;
  }

  async getSignedUrl(imageId: number, size: string) {
    const response: any = await this.api.get(this.document + `${imageId}` + '/signedUrl', { size: size });
    return response.signedUrl;
  }

  // async getTags(imageId: number) {
  //   const response: any = await this.api.get(this.document + `${imageId}/tags`);
  //   return response.tags;
  // }

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
    // console.log(this.currentImages);
    // console.log(photo._id);
    this._modalPhoto.next(this.currentImages.indexOf(photo));
    document.body.classList.add('is-static');
  }

  closePhotoModal() {
    this._modalPhoto.next(null);
    document.body.classList.remove('is-static');
  }
}
