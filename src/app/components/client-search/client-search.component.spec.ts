import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSearchComponent } from './client-search.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ClientSearchComponent', () => {
  let component: ClientSearchComponent;
  let fixture: ComponentFixture<ClientSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientSearchComponent],providers: [provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
