import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StreamingRoutingModule } from './streaming-routing.module';
import { StreamingComponent } from './streaming.component';
import { SharedModule } from '../shared/shared.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  declarations: [StreamingComponent],
  imports: [CommonModule, StreamingRoutingModule, SharedModule, MatButtonToggleModule]
})
export class StreamingModule {}
