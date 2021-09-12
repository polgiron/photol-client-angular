import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AppRoutingModule } from './app-routing.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppComponent } from './app.component'
import { Api } from 'src/app/services/api.service'
import { HomeComponent } from './components/home/home.component'
import { AlbumsComponent } from './components/albums/albums.component'
import { AlbumComponent } from './components/albums/album/album.component'
import { DatePipe } from '@angular/common'
import { AlbumThumbComponent } from './components/albums/album-thumb/album-thumb.component'
import { LoaderComponent } from './components/loader/loader.component'
import { SearchInputComponent } from './components/search-input/search-input.component'
import { FormsModule } from '@angular/forms'
import { ImagesComponent } from './components/images/images.component'
import { ImageThumbComponent } from './components/images/image-thumb/image-thumb.component'
import { TagsComponent } from './components/tags/tags.component'
import { LightboxEntryComponent } from './components/lightbox/lightbox-entry/lightbox-entry.component'
import { ImageService } from 'src/app/services/image.service'
import { TopbarComponent } from './components/topbar/topbar.component'
import { AlbumService } from 'src/app/services/album.service'
import { ImageComponent } from 'src/app/components/images/image/image.component'
import { SearchComponent } from './components/search/search.component'
import { Utils } from 'src/app/utils/utils'
import { LightboxComponent } from './components/lightbox/lightbox.component'
import { ngfModule } from 'angular-file'
import { UploadService } from 'src/app/services/upload.service'
import { HttpClientModule } from '@angular/common/http'
import { ModalModule } from 'ngx-bootstrap/modal'
import { ModalService } from './services/modal.service'
import { ModalCreateAlbumComponent } from './components/modals/modal-create-album/modal-create-album.component'
import { ProgressbarModule } from 'ngx-bootstrap/progressbar'
import { ModalUploadProgressComponent } from './components/modals/modal-upload-progress/modal-upload-progress.component'
import { FavoritesComponent } from './components/favorites/favorites.component'
import { DeferLoadDirective } from './directives/defer-load.directive'
import { PopoverModule } from 'ngx-bootstrap/popover'
import { SettingsComponent } from './components/settings/settings.component'
import { CheckboxComponent } from './components/checkbox/checkbox.component'
import { SettingsService } from './services/settings.service'
import { MenuComponent } from './components/menu/menu.component'
import { PreventDefaultClickDirective } from './directives/prevent-default-click.directive'
import { TagService } from './services/tag.service'
import { TooltipModule } from 'ngx-bootstrap/tooltip'
import { ManageTagsComponent } from './components/manage-tags/manage-tags.component'
import { SearchService } from './services/search.service'
import { FiltersComponent } from './components/filters/filters.component'
import { InfiniteScrollModule } from 'ngx-infinite-scroll'
import { LoginComponent } from './components/login/login.component'
import { AuthService } from './services/authentication.service'
import { AuthGuardService } from './services/guards/auth-guard.service'
import { UserService } from './services/user.service'
import { RatingModule } from 'ngx-bootstrap/rating'
import { InlineSVGModule } from 'ng-inline-svg'
import { SafeUrlPipe } from 'src/app/pipes/safe-url.pipe'
import { ImageOverlayComponent } from './components/images/image-overlay/image-overlay.component'
import { ToPrintComponent } from 'src/app/components/toprint/toprint.component'
import { UserMenuComponent } from './components/topbar/user-menu/user-menu.component'
import { PublicComponent } from './components/public/public.component'
import { ButtonAddMenuComponent } from './components/button-add-menu/button-add-menu.component'
import { AddMenuService } from './services/add-menu.service'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'
import { ModalImageInfosComponent } from './components/modals/modal-image-infos/modal-image-infos.component'

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
    LightboxEntryComponent,
    TopbarComponent,
    ImageComponent,
    SearchComponent,
    LightboxComponent,
    ModalCreateAlbumComponent,
    ModalUploadProgressComponent,
    FavoritesComponent,
    DeferLoadDirective,
    SettingsComponent,
    CheckboxComponent,
    MenuComponent,
    PreventDefaultClickDirective,
    ManageTagsComponent,
    FiltersComponent,
    LoginComponent,
    SafeUrlPipe,
    ImageOverlayComponent,
    ToPrintComponent,
    UserMenuComponent,
    PublicComponent,
    ButtonAddMenuComponent,
    ModalImageInfosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ngfModule,
    HttpClientModule,
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    PopoverModule.forRoot(),
    TooltipModule.forRoot(),
    InfiniteScrollModule,
    RatingModule.forRoot(),
    InlineSVGModule.forRoot(),
    BsDropdownModule.forRoot()
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
    TagService,
    SearchService,
    AuthService,
    AuthGuardService,
    UserService,
    AddMenuService
  ],
  entryComponents: [ModalCreateAlbumComponent, ModalUploadProgressComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
