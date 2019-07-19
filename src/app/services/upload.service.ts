import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import {
  HttpClient, HttpRequest,
  HttpResponse, HttpEvent
} from '@angular/common/http'
import { BaseApi } from './base-api.service';
import { Image } from '../models/image.model';
import { Utils } from '../utils/utils';
import { ModalService } from './modal.service';
import { Router } from '@angular/router';

@Injectable()
export class UploadService {
  private _uploadProgress: Subject<number> = new Subject<number>();
  progress: number = 0;

  // httpEmitter: Subscription;
  // httpEvent: HttpEvent<{}>;

  constructor(
    private HttpClient: HttpClient,
    private api: BaseApi,
    private utils: Utils,
    private modalService: ModalService,
    private router: Router
  ) { }

  public uploadProgressChannel(): Observable<number> {
    return this._uploadProgress.asObservable();
  }

  upload(images: any[], albumId: number) {
    console.log('Upload function');
    console.log(images);

    this.progress = 0;

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
            this.progress += 1;
            this._uploadProgress.next(this.progress);

            if (this.progress == images.length) {
              console.log('UPLOAD DONE!');

              setTimeout(() => {
                this.modalService.closeAll();
              }, 600);

              // this.router.navigate(['/album']);
            }
          }
        },
        error => console.error('Error Uploading Files: ' + error.message)
      );
    });
  }
}
