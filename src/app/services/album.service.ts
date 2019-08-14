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

  updateCover(imageId: number) {
    this.update(this.currentAlbum._id, {
      cover: imageId
    }).then((album: Album) => {
      this._updateCover.next(album.cover);
    });
  }

  getAll() {
    return this.api.get(this.document + 'all').then((response: any) => {
      return response.albums;
    });
  }

  getAlbum(albumId: number) {
    return this.api.get(this.document + albumId).then((response: any) => {
      return response.album;
    });
  }

  // getAlbumByRollId(rollId: number) {
  //   return this.api.get('album/roll/' + rollId).then((album: Album) => {
  //     return album;
  //   });
  // }

  rollIdExists(rollId: number) {
    return this.api.get(this.document + 'roll/' + rollId).then((response: any) => {
      return response.album != null;
    });
  }

  createAlbum(params: Object) {
    return this.api.post('album', params);
  }

  update(albumId: number, params: object) {
    return this.api.put(this.document + albumId, params).then((response: any) => {
      return response.album;
    });
  }

  delete(albumId: number) {
    return this.api.delete(this.document + albumId);
  }
}
