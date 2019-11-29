import { Injectable } from '@angular/core';
import { Api } from './api.service';

@Injectable()
export class TagService {
  document: string = 'tag/';

  constructor(
    private api: Api
  ) { }

  async getAll() {
    const response: any = await this.api.get(this.document + 'all');
    return response.tags;
  }

  async getLastUsed() {
    const response: any = await this.api.get(this.document + 'lastused');
    return response.tags;
  }

  async create(params: Object) {
    const response: any = await this.api.post(this.document, params);
    return response.tag;
  }

  delete(tagId: string) {
    return this.api.delete(this.document + tagId);
  }
}
