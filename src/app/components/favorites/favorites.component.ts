import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core'
import { ImageService } from 'src/app/services/image.service'
import { fadeAnimation } from 'src/app/utils/animations'
import { Tag } from 'src/app/models/tag.model'
import { Image } from 'src/app/models/image.model'
import { Utils } from 'src/app/utils/utils'

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  animations: [fadeAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesComponent implements OnInit {
  loading: boolean = true
  tags: Tag[] = []
  images: Image[]
  displayImages: Image[]

  constructor(
    private imageService: ImageService,
    private ref: ChangeDetectorRef,
    private utils: Utils
  ) {}

  ngOnInit() {
    this.getFavorites()
  }

  async getFavorites() {
    this.images = await this.imageService.getFavorites()
    this.displayImages = this.images
    this.imageService.updateCurrentImages(this.displayImages)
    this.images.map((image: Image) => {
      this.tags = this.tags.concat(image.tags)
    })
    this.tags = this.utils.removeDuplicates(this.tags)
    this.loading = false
    this.ref.markForCheck()
  }

  updateFilters(tags: string[]) {
    // console.log(tags);

    this.displayImages = this.images.filter((image) => {
      let condition: boolean = false
      tags.map((selectedTag) => {
        condition =
          condition || image.tags.some((tag) => tag._id == selectedTag)
      })
      return condition
    })

    if (!tags.length) {
      this.displayImages = this.images
    }

    this.imageService.updateCurrentImages(this.displayImages)

    this.ref.markForCheck()
  }
}
