import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnoncesComponent } from './components/annonces/annonces.component';
import { AnnoncdetailComponent } from './components/annoncdetail/annoncdetail.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  { path: 'annonces', component: AnnoncesComponent},
  { path:'annonce/:id', component : AnnoncdetailComponent },
  { path:'', redirectTo: 'annonces' ,pathMatch: 'full'},
  {
    path: 'login',component:LoginPageComponent },
  {
    path:'auth',
    component:RegisterPageComponent
  },
{  path:'acceuil',component:HomePageComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
