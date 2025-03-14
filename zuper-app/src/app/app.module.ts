import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LeftPaneComponent } from './left-pane/left-pane.component';
import { MiddlePaneComponent } from './middle-pane/middle-pane.component';
import { RightPaneComponent } from './right-pane/right-pane.component';

@NgModule({
  declarations: [
    AppComponent,
    LeftPaneComponent,
    MiddlePaneComponent,
    RightPaneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
