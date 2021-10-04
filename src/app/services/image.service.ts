import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { Api } from 'src/app/services/api.service'
import { Image, ImageSize } from '../models/image.model'

@Injectable()
export class ImageService {
  private _lightboxIndex: BehaviorSubject<number> = new BehaviorSubject<number>(
    null
  )
  private _currentImages: BehaviorSubject<Image[]> = new BehaviorSubject<
    Image[]
  >([])
  document: string = 'image/'

  constructor(private api: Api) {}

  public currentImagesChannel(): Observable<Image[]> {
    return this._currentImages.asObservable()
  }

  get currentImages() {
    return [...this._currentImages.value]
  }

  updateCurrentImages(images: Image[]) {
    this._currentImages.next(images)
  }

  // async getAll(page: number = 1, limit: number = 30): Promise<Image[]> {
  //   return await this.api.get(`${this.document}all`, {
  //     page: page,
  //     limit: limit
  //   })
  // }

  async getAll(): Promise<Image[]> {
    return await this.api.get(`${this.document}all`)
  }

  async getImage(imageId: string, isPublic: boolean = false): Promise<Image> {
    return await this.api.get(
      this.document + `${imageId}/big/${isPublic ? 'public' : ''}`
    )
  }

  async getFavorites(): Promise<Image[]> {
    return await this.api.get(this.document + 'favorites')
  }

  async getToPrint(): Promise<Image[]> {
    return await this.api.get(this.document + 'toprint')
  }

  async getPublic(): Promise<Image[]> {
    return await this.api.get(this.document + 'public')
  }

  async getSignedUrl(
    id: string,
    size: ImageSize = ImageSize.SMALL
  ): Promise<string> {
    const response: { signedUrl: string } = await this.api.get(
      `${this.document}${id}/signedUrl`,
      {
        size: size
      }
    )
    return response.signedUrl
  }

  update(imageId: string, params: object) {
    return this.api.put(this.document + imageId, params)
  }

  async delete(imageId: string) {
    await this.api.delete(this.document + imageId)
    let images = this.currentImages
    images = images.filter((image) => image._id !== imageId)
    this.updateCurrentImages(images)
  }

  // Lightbox

  public lightboxIndexChannel(): Observable<any> {
    return this._lightboxIndex.asObservable()
  }

  openLightbox(image: Image) {
    this._lightboxIndex.next(this.currentImages.indexOf(image))
    document.body.classList.add('is-static')
  }

  closeLightbox() {
    this._lightboxIndex.next(null)
    document.body.classList.remove('is-static')
  }
}
