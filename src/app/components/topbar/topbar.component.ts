import { Component, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { AlbumService } from 'src/app/services/album.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  private _alive: boolean = true;
  albumTitle: string = '';

  constructor(
    private albumService: AlbumService,
    private uploadService: UploadService
  ) { }

  ngOnInit() {
    this.albumService.albumTitleChannel()
      .pipe(takeWhile(() => this._alive))
      .subscribe((albumTitle: string) => {
        this.albumTitle = albumTitle;
      });
  }

  onSearch(event: any) {

  }

  onUpload(files: File[]) {
    this.uploadService.setUploadPhotos(files);
  }

  ngOnDestroy() {
    this._alive = false;
  }
}
