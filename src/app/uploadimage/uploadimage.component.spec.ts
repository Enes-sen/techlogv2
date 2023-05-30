import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import form modules
import { UploadimageComponent } from './uploadimage.component';

describe('UploadimageComponent', () => {
  let component: UploadimageComponent;
  let fixture: ComponentFixture<UploadimageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadimageComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule, // Import FormsModule
        ReactiveFormsModule, // Import ReactiveFormsModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UploadimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
