import {Component, OnInit} from '@angular/core';
import {FakeFlightService, Flight, FlightService} from '@flight-workspace/flight-lib';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { flightsLoaded, loadFlights } from '../+state/flight-booking.actions';
import { FlightBookingAppStateSlice, flightBookingFeatureKey } from '../+state/flight-booking.reducer';
import { selectAllFlights, selectFlights } from '../+state/flight-booking.selectors';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  from = 'Hamburg'; // in Germany
  to = 'Graz'; // in Austria
  urgent = false;

  flights$: Observable<Flight[]> = this.store.select(selectFlights);


  basket: object = {
      "3": true,
      "5": true
    };

  constructor(private store: Store<FlightBookingAppStateSlice>) {
  }

  ngOnInit() {
  }

  search(): void {
    if (!this.from || !this.to) return;

    this.store.dispatch(loadFlights({from: this.from, to: this.to, urgent: this.urgent}));
  }

  delay(): void {
    // this.flightService.delay();
  }

}
