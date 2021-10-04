import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core'
import { TagService } from 'src/app/services/tag.service'
import { Tag } from 'src/app/models/tag.model'
import { ImageService } from 'src/app/services/image.service'
import { fadeAnimation } from 'src/app/utils/animations'

@Component({
  selector: 'app-edit-tags',
  templateUrl: './edit-tags.component.html',
  styleUrls: ['./edit-tags.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation]
})
export class EditTagsComponent implements OnInit {
  @Input() tags: Tag[]
  @Input() imageId: string
  // @Input() set reload(value: boolean) {
  //   if (value && this.editMode) {
  //     this.tagService.getAll().then((allTags: Tag[]) => {
  //       this.allTags = allTags
  //       this.updateSuggestedTags()
  //     })
  //   }
  // }
  newTagValue: string = ''
  allTags: Tag[]
  suggestedTags: Tag[]

  constructor(
    private tagService: TagService,
    private imageService: ImageService,
    private ref: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    this.allTags = await this.tagService.getAll()
    this.updateSuggestedTags()
  }

  async onFocus(): Promise<void> {
    this.allTags = await this.tagService.getAll()
    this.updateSuggestedTags()
    this.ref.markForCheck()
  }

  async updateSuggestedTags(): Promise<void> {
    this.suggestedTags = await this.tagService.getLastUsed()
    this.suggestedTags = this.suggestedTags.filter((tag) => {
      return !this.tags.find((imageTag) => imageTag._id == tag._id)
    })
    this.ref.markForCheck()
  }

  async onKeyEnter(): Promise<void> {
    if (
      this.newTagValue.length &&
      !this.tags.find((tag) => tag.value == this.newTagValue)
    ) {
      const existingTag = this.allTags.find(
        (tag) => tag.value == this.newTagValue
      )

      if (existingTag) {
        // Add tag to image
        this.addExistingTag(existingTag)
      } else {
        // Create tag and add to image
        this.addNewTag(this.newTagValue)
      }

      this.newTagValue = ''
      this.ref.markForCheck()
    }
  }

  addExistingTag(tag: Tag): void {
    this.tags = this.tags.concat(tag)
    this.imageService.update(this.imageId, {
      tags: this.tags
    })
    this.updateSuggestedTags()
    this.updateCurrentImages()
    this.ref.markForCheck()
  }

  async addNewTag(tag: string): Promise<void> {
    const newTag = await this.tagService.create({
      value: tag,
      images: [this.imageId]
    })
    this.tags = this.tags.concat(newTag)
    this.updateCurrentImages()
    this.ref.markForCheck()
  }

  // removeTag(deleteTag: Tag): void {
  //   this.tags = this.tags.filter((tag) => tag._id !== deleteTag._id)
  //   this.imageService.update(this.imageId, {
  //     tags: this.tags
  //   })
  //   if (this.suggestedTags) {
  //     this.updateSuggestedTags()
  //   }
  //   this.updateCurrentImages()
  //   this.ref.markForCheck()
  // }

  updateCurrentImages(): void {
    const images = this.imageService.currentImages
    images.map((image) => {
      if (image._id == this.imageId) {
        image.tags = this.tags
      }
    })
    this.imageService.updateCurrentImages(images)
  }
}
