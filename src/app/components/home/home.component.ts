import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { takeWhile } from 'rxjs/operators';
import { fadeFastAnimation } from 'src/app/utils/animations';

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
    private imageService: ImageService
  ) { }

  ngOnInit() {
    this.imageService.modalPhotoChannel()
      .pipe(takeWhile(() => this._alive))
      .subscribe((index: number) => {
        this.index = index;
      });
  }

  ngOnDestroy() {
    this._alive = false;
  }
}
