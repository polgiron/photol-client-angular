import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core'
import { AuthService } from 'src/app/services/authentication.service'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit {
  activePopButton: any = {
    tags: false,
    settings: false
  }
  isLoggedIn: boolean = this.authService.isLoggedIn

  constructor(
    private ref: ChangeDetectorRef,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  onPopShown(type: string): void {
    this.activePopButton[type] = true
    this.ref.markForCheck()
  }

  onPopHidden(type: string): void {
    this.activePopButton[type] = false
    this.ref.markForCheck()
  }

  // onClickMenu(): void {
  //   window.scrollTo(0, 0);
  // }
}
