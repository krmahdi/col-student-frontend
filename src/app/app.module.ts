import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnnoncesComponent } from './components/annonces/annonces.component';
import { AnnoncdetailComponent } from './components/annoncdetail/annoncdetail.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { RegisterPageComponent } from './register-page/register-page.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './home-page/home-page.component';
import { CreateAnnonceComponent } from './create-annonce/create-annonce.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { MapComponentComponent } from './map-component/map-component.component'
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { GenericListFilterModule } from 'generic-list-filter';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AppComponent,
    AnnoncesComponent,
    AnnoncdetailComponent,
    RegisterPageComponent,
    HomePageComponent,
    CreateAnnonceComponent,
    NavbarComponent,
    SearchFormComponent,
    MapComponentComponent,
    
      
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    NgxStarRatingModule,
    FormsModule,
    ReactiveFormsModule,
    LeafletModule,Ng2SearchPipeModule,
    GenericListFilterModule
    
  ],
  providers: [
    
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
