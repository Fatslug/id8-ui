import { UtilitiesModule } from '../utilities/utilities.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import {
  ViewIdeasComponent,
  IdeaListComponent,
  IdeaFilterComponent,
  IdeaDetailsComponent
} from './view-ideas';
import { IdeaFormComponent } from './idea-form/idea-form.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { IdeasRoutingModule } from './ideas-routing.module';
import { InputsModule } from '../inputs/inputs.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    ViewIdeasComponent,
    IdeaFormComponent,
    DeleteModalComponent,
    IdeaListComponent,
    IdeaDetailsComponent,
    IdeaFilterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    IdeasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InputsModule,
    UtilitiesModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  exports: [],
  providers: [HttpClient],
  entryComponents: [
    IdeaDetailsComponent
  ]
})
export class IdeasModule { }
