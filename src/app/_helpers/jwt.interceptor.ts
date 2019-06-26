import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor{
    constructor(private authenticationservice: AuthService){}
    
    intercept(request: HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>>{
        let currentUser = this.authenticationservice.currentUserValue;
        if(currentUser && currentUser.accessToken){
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.accessToken}`
                }
            })
        }
        return next.handle(request);
    }
}