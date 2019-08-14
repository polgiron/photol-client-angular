import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { Api } from 'src/app/services/api.service';
import { HttpModule } from '@angular/http';
import { HomeComponent } from './components/home/home.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { AlbumComponent } from './components/albums/album/album.component';
import { DatePipe } from '@angular/common';
import { AlbumThumbComponent } from './components/albums/album-thumb/album-thumb.component';
import { LoaderComponent } from './components/loader/loader.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { FormsModule } from '@angular/forms';
import { ImagesComponent } from './components/images/images.component';
import { ImageThumbComponent } from './components/images/image-thumb/image-thumb.component';
import { TagsComponent } from './components/tags/tags.component';
import { DarkroomSettingsComponent } from './components/darkroom-settings/darkroom-settings.component';
import { ImagesetImageComponent } from './components/images/imageset-modal/imageset-image/imageset-image.component';
import { ImageService } from 'src/app/services/image.service';
import { TopbarComponent } from './components/topbar/topbar.component';
import { AlbumService } from 'src/app/services/album.service';
import { ImageComponent } from 'src/app/components/images/image/image.component';
import { SearchComponent } from './components/search/search.component';
import { Utils } from 'src/app/utils/utils';
import { PhotoInfosComponent } from './components/images/photo-infos/photo-infos.component';
import { ImagesetModalComponent } from './components/images/imageset-modal/imageset-modal.component';
import { LandpageComponent } from './components/landpage/landpage.component';
import { ngfModule } from "angular-file";
import { UploadService } from 'src/app/services/upload.service';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalService } from './services/modal.service';
import { ModalPickAlbumComponent } from './components/modals/modal-pick-album/modal-pick-album.component';
import { ModalCreateAlbumComponent } from './components/modals/modal-create-album/modal-create-album.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { ModalUploadProgressComponent } from './components/modals/modal-upload-progress/modal-upload-progress.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DeferLoadDirective } from './directives/defer-load.directive';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { SettingsComponent } from './components/settings/settings.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { SettingsService } from './services/settings.service';
import { MenuComponent } from './components/menu/menu.component';
import { TopbarService } from './services/topbar.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlbumsComponent,
    AlbumComponent,
    AlbumThumbComponent,
    LoaderComponent,
    SearchInputComponent,
    ImagesComponent,
    ImageThumbComponent,
    TagsComponent,
    DarkroomSettingsComponent,
    ImagesetImageComponent,
    TopbarComponent,
    ImageComponent,
    SearchComponent,
    PhotoInfosComponent,
    ImagesetModalComponent,
    LandpageComponent,
    ModalPickAlbumComponent,
    ModalCreateAlbumComponent,
    ModalUploadProgressComponent,
    FavoritesComponent,
    SidebarComponent,
    DeferLoadDirective,
    SettingsComponent,
    CheckboxComponent,
    MenuComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ngfModule,
    HttpClientModule,
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    PopoverModule.forRoot()
  ],
  providers: [
    Api,
    DatePipe,
    ImageService,
    AlbumService,
    Utils,
    UploadService,
    ModalService,
    SettingsService,
    TopbarService
  ],
  entryComponents: [
    ModalPickAlbumComponent,
    ModalCreateAlbumComponent,
    ModalUploadProgressComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
