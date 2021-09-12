import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Input
} from '@angular/core'
import { Tag } from 'src/app/models/tag.model'
import { TagService } from 'src/app/services/tag.service'
import { fadeInAnimation } from 'src/app/utils/animations'
import { ImageService } from 'src/app/services/image.service'
import { Router } from '@angular/router'
import { PopoverDirective } from 'ngx-bootstrap/popover'

@Component({
  selector: 'app-manage-tags',
  templateUrl: './manage-tags.component.html',
  styleUrls: ['./manage-tags.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation]
})
export class ManageTagsComponent implements OnInit {
  @Input() popoverTags: PopoverDirective
  newTagValue: string = ''
  tags: Tag[]

  constructor(
    private ref: ChangeDetectorRef,
    private tagService: TagService,
    private imageService: ImageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getTags()
  }

  async getTags() {
    this.tags = await this.tagService.getAll()
    // console.log('---TAGS');
    // console.log(this.tags);
    this.ref.markForCheck()
  }

  // async onKeyEnter() {
  //   if (this.newTagValue.length && !this.tags.find(tag => tag.value == this.newTagValue)) {
  //     const newTag = await this.tagService.create({
  //       value: this.newTagValue
  //     });
  //     this.tags = this.tags.concat(newTag);
  //     this.newTagValue = '';
  //     this.ref.markForCheck();
  //   }
  // }

  deleteTag(event: any, deleteTag: Tag) {
    event.stopPropagation()

    this.tagService.delete(deleteTag._id).then(() => {
      this.tags = this.tags.filter((tag) => tag._id != deleteTag._id)

      const currentImages = this.imageService.currentImages
      currentImages.map((image) => {
        image.tags = image.tags.filter((tag) => tag._id != deleteTag._id)
      })
      console.log()
      this.imageService.updateCurrentImages(currentImages)

      this.ref.markForCheck()
    })
  }

  onClickTag(tag: string) {
    this.popoverTags.hide()
    this.router.navigateByUrl('/search?value=' + tag)
  }
}
