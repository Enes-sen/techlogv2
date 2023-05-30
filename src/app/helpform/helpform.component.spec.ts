import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClientModule } from '@angular/common/http';
import { HelpformComponent } from './helpform.component';

describe('HelpformComponent', () => {
  let component: HelpformComponent;
  let fixture: ComponentFixture<HelpformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HelpformComponent],
      imports: [FormsModule, HttpClientModule], // Import FormsModule
    }).compileComponents();

    fixture = TestBed.createComponent(HelpformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
