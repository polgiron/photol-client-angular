import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit
} from '@angular/core'
import { Image } from 'src/app/models/image.model'
import { ImageService } from 'src/app/services/image.service'

@Component({
  selector: 'app-cover-image',
  templateUrl: './cover-image.component.html',
  styleUrls: ['./cover-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoverImageComponent implements OnInit {
  @Input() image: Image
  isLoaded: boolean = false

  constructor(
    private ref: ChangeDetectorRef,
    private imageService: ImageService
  ) {}

  ngOnInit() {}

  onLoad() {
    this.isLoaded = true
    this.ref.markForCheck()
  }

  openPhotoModal() {
    this.imageService.openLightbox(this.image, true)
  }
}
