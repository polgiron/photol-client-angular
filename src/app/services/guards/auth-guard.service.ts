import { Injectable } from '@angular/core'
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router'
import { AuthService } from '../authentication.service'

@Injectable()
export class AuthGuardService implements CanActivate {
  // redirectUrl: string;

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isLoggedIn) {
      if (state.url == '/login') {
        this.router.navigateByUrl('/albums')
      }
      return true
    } else {
      if (state.url == '/login') {
        return true
      } else {
        // this.redirectUrl = state.url;
        this.router.navigateByUrl('/public')
        return false
      }
    }
  }
}
