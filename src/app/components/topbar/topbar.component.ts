import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { TopbarService } from 'src/app/services/topbar.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopbarComponent implements OnInit {
  // private _alive: boolean = true;
  // pageTitle: string = 'Home';

  constructor(
    // private topbarService: TopbarService,
    // private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    // this.topbarService.pageTitleChannel()
    //   .pipe(takeWhile(() => this._alive))
    //   .subscribe((pageTitle: string) => {
    //     this.pageTitle = pageTitle;
    //     this.ref.markForCheck();
    //   });
  }

  ngOnDestroy() {
    // this._alive = false;
  }
}
