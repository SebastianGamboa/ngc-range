import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Range } from './range';

@Injectable({
  providedIn: 'root'
})
export class RangeService {

  private apiUrl = 'https://demo8897244.mockable.io';

  constructor(private http: HttpClient) { }

  getRange(): Observable<Range> {
    return this.http.get<Range>(`${this.apiUrl}/range`);
  }

  getFixedRange(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/fixed-range`);
  }
}
