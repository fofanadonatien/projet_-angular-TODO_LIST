import { Component, inject, output } from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TodoItem } from '@services/todo-item.data';
import { combineLatest, filter, map, startWith } from 'rxjs';

export type L3mItemFilterOutput = (item: TodoItem) => boolean;

@Component({
  selector: 'l3m-item-filter',
  imports: [
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule
  ],
  templateUrl: './l3m-item-filter.html',
  styleUrl: './l3m-item-filter.scss',
})
export class L3mItemFilter {
  // Services
  private readonly _fb = inject(NonNullableFormBuilder);

  // Inputs and Outputs
  public readonly change = output<L3mItemFilterOutput>();

  // Protected data and methods
  protected readonly optionsFilter: ReadonlyArray<{ label: string; fct: L3mItemFilterOutput }> = [
    { label: 'Coché ou pas', fct: () => true },
    { label: 'Coché uniquement', fct: item => item.completed },
    { label: 'Décoché uniquement', fct: item => !item.completed }
  ];

  private readonly formFilter = this._fb.group({
    completedFilter: this._fb.control<L3mItemFilterOutput>(this.optionsFilter[0].fct),
    wordsForFilter: ""
  })
  protected controlsFilter = this.formFilter.controls;
  
  // Construcor for setting up value change subscriptions
  constructor() {
    combineLatest([
      this.controlsFilter.completedFilter.valueChanges.pipe(
        filter(v => v !== undefined),
        startWith(this.optionsFilter[0].fct)
      ),
      this.controlsFilter.wordsForFilter.valueChanges.pipe(
        filter(v => v !== undefined),
        startWith(""),
        map(getFilterByWords)
      )
    ]).subscribe(
      ([completedFilter, wordsFilterFct]) => {
        this.change.emit(
          item => completedFilter(item) && wordsFilterFct(item)
        );
      }
    );
  }
}


// Utility functions for filtering
function getFilterByWords(words: string): L3mItemFilterOutput {
  const wordsLower = words.toLowerCase().trim().split(/\s+/);
  return it => {
    const lowerCaseLabel = it.label.toLowerCase();
    return wordsLower.every(word => lowerCaseLabel.includes(word));
  };
}
