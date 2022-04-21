import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '../models/Itenaries';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private static readonly baseURL: string = 'https://api.opentripmap.com/0.1/';
  private static readonly apiKey: string =
    '5ae2e3f221c38a28845f05b6f2edbf9d732171da5321a022bd57965c';

  constructor(private http: HttpClient) {}

  getLocationInfo(location: string, lang: string): Observable<Location> {
    return this.http.get<Location>(
      LocationService.baseURL +
        lang +
        '/places/geoname?name=' +
        location +
        '&apikey=' +
        LocationService.apiKey
    );
  }
}
