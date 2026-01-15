import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core/primitives/di';
import { Pageable } from '../../models/interfaces/pageable.interface';
import { Conference } from '../../models/interfaces/conference.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConferencesService {
  private http = inject(HttpClient);
  private baseUrl = `http://localhost:8080/api/v1/conferences`;

  getConferences(
    params: any = {},
    sortBy: string = 'id',
    sortOrder: 'asc' | 'desc',
  ): Observable<Pageable<Conference>> {
    const finalParams = { ...params, sort: `${sortBy},${sortOrder}` };
    return this.http.get<Pageable<Conference>>(this.baseUrl, { params: finalParams });
  }
}
