import { Injectable } from '@angular/core';
import { BaseApi } from './base-api.service';
// import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AlbumService {
  // private _albumTitle: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(
    private api: BaseApi
  ) { }

  getAlbums() {
    return this.api.get('album/all').then((response: any) => {
      return response.albums;
    });
  }

  getAlbum(albumId: number) {
    return this.api.get('album/' + albumId).then((response: any) => {
      return response.album;
    });
  }

  // getAlbumByRollId(rollId: number) {
  //   return this.api.get('album/roll/' + rollId).then((album: Album) => {
  //     return album;
  //   });
  // }

  rollIdExists(rollId: number) {
    return this.api.get('album/roll/' + rollId).then((response: any) => {
      return response.album != null;
    });
  }

  createAlbum(params: Object) {
    return this.api.post('album', params);
  }

  // public albumTitleChannel(): Observable<string> {
  //   return this._albumTitle.asObservable();
  // }

  // setAlbumTitle(title: string) {
  //   this._albumTitle.next(title);
  // }
}
