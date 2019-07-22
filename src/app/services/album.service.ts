import { Injectable } from '@angular/core';
import { Api } from './api.service';
import { Subject, Observable } from 'rxjs';
import { Image } from '../models/image.model';
import { Album } from '../models/album.model';
// import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AlbumService {
  // private _albumTitle: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  private _updateCover: Subject<Image> = new Subject<Image>();
  document: string = 'album/';
  currentId: number;

  constructor(
    private api: Api
  ) { }

  public updateCoverChannel(): Observable<Image> {
    return this._updateCover.asObservable();
  }

  updateCover(imageId: number) {
    this.update(this.currentId, {
      cover: imageId
    }).then((album: Album) => {
      this._updateCover.next(album.cover);
    });
  }

  // public albumTitleChannel(): Observable<string> {
  //   return this._albumTitle.asObservable();
  // }

  // setAlbumTitle(title: string) {
  //   this._albumTitle.next(title);
  // }

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
}
