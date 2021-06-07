import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token = 'Some token';

  constructor(private http: HttpClient) {}

  getToken() {
    return this.token;
  }

  verifyToken(): Observable<boolean> {
    const token = this.getToken();
    return token
      ? this.http
          .post('https://jsonplaceholder.typicode.com/users', {
            verify: this.token,
          })
          .pipe(
            tap((res) => (localStorage.data = JSON.stringify(res))),
            map(
              (res) => true,
              (error: any) => false
            )
          )
      : of(false);
  }
}
