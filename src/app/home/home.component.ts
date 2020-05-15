import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs'
import { map } from 'rxjs/operators'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  // this.intervalSubscription=interval(1000).subscribe(count=>{
  //   console.log(count)
  // })
  intervalSubscription: Subscription
  constructor() { }
  ngOnInit() {
    const customIntervalObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);

        if (count > 3) {
          observer.complete()
        }

        if (count === 7) {

          observer.error(new Error("count is greater than 5"))
        }
        count++;
      }, 1000)
    })

    // customIntervalObservable.pipe(map((count:number)=>{
    //   return 'Round'+(count+1)
    // }))
    this.intervalSubscription = customIntervalObservable.pipe(
      map((count: number) => {
        return 'Round ' + (count)
      })).subscribe(count => {
        console.log(count);
      }
        , error => {
          alert(error.message)
        }
        , () => {
          console.log("Completed!!")
        }
      )
  }
  ngOnDestroy() {
    this.intervalSubscription.unsubscribe()
  }
}
