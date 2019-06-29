import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { BaseApi } from 'src/app/services/base-api.service';
import { HttpModule } from '@angular/http';
import { HomeComponent } from './components/home/home.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { AlbumComponent } from './components/albums/album/album.component';
import { DatePipe } from '@angular/common';
import { AlbumThumbComponent } from './components/albums/album-thumb/album-thumb.component';
import { LoaderComponent } from './components/loader/loader.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { FormsModule } from '@angular/forms';
import { PhotosComponent } from './components/photos/photos.component';
import { PhotoComponent } from './components/photos/photo/photo.component';
import { PhotoThumbComponent } from './components/photos/photo-thumb/photo-thumb.component';
import { TagsComponent } from './components/tags/tags.component';
import { DarkroomSettingsComponent } from './components/darkroom-settings/darkroom-settings.component';
import { PhotoModalComponent } from './components/photos/photo-modal/photo-modal.component';
import { PhotoService } from 'src/app/services/photo.service';
import { TopbarComponent } from './components/topbar/topbar.component';
import { AlbumService } from 'src/app/services/album.service';
import { ImageComponent } from 'src/app/components/image/image.component';
import { SearchComponent } from './components/search/search.component';
import { Utils } from 'src/app/utils/utils';
import { PhotoInfosComponent } from './components/photos/photo-infos/photo-infos.component';
import { PhotosetModalComponent } from './components/photos/photoset-modal/photoset-modal.component';
import { LandpageComponent } from './components/landpage/landpage.component';
import { AdminComponent } from './components/admin/admin.component';
import { ngfModule } from "angular-file";
import { UploadService } from 'src/app/services/upload.service';
import { CheckboxComponent } from 'src/app/components/admin/checkbox/checkbox.component';
import { CacheService } from 'src/app/services/cache.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlbumsComponent,
    AlbumComponent,
    AlbumThumbComponent,
    LoaderComponent,
    SearchInputComponent,
    PhotosComponent,
    PhotoComponent,
    PhotoThumbComponent,
    TagsComponent,
    DarkroomSettingsComponent,
    PhotoModalComponent,
    TopbarComponent,
    ImageComponent,
    SearchComponent,
    PhotoInfosComponent,
    PhotosetModalComponent,
    LandpageComponent,
    AdminComponent,
    CheckboxComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ngfModule
  ],
  providers: [
    BaseApi,
    DatePipe,
    PhotoService,
    AlbumService,
    Utils,
    UploadService,
    CacheService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
