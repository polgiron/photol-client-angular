import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { AlbumService } from 'src/app/services/album.service';
import { ModalService } from 'src/app/services/modal.service';
import { ModalCreateAlbumComponent } from '../modals/modal-create-album/modal-create-album.component';
import { ModalUploadProgressComponent } from '../modals/modal-upload-progress/modal-upload-progress.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {
  // private _alive: boolean = true;
  albumTitle: string = '';
  activeSettingsButton: boolean = false;

  constructor(
    private albumService: AlbumService,
    private modalService: ModalService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    // this.albumService.albumTitleChannel()
    //   .pipe(takeWhile(() => this._alive))
    //   .subscribe((albumTitle: string) => {
    //     this.albumTitle = albumTitle;
    //   });
    // this.onClickAddAlbum();

    // this.modalService.open(ModalCreateAlbumComponent, 'big');
    // this.modalService.open(ModalUploadProgressComponent, 'upload');
  }

  // onClickAddAlbum() {
  //   this.modalService.open(ModalCreateAlbumComponent, 'big');
  // }

  onPopSettingsShown() {
    this.activeSettingsButton = true;
    this.ref.markForCheck();
  }

  onPopSettingsHidden() {
    this.activeSettingsButton = false;
    this.ref.markForCheck();
  }

  // onClickSettingsButton() {
  //   this.activeSettingsButton = true;
  //   this.ref.markForCheck();
  // }

  ngOnDestroy() {
    // this._alive = false;
  }
}