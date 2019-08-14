import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit {
  activeSettingsButton: boolean = false;

  constructor(
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  onPopSettingsShown() {
    this.activeSettingsButton = true;
    this.ref.markForCheck();
  }

  onPopSettingsHidden() {
    this.activeSettingsButton = false;
    this.ref.markForCheck();
  }
}
