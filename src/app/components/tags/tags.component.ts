import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core'
import { Tag } from 'src/app/models/tag.model'
import { TagService } from 'src/app/services/tag.service'

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagsComponent implements OnInit {
  tags: Tag[]

  constructor(private tagService: TagService, private ref: ChangeDetectorRef) {}

  async ngOnInit() {
    this.tags = await this.tagService.getAll()
    this.ref.markForCheck()
  }
}
