


import { Injectable } from '@angular/core';
import { Flight, FlightService } from '@flight-workspace/flight-lib';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { flightsLoaded, loadFlights } from './flight-booking.actions';
import { FlightBookingAppStateSlice, flightBookingFeatureKey } from './flight-booking.reducer';
import { selectAllFlights } from './flight-booking.selectors';


// -- 4 -- Redux + Effects
@Injectable({providedIn: 'root'})
export class FlightBookingFacade {
    readonly flights$ = this.store.select(selectAllFlights);

    constructor(
        private store: Store<FlightBookingAppStateSlice>) { }
    
    search(from: string, to: string, urgent: boolean): void {
        this.store.dispatch(loadFlights({from,to,urgent}));
    }
}

// -- 3 -- Redux + Selectors
// @Injectable({providedIn: 'root'})
// export class FlightBookingFacade {
    
//     readonly flights$ = this.store.select(selectAllFlights);

//     constructor(
//         private store: Store<FlightBookingAppStateSlice>,
//         private flightService: FlightService) { }
    
//     search(from: string, to: string, urgent: boolean): void {
//         this.flightService.find(from,to,urgent).subscribe(
//             flights => {

//                 this.store.dispatch(flightsLoaded({flights}));

//             }
//         )
//     }

// }

// -- 2 -- "Redux-Muster"
// @Injectable({providedIn: 'root'})
// export class FlightBookingFacade {
    
//     readonly flights$ = this.store.select(a => a[flightBookingFeatureKey].flights);

//     constructor(
//         private store: Store<FlightBookingAppStateSlice>,
//         private flightService: FlightService) { }
    
//     search(from: string, to: string, urgent: boolean): void {
//         this.flightService.find(from,to,urgent).subscribe(
//             flights => {

//                 this.store.dispatch(flightsLoaded({flights}));

//             }
//         )
//     }

// }

// -- 1 -- "Flux-Muster"
// @Injectable({providedIn: 'root'})
// export class FlightBookingFacade {
    
//     private flightsSubject = new BehaviorSubject<Flight[]>([])
//     readonly flights$: Observable<Flight[]> = this.flightsSubject.asObservable();

//     constructor(private flightService: FlightService) { }
    
//     search(from: string, to: string, urgent: boolean): void {
//         this.flightService.find(from,to,urgent).subscribe(
//             flights => {

//                 this.flightsSubject.next(flights);

//             }
//         )
//     }

// }