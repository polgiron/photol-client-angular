import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core'
import { ImageService } from 'src/app/services/image.service'
import { Image } from 'src/app/models/image.model'
import { fadeInAnimation } from 'src/app/utils/animations'
import { Tag } from 'src/app/models/tag.model'
import { AuthService } from 'src/app/services/authentication.service'

@Component({
  selector: 'app-image-thumb',
  templateUrl: './image-thumb.component.html',
  styleUrls: ['./image-thumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation]
})
export class ImageThumbComponent implements OnInit {
  @Input() image: Image
  @Input() tags: Tag[] // Separate tags in order to refresh
  @Input() stars: number // Separate stars in order to refresh
  @Input() editMode: boolean = false
  imageLoaded: boolean = false
  addMenuOpen: boolean = false

  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn
  }

  constructor(private auth: AuthService, private imageService: ImageService) {}

  ngOnInit(): void {}

  openPhotoModal(): void {
    this.imageService.openLightbox(this.image)
  }

  onImageLoaded(): void {
    this.imageLoaded = true
  }
}
