import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { AuthService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {
  editMode: boolean = false;
  displayTags: boolean = false;
  email: string;

  constructor(
    private settingsService: SettingsService,
    private ref: ChangeDetectorRef,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.editMode = this.settingsService.settings.editMode;
    this.displayTags = this.settingsService.settings.displayTags;
    const user = this.auth.getUserDetails();
    this.email = user.email;
  }

  onClickSetting(type: string) {
    switch (type) {
      case 'editMode':
        this.editMode = !this.editMode;
        this.settingsService.updateSettings(type, this.editMode);
        break;
      case 'displayTags':
        this.displayTags = !this.displayTags;
        this.settingsService.updateSettings(type, this.displayTags);
        break;
    }
    this.ref.markForCheck();
  }

  logout() {
    this.auth.logout();
  }
}
