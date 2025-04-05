import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  getClientErrorMessage(error: Error): string {
    // Check if running on the client side
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
      return navigator.onLine
        ? error.message ? error.message : 'Something Went Wrong'
        : 'No Internet Connection';
    }

    // If running on the server side
    return error.message ? error.message : 'An error occurred';
  }

  getServerErrorMessage(error: HttpErrorResponse): string {
    return error.message;
  }
}
