import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Api } from 'src/app/services/api.service';
import { Image } from '../models/image.model';

@Injectable()
export class ImageService {
  private _lightboxIndex: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  private _currentImages: BehaviorSubject<Image[]> = new BehaviorSubject<Image[]>([]);
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

  async getAll(page: number = 1, limit: number = 30) {
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

  async getToPrint() {
    const response: any = await this.api.get(this.document + 'toprint');
    return response.images;
  }

  async getPublic() {
    const response: any = await this.api.get(this.document + 'public');
    return response.images;
  }

  async getSignedUrl(imageId: string, size: string) {
    const response: any = await this.api.get(this.document + imageId + '/signedUrl', { size: size });
    return response.signedUrl;
  }

  update(imageId: string, params: object) {
    return this.api.put(this.document + imageId, params);
  }

  delete(imageId: string) {
    this.api.delete(this.document + imageId).then(() => {
      // console.log('Image has been deleted');
      let images = this.currentImages;
      images = images.filter(image => image._id != imageId);
      this.updateCurrentImages(images);
    });
  }

  // Lightbox

  public lightboxIndexChannel(): Observable<any> {
    return this._lightboxIndex.asObservable();
  }

  openLightbox(image: Image) {
    this._lightboxIndex.next(this.currentImages.indexOf(image));
    document.body.classList.add('is-static');
  }

  closeLightbox() {
    this._lightboxIndex.next(null);
    document.body.classList.remove('is-static');
  }
}
