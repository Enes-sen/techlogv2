import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { PostcommentsComponent } from './postcomments.component';

describe('PostcommentsComponent', () => {
  let component: PostcommentsComponent;
  let fixture: ComponentFixture<PostcommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostcommentsComponent],
      imports: [HttpClientModule, RouterTestingModule], // Import HttpClientModule and RouterTestingModule
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => '1' } },
            params: of({ postId: '1' }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PostcommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
