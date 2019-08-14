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

  constructor(
    private settingsService: SettingsService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.editMode = this.settingsService.settings.editMode;
  }

  onClickSetting() {
    this.editMode = !this.editMode;
    this.settingsService.updateSettings('editMode', this.editMode);
    this.ref.markForCheck();
  }
}
