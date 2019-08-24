import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit {
  activePopButton: any = {
    tags: false,
    settings: false
  };

  constructor(
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  onPopShown(type: string) {
    this.activePopButton[type] = true;
    this.ref.markForCheck();
  }

  onPopHidden(type: string) {
    this.activePopButton[type] = false;
    this.ref.markForCheck();
  }
}
