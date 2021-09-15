import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core'
import { fadeAnimation } from 'src/app/utils/animations'
import { AlbumService } from 'src/app/services/album.service'
import { Album } from 'src/app/models/album.model'
import { ModalService } from 'src/app/services/modal.service'
import { ModalCreateAlbumComponent } from '../modals/modal-create-album/modal-create-album.component'
import { SettingsService } from 'src/app/services/settings.service'
import { takeWhile } from 'rxjs/operators'
import { Settings } from 'src/app/models/settings.model'
import { ImageSize } from 'src/app/models/image.model'

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
  animations: [fadeAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumsComponent implements OnInit, OnDestroy {
  private _alive: boolean = true
  albums: Album[]
  editMode: boolean = false

  constructor(
    private albumService: AlbumService,
    private ref: ChangeDetectorRef,
    private modalService: ModalService,
    private settingsService: SettingsService
  ) {}

  ngOnInit() {
    this.albumService.getAll()

    this.settingsService
      .settingsChannel()
      .pipe(takeWhile(() => this._alive))
      .subscribe((settings: Settings) => {
        this.editMode = settings.editMode
        this.ref.markForCheck()
      })

    this.albumService
      .currentAlbumsChannel()
      .pipe(takeWhile(() => this._alive))
      .subscribe((albums: Album[]) => {
        this.albums = albums
        this.ref.markForCheck()
      })
  }

  onClickAddAlbum() {
    this.modalService.open(ModalCreateAlbumComponent, ImageSize.BIG)
  }

  trackByFunction(index, item) {
    if (!item) {
      return null
    }
    return item._id
  }

  ngOnDestroy() {
    this._alive = false
  }
}
