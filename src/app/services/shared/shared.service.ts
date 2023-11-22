import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private refreshSubject = new Subject<void>();

  refreshComponent$ = this.refreshSubject.asObservable();

  triggerRefresh() {
    this.refreshSubject.next();
  }

  refreshPage() {
    const firstTime = localStorage.getItem('key')
    if(!firstTime){
     localStorage.setItem('key','loaded')
     location.reload()
    }else {
      localStorage.removeItem('key') 
    }
  }
}