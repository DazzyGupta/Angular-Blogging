import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutArticleComponent } from './about-article.component';

describe('AboutArticleComponent', () => {
  let component: AboutArticleComponent;
  let fixture: ComponentFixture<AboutArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
