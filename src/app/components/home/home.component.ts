import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { takeWhile } from 'rxjs/operators';
import { fadeFastAnimation } from 'src/app/utils/animations';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeFastAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  private _alive: boolean = true;
  index: number;

  constructor(
    private imageService: ImageService,
    private ref: ChangeDetectorRef,
    private settings: SettingsService
  ) {
    this.settings.init();
  }

  ngOnInit() {
    this.imageService.modalPhotoChannel()
      .pipe(takeWhile(() => this._alive))
      .subscribe((index: number) => {
        this.index = index;
        // console.log(index);
        this.ref.markForCheck();
      });
  }

  ngOnDestroy() {
    this._alive = false;
  }
}
