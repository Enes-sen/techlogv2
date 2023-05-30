import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { SinglepostComponent } from './singlepost.component';
import { PostcommentsformComponent } from '../postcommentsform/postcommentsform.component';
import { PostcommentsComponent } from '../postcomments/postcomments.component';
import { PostService } from '../services/post.service';

describe('SinglepostComponent', () => {
  let component: SinglepostComponent;
  let fixture: ComponentFixture<SinglepostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [
        SinglepostComponent,
        PostcommentsComponent,
        PostcommentsformComponent
      ],
      providers: [
        {
          provide: PostService,
          useClass: MockPostService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SinglepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class MockPostService {
  getOne(id: string) {
    return of({ post: { _id: id, comments: [] } });
  }
}

