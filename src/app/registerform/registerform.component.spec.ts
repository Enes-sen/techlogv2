import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RegisterformComponent } from './registerform.component';

describe('RegisterformComponent', () => {
  let component: RegisterformComponent;
  let fixture: ComponentFixture<RegisterformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterformComponent],
      imports: [FormsModule, HttpClientModule], // Add the FormsModule and HttpClientModule
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
