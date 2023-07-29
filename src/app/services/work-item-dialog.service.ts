import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkItemDialogService {
  private formSubmittedSource = new BehaviorSubject<boolean>(false);
  formSubmitted$ = this.formSubmittedSource.asObservable();

  constructor() {}

  setFormSubmitted(value: boolean) {
    this.formSubmittedSource.next(value);
  }
}
