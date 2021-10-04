import { Injectable } from '@angular/core'
import { Tag } from '../models/tag.model'
import { Api } from './api.service'

@Injectable()
export class TagService {
  document: string = 'tag/'
  // lastUsed: Tag[]

  constructor(private api: Api) {}

  async getAll(): Promise<Tag[]> {
    return await this.api.get(`${this.document}all`)
  }

  async getLastUsed(): Promise<Tag[]> {
    return await this.api.get(`${this.document}lastused`)
  }

  async create(params: Object): Promise<Tag> {
    return await this.api.post(this.document, params)
  }

  async delete(id: string): Promise<void> {
    await this.api.delete(`${this.document}${id}`)
  }
}
