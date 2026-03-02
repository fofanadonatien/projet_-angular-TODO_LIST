import { ComponentFixture, TestBed } from '@angular/core/testing';

import { L3mTodoItem } from './l3m-todo-item';

describe('L3mTodoItem', () => {
  let component: L3mTodoItem;
  let fixture: ComponentFixture<L3mTodoItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [L3mTodoItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(L3mTodoItem);
    component = fixture.componentInstance;
    // Provide the required `data` input before change detection
    fixture.componentRef.setInput('data', { label: 'Test', completed: false, color: '#000000' });
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
