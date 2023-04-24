import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnoncesComponent } from './components/annonces/annonces.component';
import { AnnoncdetailComponent } from './components/annoncdetail/annoncdetail.component';

const routes: Routes = [
  { path: 'annonces', component: AnnoncesComponent},
  { path:'annonce/:id', component : AnnoncdetailComponent },
  { path:'**', redirectTo: 'annonces'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
