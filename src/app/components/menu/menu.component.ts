import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Output,
  EventEmitter
} from '@angular/core'
import { Observable } from 'rxjs'
import { AuthService } from 'src/app/services/authentication.service'
import { ResponsiveService } from 'src/app/services/responsive.service'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit {
  @Output() onMenuClick: EventEmitter<void> = new EventEmitter()
  activePopButton: any = {
    tags: false,
    settings: false
  }
  isLoggedIn: boolean = this.authService.isLoggedIn
  isScreenSmall$: Observable<boolean> = this.responsiveService.isScreenSmall$

  constructor(
    private ref: ChangeDetectorRef,
    private authService: AuthService,
    private responsiveService: ResponsiveService
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

  onClickMenu(): void {
    this.onMenuClick.emit()
  }
}
