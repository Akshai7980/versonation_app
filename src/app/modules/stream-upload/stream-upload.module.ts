import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StreamUploadRoutingModule } from './stream-upload-routing.module';
import { StreamUploadComponent } from './stream-upload.component';
import { SharedModule } from '../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
@NgModule({
  declarations: [
    StreamUploadComponent
  ],
  imports: [
    CommonModule,
    StreamUploadRoutingModule,
    SharedModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule
  ]
})
export class StreamUploadModule { }
