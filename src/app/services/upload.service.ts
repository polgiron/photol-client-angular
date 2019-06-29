import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class UploadService {
  private _uploadPhotos: BehaviorSubject<File[]> = new BehaviorSubject<File[]>(null);

  constructor() { }

  public uploadPhotosChannel(): Observable<File[]> {
    return this._uploadPhotos.asObservable();
  }

  setUploadPhotos(photos: File[]) {
    this._uploadPhotos.next(photos);
  }
}
