import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // Add this import
import { HttpClientModule } from '@angular/common/http';
import { LoginformComponent } from './loginform.component';



describe('LoginformComponent', () => {
  let component: LoginformComponent;
  let fixture: ComponentFixture<LoginformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginformComponent],
      imports: [HttpClientModule,FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
