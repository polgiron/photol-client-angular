import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Tag } from '../models/tag.model'
import { Api } from './api.service'
import { ImageService } from './image.service'

@Injectable()
export class TagService {
  document: string = 'tag/'
  lastUsed$: BehaviorSubject<Tag[]> = new BehaviorSubject([])

  constructor(private api: Api, private imageService: ImageService) {}

  async getAll(): Promise<Tag[]> {
    return await this.api.get(`${this.document}all`)
  }

  async getLastUsed(refresh: boolean = false): Promise<void> {
    if (refresh || !this.lastUsed$.value.length) {
      this.lastUsed$.next(await this.api.get(`${this.document}lastused`))
    } else {
      this.lastUsed$.next(this.lastUsed$.value)
    }
  }

  async create(params: Object): Promise<Tag> {
    return await this.api.post(this.document, params)
  }

  async delete(id: string): Promise<void> {
    await this.api.delete(`${this.document}${id}`)
  }

  updateCurrentImages(tags: Tag[], imageId: string): void {
    const images = this.imageService.currentImages
    images.map((image) => {
      if (image._id === imageId) {
        image.tags = tags
      }
    })
    this.imageService.updateCurrentImages(images)
  }
}
