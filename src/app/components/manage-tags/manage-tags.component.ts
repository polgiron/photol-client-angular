import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Tag } from 'src/app/models/tag.model';
import { TagService } from 'src/app/services/tag.service';
import { fadeInAnimation } from 'src/app/utils/animations';

@Component({
  selector: 'app-manage-tags',
  templateUrl: './manage-tags.component.html',
  styleUrls: ['./manage-tags.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation]
})
export class ManageTagsComponent implements OnInit {
  newTagValue: string = '';
  tags: Tag[];

  constructor(
    private ref: ChangeDetectorRef,
    private tagService: TagService
  ) { }

  ngOnInit() {
    // setTimeout(() => {
      this.getTags();
    // }, 2000);
  }

  async getTags() {
    this.tags = await this.tagService.getAll();
    console.log('---TAGS');
    console.log(this.tags);
    this.ref.markForCheck();
  }

  async onKeyEnter() {
    if (this.newTagValue.length && !this.tags.find(tag => tag.value == this.newTagValue)) {
      const newTag = await this.tagService.create({
        value: this.newTagValue
      });
      this.tags = this.tags.concat(newTag);
      this.newTagValue = '';
      this.ref.markForCheck();
    }
  }

  deleteTag(deleteTag: Tag) {
    this.tagService.delete(deleteTag._id).then(() => {
      this.tags = this.tags.filter(tag => tag._id != deleteTag._id);
      this.ref.markForCheck();
    });
  }
}
