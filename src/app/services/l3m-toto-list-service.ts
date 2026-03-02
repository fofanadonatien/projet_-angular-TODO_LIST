import { effect, Injectable, signal } from '@angular/core';
import { TodoList } from './todo-list.data';
import { TodoItem } from './todo-item.data';

@Injectable({
  providedIn: 'root',
})
export class L3mTotoListService {
  private readonly _tdl = signal<TodoList>(JSON.parse(localStorage.getItem('todoList') ?? '[]'));
  public readonly tdl = this._tdl.asReadonly();

  constructor() {
    effect(
      () => localStorage.setItem('todoList', JSON.stringify(this.tdl()))
    );
  }

  public appendItem(label: string, color: string): void {
    this._tdl.update(
      tdl => [
        ...tdl,
        { label, completed: false, color },
      ]
    );
  }

  public removeItems(items: readonly TodoItem[]): void {
    this._tdl.update(
      tdl => tdl.filter(i => !items.includes(i))
    );
  }

  public updateItems(items: readonly TodoItem[], updates: Partial<TodoItem>): void {
    this._tdl.update(
      tdl => tdl.map(it => items.includes(it) ? { ...it, ...updates } : it)
    );
  }

}