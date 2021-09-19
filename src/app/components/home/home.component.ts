import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  HostListener
} from '@angular/core'
import { ImageService } from 'src/app/services/image.service'
import { takeWhile } from 'rxjs/operators'
import { fadeFastAnimation, transAnimation } from 'src/app/utils/animations'
import { SettingsService } from 'src/app/services/settings.service'
import { AuthService } from 'src/app/services/authentication.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeFastAnimation, transAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  private _alive: boolean = true
  index: number

  constructor(
    private imageService: ImageService,
    private ref: ChangeDetectorRef,
    private settings: SettingsService,
    private auth: AuthService
  ) {
    if (this.auth.isLoggedIn) {
      this.settings.init()
    }
  }

  ngOnInit(): void {
    this.imageService
      .lightboxIndexChannel()
      .pipe(takeWhile(() => this._alive))
      .subscribe((index: number) => {
        this.index = index
        this.ref.markForCheck()
      })
  }

  ngOnDestroy(): void {
    this._alive = false
  }
}
