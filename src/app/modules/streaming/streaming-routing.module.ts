import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StreamingComponent } from './streaming.component';
import { ArtistDetailsComponent } from '../shared/components/artist-details/artist-details.component';
import { PlaylistDetailsComponent } from '../shared/components/playlist-details/playlist-details.component';
import { AlbumDetailsComponent } from '../shared/components/album-details/album-details.component';

const routes: Routes = [
  {
    path: '',
    component: StreamingComponent,
  },
  {
    path: 'artistDetails',
    component: ArtistDetailsComponent
  },
  {
    path: 'playlistDetails',
    component: PlaylistDetailsComponent
  },
  {
    path: 'albumDetails',
    component: AlbumDetailsComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StreamingRoutingModule {}
