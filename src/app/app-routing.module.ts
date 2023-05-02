import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnoncesComponent } from './components/annonces/annonces.component';
import { AnnoncdetailComponent } from './components/annoncdetail/annoncdetail.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CreateAnnonceComponent } from './create-annonce/create-annonce.component';
import{MapComponentComponent} from './map-component/map-component.component'
const routes: Routes = [
  { path: 'annonces', component: AnnoncesComponent},
  { path:'annonce/:id', component : AnnoncdetailComponent },
  { path:'', redirectTo: 'map' ,pathMatch: 'full'},
{    path:'auth',
    component:RegisterPageComponent
  },
  {
path:'map',
component:MapComponentComponent
  },
  {path:'create',component:CreateAnnonceComponent},
{  path:'acceuil',component:HomePageComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
