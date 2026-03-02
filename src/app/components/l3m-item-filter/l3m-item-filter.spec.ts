import { ComponentFixture, TestBed } from '@angular/core/testing';

import { L3mItemFilter } from './l3m-item-filter';

describe('L3mItemFilter', () => {
  let component: L3mItemFilter;
  let fixture: ComponentFixture<L3mItemFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [L3mItemFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(L3mItemFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
