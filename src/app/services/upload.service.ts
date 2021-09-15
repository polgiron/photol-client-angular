import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { HttpClient, HttpResponse } from '@angular/common/http'
import { ModalService } from './modal.service'
import { Router } from '@angular/router'
import { environment } from 'src/environments/environment'
import { AuthService } from './authentication.service'

@Injectable()
export class UploadService {
  private _uploadProgress: Subject<number> = new Subject<number>()
  progress: number = 0

  constructor(
    private modalService: ModalService,
    private router: Router,
    private http: HttpClient,
    private auth: AuthService
  ) {}

  public uploadProgressChannel(): Observable<number> {
    return this._uploadProgress.asObservable()
  }

  upload(
    images: { file: File; albums: string[] }[],
    albumId: string,
    imageDate: number
  ) {
    this.progress = 0

    images.forEach((image, index) => {
      const formData: FormData = new FormData()

      formData.append('file', image.file)
      formData.append('order', String(index))
      for (let i = 0; i < image.albums.length; i++) {
        formData.append('albums[]', image.albums[i])
      }
      if (imageDate) {
        formData.append('date', String(imageDate))
      }

      this.http
        .post<FormData>(`${environment.domain}image`, formData, {
          headers: {
            Authorization: `Bearer ${this.auth.getToken()}`
          },
          reportProgress: true,
          observe: 'events'
        })
        .subscribe(
          (event) => {
            this.postRequestEvent(event, images.length, albumId)
          },
          (err) => console.log(err)
        )
    })
  }

  postRequestEvent(event: unknown, imagesLength: number, albumId: string) {
    console.log('---event')
    console.log(event)

    // const percentage = (event.loaded / event.total) * 100;
    // console.log(percentage + '%');

    if (event instanceof HttpResponse) {
      this.progress += 1
      this._uploadProgress.next(this.progress)

      if (this.progress === imagesLength) {
        setTimeout(() => {
          this.modalService.closeAll()
          this.router.navigate(['/', 'albums', albumId])
        }, 600)
      }
    }
  }
}
