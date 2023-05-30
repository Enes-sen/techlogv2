import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { UserSectionComponent } from './user-section.component';

describe('UserSectionComponent', () => {
  let component: UserSectionComponent;
  let fixture: ComponentFixture<UserSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule],
      declarations: [ UserSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
