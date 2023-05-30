import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { PostcommentsformComponent } from './postcommentsform.component';

describe('PostcommentsformComponent', () => {
  let component: PostcommentsformComponent;
  let fixture: ComponentFixture<PostcommentsformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostcommentsformComponent],
      imports: [HttpClientModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { params: of({ postId: '1' }) }, // Mock the ActivatedRoute params
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PostcommentsformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
