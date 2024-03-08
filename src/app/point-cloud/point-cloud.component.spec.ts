import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointCloudComponent } from './point-cloud.component';

describe('PointCloudComponent', () => {
  let component: PointCloudComponent;
  let fixture: ComponentFixture<PointCloudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PointCloudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PointCloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
