import { TestBed } from '@angular/core/testing';
import { ClientService } from './client.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Client } from '../models/client.model';

describe('ClientService', () => {
  let service: ClientService;
  let httpMock: HttpTestingController;
  const apiUrl = 'api/clients';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClientService]
    });

    service = TestBed.inject(ClientService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya peticiones HTTP pendientes.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch clients (GET)', () => {
    const mockClients: Client[] = [
      {
        id: 1, name: 'John Doe', sharedKey: '123',
        email: '',
        phone: '',
        startDate: new Date(),
        endDate: new Date(),
        dateAdded: new Date()
      },
      {
        id: 2, name: 'Jane Doe', sharedKey: '456',
        email: '',
        phone: '',
        startDate: new Date(),
        endDate: new Date(),
        dateAdded: new Date()
      }
    ];

    service.getClients().subscribe(clients => {
      expect(clients).toEqual(mockClients);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockClients); // Simula la respuesta del servidor con los datos de prueba.
  });

  it('should fetch a client by sharedKey (GET)', () => {
    const mockClient: Client = {
      id: 1, name: 'John Doe', sharedKey: '123',
      email: '',
      phone: '',
      startDate: new Date(),
      endDate: new Date(),
      dateAdded: new Date()
    };

    service.getClientBySharedKey('123').subscribe(client => {
      expect(client).toEqual(mockClient);
    });

    const req = httpMock.expectOne(apiUrl); // La URL debería incluir el parámetro en la implementación real.
    expect(req.request.method).toBe('GET');
    req.flush(mockClient);
  });

  it('should create a new client (POST)', () => {
    const newClient: Client = {
      id: 3, name: 'Alice Doe', sharedKey: '789',
      email: '',
      phone: '',
      startDate: new Date(),
      endDate: new Date(),
      dateAdded: new Date()
    };

    service.createClient(newClient).subscribe(client => {
      expect(client).toEqual(newClient);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newClient);
    req.flush(newClient);
  });

  it('should update an existing client (PUT)', () => {
    const updatedClient: Client = {
      id: 1, name: 'John Doe', sharedKey: '123',
      email: '',
      phone: '',
      startDate: new Date(),
      endDate: new Date(),
      dateAdded: new Date()
    };

    service.updateClient(updatedClient).subscribe(client => {
      expect(client).toEqual(updatedClient);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedClient);
    req.flush(updatedClient);
  });

});
