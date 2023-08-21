import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  musisDatas$ = new BehaviorSubject<any>([]);

  constructor() { }

  set musicData(data: any){
    this.musisDatas$.next(data)
  }

  get musicDatas(): Observable<any>{
    return this.musisDatas$;
  }

}
