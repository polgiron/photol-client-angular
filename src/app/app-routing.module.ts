import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumsComponent } from 'src/app/components/albums/albums.component';
import { AlbumComponent } from 'src/app/components/albums/album/album.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { SearchComponent } from 'src/app/components/search/search.component';
import { LandpageComponent } from 'src/app/components/landpage/landpage.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: LandpageComponent },
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
