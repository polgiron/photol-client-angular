import { Injectable } from '@angular/core'
import { Api } from './api.service'
import { Subject, Observable, BehaviorSubject } from 'rxjs'
import { Album } from '../models/album.model'

@Injectable()
export class AlbumService {
  private _updateCover: Subject<string> = new Subject<string>()
  private _currentAlbums: BehaviorSubject<Album[]> = new BehaviorSubject<
    Album[]
  >([])
  document: string = 'album/'
  currentAlbum: Album

  constructor(private api: Api) {}

  public currentAlbumsChannel(): Observable<Album[]> {
    return this._currentAlbums.asObservable()
  }

  get currentAlbums() {
    return [...this._currentAlbums.value]
  }

  updateCurrentAlbums(albums: Album[]) {
    this._currentAlbums.next(albums)
  }

  public updateCoverChannel(): Observable<string> {
    return this._updateCover.asObservable()
  }

  async updateCover(imageId: string) {
    await this.update(this.currentAlbum._id, {
      covers: [imageId]
    })
    this._updateCover.next(imageId)
  }

  getCurrentAlbumIndex(albumToFind: Album) {
    const currentAlbum = this.currentAlbums.find(
      (album) => album._id === albumToFind._id
    )
    return this.currentAlbums.indexOf(currentAlbum)
  }

  async getAll() {
    const response = await this.api.get(`${this.document}all`)
    this.updateCurrentAlbums(response)
  }

  async getAlbum(albumId: string): Promise<Album> {
    const response = await this.api.get(`${this.document}${albumId}`)

    if (!this.currentAlbums.length) {
      await this.getAll()
    }

    return response
  }

  async rollIdExists(rollId: string) {
    const response = await this.api.get(`${this.document}roll/${rollId}`)
    return response !== null
  }

  async create(params: Object): Promise<Album> {
    return await this.api.post(this.document, params)
  }

  async update(albumId: string, params: any): Promise<Album> {
    return await this.api.put(`${this.document}${albumId}`, params)
  }

  async delete(albumId: string) {
    await this.api.delete(this.document + albumId)
    let albums = this.currentAlbums
    albums = albums.filter((album) => album._id != albumId)
    this.updateCurrentAlbums(albums)
  }
}
