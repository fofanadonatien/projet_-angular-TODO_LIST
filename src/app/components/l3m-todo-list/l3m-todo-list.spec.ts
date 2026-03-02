import { ComponentFixture, TestBed } from '@angular/core/testing';

import { L3mTodoList } from './l3m-todo-list';

describe('L3mTodoList', () => {
  let component: L3mTodoList;
  let fixture: ComponentFixture<L3mTodoList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [L3mTodoList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(L3mTodoList);
    component = fixture.componentInstance;
    // Provide the required `data` input before change detection
    fixture.componentRef.setInput('data', []);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
