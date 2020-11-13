import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FlightBookingAppStateSlice, flightBookingFeatureKey } from './flight-booking.reducer';

// export const selectFlightBookingState = createFeatureSelector<fromFlightBooking.FlightBookingState>(
//   fromFlightBooking.flightBookingFeatureKey
// );


export const selectAllFlights = 
  (a: FlightBookingAppStateSlice) => a[flightBookingFeatureKey].flights;


export const selectFlights = createSelector(
  (a: FlightBookingAppStateSlice) => a[flightBookingFeatureKey].flights,
  (a: FlightBookingAppStateSlice) => a[flightBookingFeatureKey].denyList,
  (flights, denyList) => flights.filter(f => !denyList.includes(f.id)) 
);