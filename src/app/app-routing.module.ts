import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumsComponent } from 'src/app/components/albums/albums.component';
import { AlbumComponent } from 'src/app/components/albums/album/album.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { SearchComponent } from 'src/app/components/search/search.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './services/guards/auth-guard.service';
// import { LandpageComponent } from 'src/app/components/landpage/landpage.component';

const routes: Routes = [
  { path: '', redirectTo: 'albums', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuardService] },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuardService],
    children: [
      // { path: '', component: LandpageComponent },
      { path: 'albums', component: AlbumsComponent },
      { path: 'albums/:albumId', component: AlbumComponent },
      { path: 'favorites', component: FavoritesComponent },
      { path: 'search', component: SearchComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
