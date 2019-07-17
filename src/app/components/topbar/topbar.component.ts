import { Component, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { AlbumService } from 'src/app/services/album.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  private _alive: boolean = true;
  albumTitle: string = '';

  constructor(
    private albumService: AlbumService
  ) { }

  ngOnInit() {
    // this.albumService.albumTitleChannel()
    //   .pipe(takeWhile(() => this._alive))
    //   .subscribe((albumTitle: string) => {
    //     this.albumTitle = albumTitle;
    //   });
  }

  ngOnDestroy() {
    this._alive = false;
  }
}
