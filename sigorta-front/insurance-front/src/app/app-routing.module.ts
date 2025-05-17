import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SigortaComponent} from './sigorta/sigorta.component';

const routes: Routes = [{ path: '', component: SigortaComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
