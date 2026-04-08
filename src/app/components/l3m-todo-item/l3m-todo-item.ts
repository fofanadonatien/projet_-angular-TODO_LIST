import { Component, effect, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoItem } from '@services/todo-item.data';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

export type L3mTodoItemOutput = { type: 'remove' }
                              | { type: 'update', updates: Partial<TodoItem> }
                              ;
                              
@Component({
  selector: 'l3m-todo-item',
  imports: [
    FormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './l3m-todo-item.html',
  styleUrl: './l3m-todo-item.scss',
})
export class L3mTodoItem {
  // Inputs and Outputs
  public readonly edit = input<boolean>(false);
  public readonly data = input.required<TodoItem>();
  public readonly change = output<L3mTodoItemOutput>();
  public readonly cancelEdition = output<void>();

  // Protected data
    protected readonly editedLabel = signal('');
    protected readonly editedColor = signal("#000000");
    protected readonly editedCompleted = signal<boolean>(false);
  
  // Constructor
  constructor() {
    // Définir un effet pour réinitialiser les signaux editedXXX lorsque l'entrée 'edit' passe à vrai
    // Les valeurs de ces signaux doivent provenir de l'entrée 'data'
    
    effect(() => {
        if(this.edit()){// Si on entre en mode édition, on initialise les signaux avec les données de l'item
            this.editedLabel.set(this.data().label);
            this.editedColor.set(this.data().color);
            this.editedCompleted.set(this.data().completed);
        }
    });
  }

  // Methods
 protected updateCompleted(completed : boolean) : void {
    this.change.emit({
        type : 'update',
        updates: {completed}
    });
  }
  
  protected deleteItem(): void {
    this.change.emit({
        type:'remove'
    })
  }
  protected submitEdition(): void {
    this.change.emit({
        type : 'update',
        updates :{
            label : this.editedLabel().trim(),
            color: this.editedColor(),
            completed : this.editedCompleted()
        }
        
    });
    this.cancelEdition.emit();
  }
  
  protected cancelEdit(): void {
    this.cancelEdition.emit();
  }
}
