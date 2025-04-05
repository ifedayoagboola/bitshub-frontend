import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { Observable, of } from 'rxjs';

@Injectable()
export class ServerInterceptor implements HttpInterceptor {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (isPlatformServer(this.platformId)) {
      // Mock a response for SSR
      const mockResponse = new HttpResponse({ body: {}, status: 200 });
      return of(mockResponse);
    } else {
      // Pass the request to the next handler if not on the server
      return next.handle(req);
    }
  }
}
