import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  private URI = '/catalogo';
  constructor(private http: HttpClient) { }


  getElementos(catalogoPadre): Observable<any> {
    return this.http.get<any>(environment.urlEndPoint + this.URI + '/' + catalogoPadre);
  }

  getInfo(id: any): Observable<any>{
    return this.http.get<any>(this.URI);

  }
}
