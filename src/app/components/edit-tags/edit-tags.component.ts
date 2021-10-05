import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core'
import { TagService } from 'src/app/services/tag.service'
import { Tag } from 'src/app/models/tag.model'
import { ImageService } from 'src/app/services/image.service'
import { fadeAnimation } from 'src/app/utils/animations'
import { takeWhile } from 'rxjs/operators'

@Component({
  selector: 'app-edit-tags',
  templateUrl: './edit-tags.component.html',
  styleUrls: ['./edit-tags.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation]
})
export class EditTagsComponent implements OnInit, OnDestroy {
  @Input() tags: Tag[]
  @Input() imageId: string
  alive: boolean = true
  newTagValue: string = ''
  lastUsed: Tag[]

  constructor(
    private tagService: TagService,
    private imageService: ImageService,
    private ref: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    this.tagService.getLastUsed()
    this.tagService.lastUsed$
      .pipe(takeWhile(() => this.alive))
      .subscribe((lastUsed: Tag[]) => {
        this.lastUsed = lastUsed.filter((tag) => {
          return !this.tags.find((imageTag) => imageTag._id === tag._id)
        })
        this.ref.markForCheck()
      })
  }

  ngOnDestroy(): void {
    this.alive = false
  }

  async addTag(): Promise<void> {
    if (
      this.newTagValue.length &&
      !this.tags.find((tag) => tag.value === this.newTagValue)
    ) {
      const allTags: Tag[] = await this.tagService.getAll()
      const existingTag = allTags.find((tag) => tag.value === this.newTagValue)

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
    this.tagService.getLastUsed()
    this.tagService.updateCurrentImages(this.tags, this.imageId)
    this.ref.markForCheck()
  }

  async addNewTag(tag: string): Promise<void> {
    const newTag = await this.tagService.create({
      value: tag,
      images: [this.imageId]
    })
    this.tags = this.tags.concat(newTag)
    this.tagService.getLastUsed(true)
    this.tagService.updateCurrentImages(this.tags, this.imageId)
    this.ref.markForCheck()
  }
}
