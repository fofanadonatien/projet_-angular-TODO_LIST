import { Component, computed, effect, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { L3mTodoItem, L3mTodoItemOutput } from '@components/l3m-todo-item/l3m-todo-item';
import { TodoItem } from '@services/todo-item.data';
import { TodoList } from '@services/todo-list.data';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { L3mItemFilter, L3mItemFilterOutput } from "@components/l3m-item-filter/l3m-item-filter";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgTemplateOutlet } from "../../../../node_modules/@angular/common/types/_common_module-chunk";

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
    L3mItemFilter,
    NgTemplateOutlet
],
  templateUrl: './l3m-todo-list.html',
  styleUrl: './l3m-todo-list.scss',
})
export class L3mTodoList {
  // Inputs and Outputs
  public readonly data = input.required<TodoList>();
  public readonly change = output<L3mTodoListOutput>();

  // Protected data and methods
    protected readonly currentColor = signal('​#ffffff');
    protected readonly newLabel = signal('');
    protected editedItem = signal <TodoItem| null>(null);
    protected readonly currentFilter = signal<L3mItemFilterOutput>(() => true);

  // Derivated data

  protected readonly filteredItems = computed(()=>this.data().filter(item => this.currentFilter()(item)));
  
  protected readonly showeFooter = computed(()=>this.data().length>0);
  protected readonly remainingItemsCount = computed(()=> this.data().filter(item =>!item.completed).length);
  
  protected readonly allcompleted = computed(()=> this.data().length>0 &&this.data().every(item => item.completed) );

  // Methods

  protected onSubmitNewItem():void {
    const label = this.newLabel().trim();
    if(label.length === 0 ){
        return ;
    }
    this.change.emit({
        type : 'append',
        label,
        color : this.currentColor(),
    })
  }
  protected propagateItemChange(item: TodoItem, event: L3mTodoItemOutput): void {
    switch(event.type){
        case 'remove':
            this.change.emit({
                type : 'remove',
                items : [item]})
                break;
        case 'update':
            this.change.emit({
                type : 'update',
                items : [item],
                updates : event.updates
            });
            break;
    }
  }
  protected toggleAllCompleted(completed: boolean): void {
  const itemsToUpdate = this.data().filter(item => item.completed !== completed);

  if (itemsToUpdate.length === 0) {
    return;
  }

  this.change.emit({
    type: 'update',
    items: itemsToUpdate,
    updates: { completed }
  });
}

}
