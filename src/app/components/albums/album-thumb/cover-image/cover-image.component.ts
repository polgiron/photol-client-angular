import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core'

@Component({
  selector: 'app-cover-image',
  templateUrl: './cover-image.component.html',
  styleUrls: ['./cover-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoverImageComponent implements OnInit {
  @Input() src: string
  isLoaded: boolean = false

  constructor(private ref: ChangeDetectorRef) {}

  ngOnInit() {}

  onLoad() {
    this.isLoaded = true
    this.ref.markForCheck()
  }
}
