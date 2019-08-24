import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Tag } from 'src/app/models/tag.model';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-manage-tags',
  templateUrl: './manage-tags.component.html',
  styleUrls: ['./manage-tags.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManageTagsComponent implements OnInit {
  newTagValue: string = '';
  tags: Tag[];

  constructor(
    private ref: ChangeDetectorRef,
    private tagService: TagService
  ) { }

  ngOnInit() {
    this.getTags();
  }

  async getTags() {
    this.tags = await this.tagService.getAll();
    this.ref.markForCheck();
  }

  deleteTag(deleteTag: Tag) {
    this.tagService.delete(deleteTag._id).then(() => {
      this.tags = this.tags.filter(tag => tag._id != deleteTag._id);
      this.ref.markForCheck();
    });
  }
}
