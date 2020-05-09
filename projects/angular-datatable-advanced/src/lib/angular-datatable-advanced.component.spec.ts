import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularDatatableAdvancedComponent } from './angular-datatable-advanced.component';

describe('AngularDatatableAdvancedComponent', () => {
  let component: AngularDatatableAdvancedComponent;
  let fixture: ComponentFixture<AngularDatatableAdvancedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularDatatableAdvancedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularDatatableAdvancedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
