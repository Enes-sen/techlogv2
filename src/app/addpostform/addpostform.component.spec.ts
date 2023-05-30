import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Add this line
import { AddpostformComponent } from './addpostform.component';


describe('AddpostformComponent', () => {
  let component: AddpostformComponent;
  let fixture: ComponentFixture<AddpostformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddpostformComponent],
      imports: [HttpClientModule, FormsModule], // Add FormsModule here
    }).compileComponents();

    fixture = TestBed.createComponent(AddpostformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
