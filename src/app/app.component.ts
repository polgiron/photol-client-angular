import { Component } from '@angular/core';
import { Utils } from 'src/app/utils/utils';
import { SettingsService } from './services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private utils: Utils,
    private settings: SettingsService
  ) {
    this.settings.init();
    this.utils.hideSplashscreen();
  }
}
