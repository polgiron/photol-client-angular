import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumsComponent } from 'src/app/components/albums/albums.component';
import { AlbumComponent } from 'src/app/components/albums/album/album.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { PhotoComponent } from 'src/app/components/photos/photo/photo.component';
import { SearchComponent } from 'src/app/components/search/search.component';
import { LandpageComponent } from 'src/app/components/landpage/landpage.component';
import { AdminComponent } from 'src/app/components/admin/admin.component';

const routes: Routes = [
  // { path: '', redirectTo: 'albums', pathMatch: 'full' },
  // { path: '', redirectTo: 'admin', pathMatch: 'full' },
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: LandpageComponent },
      { path: 'albums', component: AlbumsComponent },
      { path: 'albums/:albumId', component: AlbumComponent },
      { path: 'photos/:photoId', component: PhotoComponent },
      { path: 'search', component: SearchComponent },
      { path: 'admin', component: AdminComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
