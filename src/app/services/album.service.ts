import { Injectable } from '@angular/core';
import { Api } from './api.service';
import { Subject, Observable } from 'rxjs';
import { Image } from '../models/image.model';
import { Album } from '../models/album.model';

@Injectable()
export class AlbumService {
  private _updateCover: Subject<Image> = new Subject<Image>();
  document: string = 'album/';
  currentAlbum: Album;

  constructor(
    private api: Api
  ) { }

  public updateCoverChannel(): Observable<Image> {
    return this._updateCover.asObservable();
  }

  updateCover(imageId: string) {
    this.update(this.currentAlbum._id, {
      cover: imageId
    }).then((album: Album) => {
      this._updateCover.next(album.cover);
    });
  }

  async getAll() {
    const response: any = await this.api.get(this.document + 'all');
    return response.albums;
  }

  async getAlbum(albumId: string) {
    const response: any = await this.api.get(this.document + albumId);
    return response.album;
  }

  // getAlbumByRollId(rollId: string) {
  //   return this.api.get('album/roll/' + rollId).then((album: Album) => {
  //     return album;
  //   });
  // }

  async rollIdExists(rollId: string) {
    const response: any = await this.api.get(this.document + 'roll/' + rollId);
    return response.album != null;
  }

  async create(params: Object) {
    const response: any = await this.api.post(this.document, params);
    return response.album;
  }

  async update(albumId: string, params: object) {
    const response: any = await this.api.put(this.document + albumId, params);
    return response.album;
  }

  delete(albumId: string) {
    return this.api.delete(this.document + albumId);
  }
}
