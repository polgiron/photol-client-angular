import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Api } from 'src/app/services/api.service';
import { Image } from '../models/image.model';

@Injectable()
export class ImageService {
  private _modalPhoto: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  private _currentImages: BehaviorSubject< Image[]> = new BehaviorSubject< Image[]>([]);
  // currentImages: Image[];
  document: string = 'image/';

  constructor(
    private api: Api
  ) { }

  public currentImagesChannel(): Observable<Image[]> {
    return this._currentImages.asObservable();
  }

  get currentImages() {
    return [... this._currentImages.value];
  }

  updateCurrentImages(images: Image[]) {
    this._currentImages.next(images);
  }

  async getAll(page: number = 1, limit: number = 20) {
    const params = {
      page: page,
      limit: limit
    };
    const response: any = await this.api.get(this.document + 'all', params);
    return response;
  }

  async getImage(imageId: string) {
    const response: any = await this.api.get(this.document + `${imageId}` + '/big');
    return response.image;
  }

  async getFavorites() {
    const response: any = await this.api.get(this.document + 'favorites');
    return response.images;
  }

  async getSignedUrl(imageId: string, size: string) {
    const response: any = await this.api.get(this.document + imageId + '/signedUrl', { size: size });
    return response.signedUrl;
  }

  // async getTags(imageId: number) {
  //   const response: any = await this.api.get(this.document + imageId + '/tags');
  //   return response.tags;
  // }

  update(imageId: string, params: object) {
    this.api.put(this.document + imageId, params);
  }

  delete(imageId: string) {
    this.api.delete(this.document + imageId).then(() => {
      let images = this.currentImages;
      images = images.filter(image => image._id != imageId);
      this.updateCurrentImages(images);
    });
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
