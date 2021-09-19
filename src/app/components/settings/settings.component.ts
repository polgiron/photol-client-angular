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

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {
  // editMode: boolean = false
  // displayTags: boolean = false
  private _alive: boolean = true
  settings: Settings
  email: string

  constructor(
    private settingsService: SettingsService,
    private ref: ChangeDetectorRef,
    private auth: AuthService
  ) {}

  ngOnInit() {
    // this.editMode = this.settingsService.settings.editMode
    // this.displayTags = this.settingsService.settings.displayTags
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
    switch (type) {
      case 'editMode':
        this.settings.editMode = !this.settings.editMode
        this.settingsService.updateSettings(this.settings)
        break
      // case 'displayTags':
      //   this.displayTags = !this.displayTags
      //   this.settingsService.updateSettings(type, this.displayTags)
      //   break
    }
    this.ref.markForCheck()
  }

  logout() {
    this.auth.logout()
  }
}
