import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DashboardpostsComponent } from './dashboardposts.component';


describe('DashboardpostsComponent', () => {
  let component: DashboardpostsComponent;
  let fixture: ComponentFixture<DashboardpostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import the HttpClientTestingModule
      declarations: [DashboardpostsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardpostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
