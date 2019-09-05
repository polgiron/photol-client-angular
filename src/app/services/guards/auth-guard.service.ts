import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  // redirectUrl: string;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    if (this.authService.isLoggedIn) {
      if (state.url == '/login') {
        this.router.navigateByUrl('/');
      }
      return true;
    } else {
      if (state.url == '/login') {
        return true;
      } else {
        // this.redirectUrl = state.url;
        this.router.navigateByUrl('/login');
        return false;
      }
    }
  }
}
