import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, combineLatest, interval, Observable, of, Subject } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { catchError, concatMap, debounceTime, delay, distinctUntilChanged, exhaustMap, filter, map, mergeMap, shareReplay, startWith, switchMap, takeUntil, tap, finalize } from 'rxjs/operators';
import { FakeFlightService, Flight, FlightService } from '@flight-workspace/flight-lib';
import { NavigationStart, Router } from '@angular/router';


/*
function trace<T>(info: string) {
    console.debug('setting up trace');
    return (obs: Observable<T>) => new Observable<T>(sender => {

        const sub = obs.subscribe({
            next: value => sender.next(value)
        });

        return () => { sub.unsubscribe() };

    })
}
*/


function trace<T>(info: string) {
    console.debug('setting up trace');
    
    return function(obs: Observable<T>) {
         return obs.pipe(
            tap(value => console.debug(info, value))
        );
    }
}


/*
    obs.pipe(trace())
*/

/*
    pipe(arr) {

        let obs = this;

        for(const op of arr) {

            obs = op(obs);

        }

        return obs;

    }


*/


@Component({
    selector: 'flight-lookahead',
    templateUrl: './flight-lookahead.component.html'
})

export class FlightLookaheadComponent implements OnInit, OnDestroy {


    private closeSub = new Subject<void>();

    // myObs$ = this.myService.obs$.pipe(...)



    control: FormControl;
    flights$: Observable<Flight[]>;
    loading = false;

    private loadingSubject = new BehaviorSubject<boolean>(false);
    loading$: Observable<boolean> = this.loadingSubject.asObservable();

    online$: Observable<boolean>;








    private refreshClickSubject = new Subject<void>();
    refreshClick$ = this.refreshClickSubject.asObservable();
    

    constructor(
        private flightService: FlightService) {
    }

    ngOnDestroy(): void {
        this.closeSub.next();
    }

    refresh() {
        this.refreshClickSubject.next();
    }

    doStuff(x: object);
    doStuff(x: string);
    doStuff(x: number);
    doStuff(x: number | string | object, y?: object) {

        if (y) {

        }

        if (typeof x === 'string') {

        }

    }



    ngOnInit() {
        this.control = new FormControl();

        this.online$ 
            = interval(2000).pipe( // 1, 2, 3, 4, 5
                    startWith(0), // 0, 1, 2, 3, 4, 5
                    map(_ => Math.random() < 0.5), // t, t, t, f, f
                    map(_ => true),
                    distinctUntilChanged(), // t, f
                    shareReplay(1),
        );

        const input$ = this.control.valueChanges.pipe(
            filter(v => v.length >= 3),
            debounceTime(300),
        )

        this.flights$ = combineLatest([input$, this.online$]).pipe(
            filter( ([_, online]) => online),
            map(([input, _]) => input),
            tap(v => this.loadingSubject.next(true)),
            trace('before switchMap'),
            switchMap(name => this.load(name)),
            trace('after switchMap'),
            // catchError
            // switchMap(arr => this.load(arr[0], arr[1])),
            // switchMap( ([from, to]) => this.load(from, to)),
            tap(v => this.loadingSubject.next(false)),
            takeUntil(this.closeSub),
        );



        // this.flights$ = this
        //                     .control
        //                     .valueChanges
        //                     .pipe(
        //                       debounceTime(300),
        //                       tap(v => this.loading = true),
        //                       switchMap(name => this.load(name)),
        //                       tap(v => this.loading = false)
        //                     );
    }

    load(from: string)  {
        // const url = "http://www.angular.at/api/flight";

        // const params = new HttpParams()
        //                     .set('from', from);

        // const headers = new HttpHeaders()
        //                     .set('Accept', 'application/json');

        // return this.http.get<Flight[]>(url, {params, headers});



        return this.flightService.find(from, '', false).pipe(
            catchError(err => {
                console.error('err', err);
                return of([]);
            }),
        );
    };


}
