import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// icons
import { AddRemoveTableComponent } from './add-remove-table/add-remove-table.component';
import { PagesRoutes } from './pages.routing.module';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [AddRemoveTableComponent],
  imports: [CommonModule, RouterModule.forChild(PagesRoutes), MaterialModule],
  exports: []
})
export class PagesModule {}
