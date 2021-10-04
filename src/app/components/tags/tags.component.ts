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
import { Router } from '@angular/router'

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagsComponent implements OnInit {
  @Input() tags: Tag[]
  @Input() editMode: boolean = false
  @Input() inLightbox: boolean = false
  // @Input() set reload(value: boolean) {
  //   if (value && this.editMode) {
  //     this.tagService.getAll().then((allTags: Tag[]) => {
  //       this.allTags = allTags
  //       this.updateSuggestedTags()
  //     })
  //   }
  // }
  // newTagValue: string = ''
  // allTags: Tag[]
  // suggestedTags: Tag[]
  maxTags: number = 4

  get displayedTags(): Tag[] {
    return this.inLightbox ? this.tags : this.tags?.slice(0, this.maxTags)
  }

  constructor(
    private tagService: TagService,
    private imageService: ImageService,
    private ref: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onClickTag(tag: string): void {
    this.imageService.closeLightbox()
    this.router.navigateByUrl('/search?value=' + tag)
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
}
