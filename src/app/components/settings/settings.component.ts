import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core'
import { SettingsService } from 'src/app/services/settings.service'
import { AuthService } from 'src/app/services/authentication.service'
import { Settings } from 'src/app/models/settings.model'
import { takeWhile } from 'rxjs/operators'
import { ThemeService } from 'src/app/services/theme.service'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {
  private _alive: boolean = true
  settings: Settings
  email: string

  constructor(
    private settingsService: SettingsService,
    private ref: ChangeDetectorRef,
    private auth: AuthService,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    const user = this.auth.getUserDetails()
    this.email = user.email

    this.settingsService
      .settingsChannel()
      .pipe(takeWhile(() => this._alive))
      .subscribe((settings: Settings) => {
        this.settings = settings
        this.ref.markForCheck()
      })
  }

  ngOnDestroy() {
    this._alive = false
  }

  onClickSetting(type: string) {
    this.settings[type] = !this.settings[type]
    this.settingsService.updateSettings(this.settings)

    if (type === 'lightTheme') {
      this.themeService.setLightMode(this.settings['lightTheme'])
    }
  }

  logout() {
    this.auth.logout()
  }
}
