import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import {
  HttpClient, HttpRequest,
  HttpResponse, HttpEvent
} from '@angular/common/http'
import { BaseApi } from './base-api.service';
import { Image } from '../models/image.model';
import { Utils } from '../utils/utils';

@Injectable()
export class UploadService {
  // private _uploadPhotos: BehaviorSubject<File[]> = new BehaviorSubject<File[]>(null);

  // httpEmitter: Subscription;
  // httpEvent: HttpEvent<{}>;

  constructor(
    private HttpClient: HttpClient,
    private api: BaseApi,
    private utils: Utils
  ) { }

  // public uploadPhotosChannel(): Observable<File[]> {
  //   return this._uploadPhotos.asObservable();
  // }

  // setUploadPhotos(photos: File[]) {
  //   this._uploadPhotos.next(photos);
  // }

  upload(images: any[]) {
    images.forEach(image => {
      let formData: FormData = new FormData();
      // formData.append('title', image.title);
      formData.append('file', image.file);

      const req = new HttpRequest<FormData>(
        'POST',
        this.api.domain + 'image',
        formData, {
          reportProgress: true,
          responseType: 'text'
        });

      // this.httpEmitter = this.HttpClient.request(req)
      this.HttpClient.request(req).subscribe(
        event => {
          console.log('sub', event);

          // this.httpEvent = event;

          if (event instanceof HttpResponse) {
            // delete this.httpEmitter;
            console.log('request done', event);
          }
        },
        error => console.error('Error Uploading Files: ' + error.message)
      );
    });
  }
}
