import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { ViewIdeasComponent } from './view-ideas/view-ideas.component';
import { IdeaFormComponent } from './idea-form/idea-form.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { SharedModule } from './shared/shared.module';
import { IdeasRoutingModule } from './ideas-routing.module';
import { InputsModule } from '../inputs/inputs.module';

@NgModule({
  declarations: [ViewIdeasComponent, IdeaFormComponent, DeleteModalComponent],
  imports: [
    CommonModule,
    SharedModule,
    IdeasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InputsModule
  ],
  exports: [],
  providers: [HttpClient]
})
export class IdeasModule { }
