import { Injectable } from '@angular/core'
import { Api } from './api.service'
import { Subject, Observable, BehaviorSubject } from 'rxjs'
import { Album, MultipleAlbum, OneAlbum } from '../models/album.model'

@Injectable()
export class AlbumService {
  // private _updateCover: Subject<string> = new Subject<string>()
  private _currentAlbums: BehaviorSubject<MultipleAlbum[]> =
    new BehaviorSubject<MultipleAlbum[]>([])
  document: string = 'album/'
  currentAlbum: OneAlbum

  constructor(private api: Api) {}

  public currentAlbumsChannel(): Observable<MultipleAlbum[]> {
    return this._currentAlbums.asObservable()
  }

  get currentAlbums() {
    return [...this._currentAlbums.value]
  }

  // public updateCoverChannel(): Observable<string> {
  //   return this._updateCover.asObservable()
  // }

  async addCover(imageId: string) {
    this.currentAlbum.covers.push(imageId)
    await this.update(this.currentAlbum._id, {
      covers: this.currentAlbum.covers
    })
    // this._updateCover.next(imageId)
  }

  async removeCover(imageId: string) {
    this.currentAlbum.covers.splice(
      this.currentAlbum.covers.indexOf(imageId),
      1
    )
    await this.update(this.currentAlbum._id, {
      covers: this.currentAlbum.covers
    })
    // this._updateCover.next(imageId)
  }

  getCurrentAlbumIndex(albumToFind: Album) {
    const currentAlbum = this.currentAlbums.find(
      (album) => album._id === albumToFind._id
    )
    return this.currentAlbums.indexOf(currentAlbum)
  }

  async getAll() {
    const response = await this.api.get(`${this.document}all`)
    this._currentAlbums.next(response)
  }

  async getAlbum(albumId: string): Promise<OneAlbum> {
    const response = await this.api.get(`${this.document}${albumId}`)
    console.log(response)

    if (!this.currentAlbums.length) {
      await this.getAll()
    }

    return response
  }

  async rollIdExists(rollId: string) {
    const response = await this.api.get(`${this.document}roll/${rollId}`)
    return response !== null
  }

  async create(params: any = {}): Promise<Album> {
    const album: MultipleAlbum = await this.api.post(this.document, params)
    const albums = this.currentAlbums
    albums.unshift(album)
    this._currentAlbums.next(albums)
    return album
  }

  async update(albumId: string, params: any): Promise<Album> {
    return await this.api.put(`${this.document}${albumId}`, params)
  }

  async delete(albumId: string) {
    await this.api.delete(this.document + albumId)
    let albums = this.currentAlbums
    albums = albums.filter((album) => album._id != albumId)
    this._currentAlbums.next(albums)
  }
}
