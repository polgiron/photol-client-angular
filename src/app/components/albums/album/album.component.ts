import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { AlbumService } from 'src/app/services/album.service'
import { fadeAnimation } from 'src/app/utils/animations'
import { takeWhile } from 'rxjs/operators'
import { Image } from 'src/app/models/image.model'
import { Album } from 'src/app/models/album.model'
import { SettingsService } from 'src/app/services/settings.service'
import { Settings } from 'src/app/models/settings.model'
import { ImageService } from 'src/app/services/image.service'

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
  animations: [fadeAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumComponent implements OnInit, OnDestroy {
  private _alive: boolean = true
  album: Album
  settings: Settings
  currentEditTextValue: string
  displayPrev: boolean = false
  displayNext: boolean = false

  constructor(
    private route: ActivatedRoute,
    private albumService: AlbumService,
    private ref: ChangeDetectorRef,
    private settingsService: SettingsService,
    private imageService: ImageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const albumId: string = params['albumId']

      if (albumId) {
        this.getAlbum(albumId)

        this.settingsService
          .settingsChannel()
          .pipe(takeWhile(() => this._alive))
          .subscribe((settings: Settings) => {
            this.settings = settings
            this.ref.markForCheck()
          })
      }
    })
  }

  async getAlbum(albumId: string) {
    // console.log('GET ALBUM');

    this.album = await this.albumService.getAlbum(albumId)
    // console.log(this.album);

    this.albumService.currentAlbum = this.album

    this.imageService.updateCurrentImages(this.album.images)

    this.displayNavigationButtons()

    this.ref.markForCheck()
  }

  displayNavigationButtons() {
    this.displayPrev = false
    this.displayNext = false

    if (this.albumService.getCurrentAlbumIndex(this.album) != 0) {
      this.displayPrev = true
    }

    if (
      this.albumService.getCurrentAlbumIndex(this.album) !=
      this.albumService.currentAlbums.length - 1
    ) {
      this.displayNext = true
    }
  }

  onTextFocus(event: any) {
    this.currentEditTextValue = event.target.textContent
  }

  onTextBlur(key: string, event: any) {
    const params = {}
    params[key] = event.target.textContent

    if (event.target.textContent !== '') {
      this.albumService.update(this.album._id, params)
    } else {
      event.target.textContent = this.currentEditTextValue
    }
  }

  onNumberKeyPress(event: any) {
    if (!isFinite(event.key)) event.preventDefault()
  }

  prev() {
    const currentAlbum = this.album
    this.album = null
    const currentIndex = this.albumService.getCurrentAlbumIndex(currentAlbum)
    const albumId = this.albumService.currentAlbums[currentIndex - 1]._id
    this.router.navigate(['/', 'albums', albumId])
  }

  next() {
    const currentAlbum = this.album
    this.album = null
    const currentIndex = this.albumService.getCurrentAlbumIndex(currentAlbum)
    const albumId = this.albumService.currentAlbums[currentIndex + 1]._id
    this.router.navigate(['/', 'albums', albumId])
  }

  ngOnDestroy() {
    this._alive = false
    this.albumService.currentAlbum = null
  }
}
