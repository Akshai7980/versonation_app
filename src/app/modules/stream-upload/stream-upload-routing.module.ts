import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StreamUploadComponent } from './stream-upload.component';

const routes: Routes = [

  {
    path: '',
    component: StreamUploadComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StreamUploadRoutingModule { }
