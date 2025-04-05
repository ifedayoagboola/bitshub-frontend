import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }

  logError(message: string) {
    console.log('LoggingService: ' + message);
  }
}
