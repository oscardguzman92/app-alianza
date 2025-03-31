import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'api/clients'
  
  constructor(private http: HttpClient) { }

  getClients(): Observable<any> {
    return this.http.get<Client[]>(this.apiUrl);
  }

  getClientBySharedKey(sharedKey: String): Observable<any> {
    return this.http.get<Client>(this.apiUrl);
  }

  createClient(client: Client): Observable<any> {
    return this.http.post<Client>(this.apiUrl, client);
  }

  updateClient(client: Client): Observable<any> {
    return this.http.put<Client>(this.apiUrl, client);
  }

}
