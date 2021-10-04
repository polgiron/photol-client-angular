import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core'
import { ImageService } from 'src/app/services/image.service'
import { takeWhile } from 'rxjs/operators'
import { fadeFastAnimation } from 'src/app/utils/animations'
import { SettingsService } from 'src/app/services/settings.service'
import { AuthService } from 'src/app/services/authentication.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeFastAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  index: Observable<number> = this.imageService.lightboxIndexChannel()

  constructor(
    private imageService: ImageService,
    private settings: SettingsService,
    private auth: AuthService
  ) {
    if (this.auth.isLoggedIn) {
      this.settings.init()
    }
  }

  ngOnInit(): void {}
}
