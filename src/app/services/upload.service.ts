import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import {
  HttpClient, HttpRequest,
  HttpResponse,
  HttpHeaders
} from '@angular/common/http'
import { ModalService } from './modal.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class UploadService {
  private _uploadProgress: Subject<number> = new Subject<number>();
  progress: number = 0;
  httpEmitter: Subscription;

  constructor(
    private modalService: ModalService,
    private router: Router,
    private http: HttpClient,
    private auth: AuthenticationService
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
        environment.domain + 'image',
        formData, {
          headers: new HttpHeaders({
            'Authorization': `Bearer ${this.auth.getToken()}`
          }),
          withCredentials: true,
          reportProgress: true,
          responseType: 'text'
        });

      this.httpEmitter = this.http.request(req).subscribe(
        (event: any) => {
          // console.log('---event');
          // console.log(event);
          // const percentage = (event.loaded / event.total) * 100;
          // console.log(percentage + '%');

          if (event instanceof HttpResponse) {
            delete this.httpEmitter;

            // console.log('-----request done');

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
