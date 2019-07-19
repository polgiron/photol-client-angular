import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ModalOptions } from 'ngx-bootstrap';
import { UploadService } from 'src/app/services/upload.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-modal-upload-progress',
  templateUrl: './modal-upload-progress.component.html',
  styleUrls: ['./modal-upload-progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalUploadProgressComponent implements OnInit, OnDestroy {
  private _alive: boolean = true;
  albumTitle: string;
  totalImages: number;
  progress: number = 0;

  constructor(
    private options: ModalOptions,
    private uploadService: UploadService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    if (this.options.initialState) {
      this.albumTitle = this.options.initialState['albumTitle'];
      this.totalImages = this.options.initialState['totalImages'];
    }

    this.uploadService.uploadProgressChannel()
      .pipe(takeWhile(() => this._alive))
      .subscribe((progress: number) => {
        this.progress = progress;
        this.ref.markForCheck();
      });
  }

  ngOnDestroy() {
    this._alive = false;
  }
}
