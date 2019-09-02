import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import {
  HttpClient, HttpRequest,
  HttpResponse, HttpEvent
} from '@angular/common/http'
import { Api } from './api.service';
import { Image } from '../models/image.model';
import { Utils } from '../utils/utils';
import { ModalService } from './modal.service';
import { Router } from '@angular/router';
import { Headers, Http, RequestOptions, ResponseType, ResponseContentType } from '@angular/http';
import { catchError } from 'rxjs/operators';

@Injectable()
export class UploadService {
  private _uploadProgress: Subject<number> = new Subject<number>();
  progress: number = 0;

  // httpEmitter: Subscription;
  // httpEvent: HttpEvent<{}>;

  constructor(
    private api: Api,
    private utils: Utils,
    private modalService: ModalService,
    private router: Router,
    private http: HttpClient
  ) { }

  public uploadProgressChannel(): Observable<number> {
    return this._uploadProgress.asObservable();
  }

  upload(images: any[], albumId: number, imageDate: number) {
    // console.log('Upload function');
    // console.log(images);

    this.progress = 0;

    images.forEach(image => {
      let formData: FormData = new FormData();

      formData.append('file', image.file);
      formData.append('albums', image.albums);

      if (imageDate) {
        formData.append('date', String(imageDate));
      }

      const req = new HttpRequest<FormData>(
        'POST',
        this.api.domain + 'image',
        formData, {
          reportProgress: true,
          responseType: 'text'
        });

      this.http.request(req).subscribe(
        event => {
          // console.log('sub', event);

          // this.httpEvent = event;

          if (event instanceof HttpResponse) {
            // delete this.httpEmitter;
            console.log('request done', event);
            this.progress += 1;
            this._uploadProgress.next(this.progress);

            if (this.progress == images.length) {
              console.log('UPLOAD DONE!');

              setTimeout(() => {
                this.modalService.closeAll();
                this.router.navigate(['/', 'albums', albumId]);
              }, 600);
            }
          }
        },
        error => console.error('Error Uploading Files: ' + error.message)
      );
    });
  }
}
