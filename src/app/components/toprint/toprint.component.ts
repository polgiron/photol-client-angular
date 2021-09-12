import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core'
import { ImageService } from 'src/app/services/image.service'
import { fadeAnimation } from 'src/app/utils/animations'
import { Image } from 'src/app/models/image.model'

@Component({
  selector: 'app-toprint',
  templateUrl: './toprint.component.html',
  styleUrls: ['./toprint.component.scss'],
  animations: [fadeAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToPrintComponent implements OnInit {
  loading: boolean = true
  images: Image[]

  constructor(
    private imageService: ImageService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getToPrint()
  }

  async getToPrint() {
    this.images = await this.imageService.getToPrint()
    this.imageService.updateCurrentImages(this.images)
    this.loading = false
    this.ref.markForCheck()
  }
}
