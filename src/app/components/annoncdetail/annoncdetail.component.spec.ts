import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnoncdetailComponent } from './annoncdetail.component';

describe('AnnoncdetailComponent', () => {
  let component: AnnoncdetailComponent;
  let fixture: ComponentFixture<AnnoncdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnoncdetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnoncdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
