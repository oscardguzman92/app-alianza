import { TestBed } from '@angular/core/testing';
import { ClientStateService } from './client-state.service';
import { ClientService } from './client.service';
import { of } from 'rxjs';
import { Client } from '../models/client.model';

describe('ClientStateService', () => {
  let service: ClientStateService;
  let clientServiceMock: jasmine.SpyObj<ClientService>;

  beforeEach(() => {
    clientServiceMock = jasmine.createSpyObj('ClientService', [
      'getClients',
      'getClientBySharedKey',
      'createClient',
      'updateClient'
    ]);

    TestBed.configureTestingModule({
      providers: [
        ClientStateService,
        { provide: ClientService, useValue: clientServiceMock }
      ]
    });

    service = TestBed.inject(ClientStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load clients from ClientService', () => {
    const mockClients: Client[] = [{
      id: 1, name: 'John Dillinger', sharedKey: '123',
      email: 'jd@fo.co',
      phone: '3214564566',
      startDate: new Date(),
      endDate: new Date(),
      dateAdded: new Date()}
    ];
    clientServiceMock.getClients.and.returnValue(of({ data: mockClients }));

    service.loadClients();

    service.clients$.subscribe(clients => {
      expect(clients).toEqual(mockClients);
    });

    expect(clientServiceMock.getClients).toHaveBeenCalled();
  });

  it('should get clients by sharedKey from ClientService', () => {
    const mockClients: Client[] = [{
      id: 1, name: 'John Dillinger', sharedKey: '123',
      email: 'jd@fo.co',
      phone: '3214564566',
      startDate: new Date(),
      endDate: new Date(),
      dateAdded: new Date()
    }];
    clientServiceMock.getClientBySharedKey.and.returnValue(of({ data: mockClients }));

    service.getClientsByKey('123');

    service.clients$.subscribe(clients => {
      expect(clients).toEqual(mockClients);
    });

    expect(clientServiceMock.getClientBySharedKey).toHaveBeenCalledWith('123');
  });

  it('should add a new client', () => {
    const newClient: Client = {
      id: 1, name: 'John Filth', sharedKey: '456',
      email: 'jd@fo.co',
      phone: '3214564566',
      startDate: new Date(),
      endDate: new Date(),
      dateAdded: new Date()};
    clientServiceMock.createClient.and.returnValue(of({ data: [newClient] }));

    service.addClient(newClient);

    service.clients$.subscribe(clients => {
      expect(clients).toContain(newClient);
    });

    expect(clientServiceMock.createClient).toHaveBeenCalledWith(newClient);
  });

  it('should update an existing client', () => {
    const existingClients: Client[] = [
      {
        id: 1, name: 'John Dillinger', sharedKey: '123',
        email: 'jd@fo.co',
        phone: '3214564566',
        startDate: new Date(),
        endDate: new Date(),
        dateAdded: new Date()},
        {
          id: 2, name: 'Jenny Dillinger', sharedKey: '456',
          email: 'je@fo.co',
          phone: '3214564566',
          startDate: new Date(),
          endDate: new Date(),
          dateAdded: new Date()}
    ];
    const updatedClient: Client = {      
        id: 2, name: 'James Dillinger', sharedKey: '456',
        email: 'jd@fo.co',
        phone: '3214564566',
        startDate: new Date(),
        endDate: new Date(),
        dateAdded: new Date()
    };

    clientServiceMock.updateClient.and.returnValue(of(null));
    service['clientSubject'].next(existingClients);

    service.updateClient(updatedClient);

    service.clients$.subscribe(clients => {
      expect(clients).toContain(updatedClient);
      expect(clients.find(client => client.id === 2)?.name).toBe('James Dillinger');
    });

    expect(clientServiceMock.updateClient).toHaveBeenCalledWith(updatedClient);
  });

});
