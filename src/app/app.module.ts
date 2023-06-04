import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { HomeComponent } from './Pages/home/home.component';
import { FavoritesComponent } from './Pages/favorites/favorites.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { StoreModule } from '@ngrx/store';
import { favoritesReducer } from './state/favorites/favorites.reducer';
import { appReducer } from './state/app/app.reducer';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { CoreModule } from 'src/core/core.module';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './Components/dialog/dialog.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SearchInputComponent } from './Components/search-input/search-input.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FavoritesComponent,
    DialogComponent,
    SearchInputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    CoreModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    StoreModule.forRoot({ favorites: favoritesReducer,  app:appReducer}),
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
