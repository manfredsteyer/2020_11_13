import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap, map, switchMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import { FlightService } from '@flight-workspace/flight-lib';
import { flightsLoaded, loadFlights } from './flight-booking.actions';


@Injectable()
export class FlightBookingEffects {

  loadFlights$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(loadFlights),
      switchMap(a => this.flightSerivce.find(a.from, a.to, a.urgent)),
      map(flights => flightsLoaded({flights}))
    );
  });


  constructor(
    private flightSerivce: FlightService,
    private actions$: Actions) {}

}
