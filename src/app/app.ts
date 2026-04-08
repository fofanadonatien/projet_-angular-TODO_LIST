import { Component, inject, signal } from '@angular/core';
import { L3mTotoListService } from '@services/l3m-toto-list-service';
import { L3mTodoList, L3mTodoListOutput } from '@components/l3m-todo-list/l3m-todo-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { JsonPipe } from '@angular/common';
import { TodoList } from '@services/todo-list.data';

@Component({
  selector: 'app-root',
  imports: [
    JsonPipe,
    MatToolbarModule,
    L3mTodoList,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  // Services
  private readonly _srv = inject(L3mTotoListService);

  // Protected data
  // à remplacer pour utiliser les données du service L3mTotoListService
  protected readonly todoList = this._srv.tdl;
  /*protected readonly todoList = signal<TodoList>([
    { label: 'Faire les courses', color: 'blue', completed: false },
    { label: 'Préparer le repas', color: 'red', completed: true },
    { label: 'Aller courir', color: 'green', completed: false },
  ]);*/

  /**
   * Traite les changements émis par le composant L3mTodoList
   * Les changements sont transmis traduits 
   * en appels aux méthodes du service L3mTotoListService
   * @param change Le changement à traiter
   */
  protected updateList(change: L3mTodoListOutput): void {
    // à compléter
    if(change.type === 'append'){
        this._srv.appendItem(change.label, change.color);
    }
    else if(change.type === 'remove'){
        this._srv.removeItems(change.items);
    } else if(change.type === 'update'){
        this._srv.updateItems(change.items, change.updates)
    }
  }

}
