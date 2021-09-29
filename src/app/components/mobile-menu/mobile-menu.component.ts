import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core'
import { fadeAnimation, transAnimation } from 'src/app/utils/animations'

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation, transAnimation]
})
export class MobileMenuComponent implements OnInit {
  isOpen: boolean = false

  constructor(private ref: ChangeDetectorRef) {}

  ngOnInit() {}

  toggle() {
    this.isOpen ? this.close() : this.open()
  }

  open() {
    this.isOpen = true
    this.ref.markForCheck()
    document.querySelector('body').classList.add('disable-scroll')
  }

  close() {
    this.isOpen = false
    this.ref.markForCheck()
    document.querySelector('body').classList.remove('disable-scroll')
  }
}
