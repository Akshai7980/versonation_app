import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { ArtistDetailsTileComponent } from './components/artist-details-tile/artist-details-tile.component';
import { ArtistListTileComponent } from './components/artist-list-tile/artist-list-tile.component';
import { ArtistListWithActionComponent } from './components/artist-list-with-action/artist-list-with-action.component';
import { ArtistDetailsBoxComponent } from './components/artist-details-box/artist-details-box.component';
import { ArtistProfileBlockComponent } from './components/artist-profile-block/artist-profile-block.component';
import { LiveActionsComponent } from './components/live-actions/live-actions.component';
import { DirectSellingComponent } from './components/direct-selling/direct-selling.component';
import { TabComponentComponent } from './components/tab-component/tab-component.component';
import { FollowingBlockComponent } from './components/following-block/following-block.component';
import { ContentSortListComponent } from './components/content-sort-list/content-sort-list.component';
import { PostViewComponent } from './components/post-view/post-view.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatBadgeModule } from '@angular/material/badge';
import { HeaderWithSidenavComponent } from './components/header-with-sidenav/header-with-sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { Comments } from './components/comments/comments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TrendingAlbumsComponent } from './components/trending-albums/trending-albums.component';
import { TrendingSongsComponent } from './components/trending-songs/trending-songs.component';
import { NewArtistListComponent } from './components/new-artist-list/new-artist-list.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { EditProfileComponent } from './modal/edit-profile/edit-profile.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ArtistListItemComponent } from './components/artist-list-item/artist-list-item.component';
import { NoDataFoundComponent } from './components/no-data-found/no-data-found.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { CreatePlaylistComponent } from './modal/create-playlist/create-playlist.component';
import { MatInputModule } from '@angular/material/input';
import { ContentComponent } from './components/content/content.component';
import { RecommendedComponent } from './components/recommended/recommended.component';
import { DownloadedComponent } from './components/downloaded/downloaded.component';
import { AccountSidebarComponent } from './components/account-sidebar/account-sidebar.component';
import { AngMusicPlayerModule } from  'ang-music-player';
import { FooterMusicPlayerComponent } from './components/footer-music-player/footer-music-player.component';
import { ArtistDetailsComponent } from './components/artist-details/artist-details.component';
import { SongsListComponent } from './components/songs-list/songs-list.component';
import { PlaylistDetailsComponent } from './components/playlist-details/playlist-details.component';
import { AlbumDetailsComponent } from './components/album-details/album-details.component';
import { FilterPipe } from 'src/app/pipes/filter-pipe';
import { StreamingSidebarComponent } from './components/streaming-sidebar/streaming-sidebar.component';



@NgModule({
  declarations: [
    ArtistDetailsTileComponent,
    ArtistListTileComponent,
    ArtistListWithActionComponent,
    ArtistDetailsBoxComponent,
    ArtistProfileBlockComponent,
    LiveActionsComponent,
    DirectSellingComponent,
    TabComponentComponent,
    FollowingBlockComponent,
    ContentSortListComponent,
    PostViewComponent,
    HeaderWithSidenavComponent,
    SidenavComponent,
    Comments,
    TrendingAlbumsComponent,
    TrendingSongsComponent,
    NewArtistListComponent,
    WatchlistComponent,
    EditProfileComponent,
    ArtistListItemComponent,
    NoDataFoundComponent,
    PlaylistComponent,
    CreatePlaylistComponent,
    ContentComponent,
    RecommendedComponent,
    DownloadedComponent,
    AccountSidebarComponent,
    FooterMusicPlayerComponent,
    ArtistDetailsComponent,
    SongsListComponent,
    PlaylistDetailsComponent,
    AlbumDetailsComponent,
    FilterPipe,
    StreamingSidebarComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    InfiniteScrollModule,
    MatBadgeModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatMenuModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonToggleModule,
    ScrollingModule,
    MatFormFieldModule,
    MatInputModule,
    AngMusicPlayerModule
  ],
  exports: [
    ArtistDetailsTileComponent,
    ArtistListTileComponent,
    ArtistListWithActionComponent,
    ArtistDetailsBoxComponent,
    ArtistProfileBlockComponent,
    LiveActionsComponent,
    DirectSellingComponent,
    TabComponentComponent,
    FollowingBlockComponent,
    ContentSortListComponent,
    PostViewComponent,
    InfiniteScrollModule,
    HeaderWithSidenavComponent,
    TrendingAlbumsComponent,
    TrendingSongsComponent,
    NewArtistListComponent,
    WatchlistComponent,
    ArtistListItemComponent,
    PlaylistComponent,
    ContentComponent,
    RecommendedComponent,
    DownloadedComponent,
    FooterMusicPlayerComponent,
    SongsListComponent,
    FilterPipe
   ]
})
export class SharedModule {}