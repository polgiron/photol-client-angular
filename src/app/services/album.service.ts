import { Injectable } from '@angular/core';
import { Api } from './api.service';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { Image } from '../models/image.model';
import { Album } from '../models/album.model';

@Injectable()
export class AlbumService {
  private _updateCover: Subject<Image> = new Subject<Image>();
  private _currentAlbums: BehaviorSubject<Album[]> = new BehaviorSubject<Album[]>([]);
  document: string = 'album/';
  currentAlbum: Album;

  constructor(
    private api: Api
  ) { }

  public currentAlbumsChannel(): Observable<Album[]> {
    return this._currentAlbums.asObservable();
  }

  get currentAlbums() {
    return [... this._currentAlbums.value];
  }

  updateCurrentAlbums(albums: Album[]) {
    this._currentAlbums.next(albums);
  }

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

  getCurrentAlbumIndex(albumToFind: Album) {
    const currentAlbum = this.currentAlbums.find(album => album._id == albumToFind._id);
    return this.currentAlbums.indexOf(currentAlbum);
  }

  async getAll() {
    const response: any = await this.api.get(this.document + 'all');
    this.updateCurrentAlbums(response.albums);
  }

  async getAlbum(albumId: string) {
    const response: any = await this.api.get(this.document + albumId);

    if (!this.currentAlbums.length) {
      await this.getAll();
    }

    return response.album;
  }

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

  async delete(albumId: string) {
    await this.api.delete(this.document + albumId);
    let albums = this.currentAlbums;
    albums = albums.filter(album => album._id != albumId);
    this.updateCurrentAlbums(albums);
  }
}
