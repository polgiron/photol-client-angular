import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { fadeAnimation } from 'src/app/utils/animations';
import { Image } from 'src/app/models/image.model';
// import { TopbarService } from 'src/app/services/topbar.service';

@Component({
  selector: 'app-landpage',
  templateUrl: './landpage.component.html',
  styleUrls: ['./landpage.component.scss'],
  animations: [fadeAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandpageComponent implements OnInit {
  images: Image[];

  constructor(
    private imageService: ImageService,
    private ref: ChangeDetectorRef,
    // private topbarService: TopbarService
  ) { }

  ngOnInit() {
    // this.topbarService.updatePageTitle('Home');
    this.getLandpage();
  }

  async getLandpage() {
    this.images = await this.imageService.getAll();
    this.ref.markForCheck();
  }
}
