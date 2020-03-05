import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleMasterComponent } from './title-master.component';

describe('TitleMasterComponent', () => {
  let component: TitleMasterComponent;
  let fixture: ComponentFixture<TitleMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitleMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
