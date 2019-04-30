import { Injectable, NgModule} from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { HTTP_INTERCEPTORS, HttpHeaders } from '@angular/common/http';
import { StorageService } from './services/storage/storage.service';
import { Events } from '@ionic/angular';

export let ACCESS_TOKEN = '';
export let CLIENT = '';
export let UID = '';
@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService, private events: Events) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const headers = new HttpHeaders({
    //   'access-token': ACCESS_TOKEN || '',
    //   'client': CLIENT || '',
    //   'uid': UID || ''
    // });

    const dupReq = req.clone({
      // headers: headers
    });

    return next.handle(dupReq).pipe(
      map((event: HttpResponse<any>) => {
        if (event instanceof HttpResponse) {
          // do stuff with response if you want
          // if (event.url.indexOf('/sign_in') !== -1) { this.saveLoginSession(event.headers); }
        }
        return event;
      })
    );
  }

}

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpsRequestInterceptor, multi: true }
  ]
})
export class InterceptorModule { }
