import { Injectable } from '@angular/core';
import { Tag } from '../models/tag.model';
import { Api } from './api.service';

@Injectable()
export class TagService {
  document: string = 'tag/';

  constructor(
    private api: Api
  ) { }

  async getAll(): Promise<Tag[]> {
    const response: any = await this.api.get(this.document + 'all');
    return response.tags;
  }

  async getLastUsed(): Promise<Tag[]> {
    const response: any = await this.api.get(this.document + 'lastused');
    return response.tags;
  }

  async create(params: Object): Promise<Tag> {
    const response: any = await this.api.post(this.document, params);
    return response.tag;
  }

  delete(tagId: string): Promise<any> {
    return this.api.delete(this.document + tagId);
  }
}
