import { Component, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { AlbumService } from 'src/app/services/album.service';
import { ModalService } from 'src/app/services/modal.service';
import { ModalCreateAlbumComponent } from '../modals/modal-create-album/modal-create-album.component';

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
    private modalService: ModalService
  ) { }

  ngOnInit() {
    // this.albumService.albumTitleChannel()
    //   .pipe(takeWhile(() => this._alive))
    //   .subscribe((albumTitle: string) => {
    //     this.albumTitle = albumTitle;
    //   });
    // this.onClickAddAlbum();

    this.modalService.open(ModalCreateAlbumComponent, 'big');
  }

  onClickAddAlbum() {
    this.modalService.open(ModalCreateAlbumComponent, 'big');
  }

  ngOnDestroy() {
    this._alive = false;
  }
}
