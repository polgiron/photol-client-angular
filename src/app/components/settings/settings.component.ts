import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {
  editMode: boolean = false;
  displayTags: boolean = false;

  constructor(
    private settingsService: SettingsService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.editMode = this.settingsService.settings.editMode;
    this.displayTags = this.settingsService.settings.displayTags;
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
}
