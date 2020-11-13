import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FlightApiModule } from '@flight-workspace/flight-lib';

// import { DashboardApiModule } from '@flight-workspace/dashboard-lib';

@NgModule({
  imports: [
    BrowserModule,
    FlightApiModule,
    // DashboardApiModule,
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
