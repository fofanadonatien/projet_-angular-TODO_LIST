import { Component, computed, effect, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { L3mTodoItem, L3mTodoItemOutput } from '@components/l3m-todo-item/l3m-todo-item';
import { TodoItem } from '@services/todo-item.data';
import { TodoList } from '@services/todo-list.data';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { L3mItemFilter, L3mItemFilterOutput } from "@components/l3m-item-filter/l3m-item-filter";
import { MatCheckboxModule } from '@angular/material/checkbox';

export type L3mTodoListOutput = { type: 'append', label: string, color: string }
                              | { type: 'remove', items: readonly TodoItem[] }
                              | { type: 'update', items: readonly TodoItem[], updates: Partial<TodoItem> };

@Component({
  selector: 'l3m-todo-list',
  imports: [
    L3mTodoItem,
    FormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatFormFieldModule,
    L3mItemFilter
],
  templateUrl: './l3m-todo-list.html',
  styleUrl: './l3m-todo-list.scss',
})
export class L3mTodoList {
  // Inputs and Outputs
  public readonly data = input.required<TodoList>();
  public readonly change = output<L3mTodoListOutput>();

  // Protected data and methods


  // Derivated data

  

  // Methods

  
}
