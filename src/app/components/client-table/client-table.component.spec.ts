import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ClientTableComponent } from './client-table.component';
import { ClientStateService } from '../../services/client-state.service';

describe('ClientTableComponent', () => {
  let component: ClientTableComponent;
  let fixture: ComponentFixture<ClientTableComponent>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockClientState: jasmine.SpyObj<ClientStateService>;

  beforeEach(async () => {
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockClientState = jasmine.createSpyObj('ClientStateService', ['updateClient', 'addClient', 'clients$', 'loadClients']);

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ClientTableComponent],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
        { provide: ClientStateService, useValue: mockClientState }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientTableComponent);
    component = fixture.componentInstance;
  });

  it('should open dialog with new client data', () => {
    const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpyObj.afterClosed.and.returnValue(of({ id: 1, name: 'Test Client' }));

    mockDialog.open.and.returnValue(dialogRefSpyObj);

    component.openDialog();

    expect(mockDialog.open).toHaveBeenCalled();
  });
});
