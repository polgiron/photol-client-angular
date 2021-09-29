import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { Observable } from 'rxjs'
import { AuthService } from 'src/app/services/authentication.service'
import { ResponsiveService } from 'src/app/services/responsive.service'

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopbarComponent implements OnInit {
  isScreenSmall$: Observable<boolean> = this.responsiveService.isScreenSmall$

  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn
  }

  constructor(
    private auth: AuthService,
    private responsiveService: ResponsiveService
  ) {}

  ngOnInit(): void {}
}
