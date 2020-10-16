import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumsComponent } from 'src/app/components/albums/albums.component';
import { AlbumComponent } from 'src/app/components/albums/album/album.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { SearchComponent } from 'src/app/components/search/search.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './services/guards/auth-guard.service';
import { ToPrintComponent } from 'src/app/components/toprint/toprint.component';
import { PublicComponent } from './components/public/public.component';

const routes: Routes = [
  { path: '', redirectTo: 'public', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuardService] },
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'albums', component: AlbumsComponent, canActivate: [AuthGuardService] },
      { path: 'albums/:albumId', component: AlbumComponent, canActivate: [AuthGuardService] },
      { path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuardService] },
      { path: 'toprint', component: ToPrintComponent, canActivate: [AuthGuardService] },
      { path: 'search', component: SearchComponent, canActivate: [AuthGuardService] },
      { path: 'public', component: PublicComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
