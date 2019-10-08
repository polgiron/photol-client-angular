import { Component } from '@angular/core';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private utils: Utils
  ) {
    this.utils.hideSplashscreen();
  }
}
