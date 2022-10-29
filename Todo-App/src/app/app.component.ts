import { ParsedVariable } from '@angular/compiler';
import { Component } from '@angular/core';

class Todo{
  constructor(
    public description: string,
    public assignedPersonName: string,
    public done: boolean
  ) { }
}

class Filter{
  constructor(
    public assignedPerson: string,
    public done: boolean,
    public apply: boolean
  ){}
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Todo-App';
  private todoList: Todo[] = [];
  public todo: Todo;
  public filter:Filter;
  public isEditing:boolean;
  public todoInEdit:Todo;
  private indexOfTodoInEdit: number;

  constructor(){
    this.todoList.push({
      description: "Mathe",
      assignedPersonName: "Lukas",
      done: true
    });
    this.todoList.push({
      description: "Englisch",
      assignedPersonName: "Lukas",
      done: true
    });
    this.todoList.push({
      description: "Deutsch",
      assignedPersonName: "Lukasovic",
      done: true
    });
    this.todoList.push({
      description: "Lesen",
      assignedPersonName: "Lukas",
      done: false
    });
    this.todo = new Todo('','',false)
    this.filter = new Filter('',false, false)
    this.isEditing = false
    this.todoInEdit = new Todo('','', false)
    this.indexOfTodoInEdit = -1


  }
  public getTodos(): Todo[]
  {
    if(this.filter.apply)
    {
      const filterDone : boolean = this.filter.done;
      const filterAssignedPerson : string = this.filter.assignedPerson;
      const filteredTodoList : Todo[] = this.todoList.filter(function (todo){
        return todo.done === filterDone && todo.assignedPersonName === filterAssignedPerson;
      });
      return filteredTodoList;
    }
    return this.todoList;

  }

  public saveTodo(): void
  {
    this.addTodo(this.todo.description, this.todo.assignedPersonName, this.todo.done);
    this.clearForm();
  }
  private addTodo(description: string, assignedPersonName: string, done: boolean): void{
    this.todoList.push({
      description : description,
      assignedPersonName: assignedPersonName,
      done:done
    })

  }

  private clearForm(): void{
    this.todo.description = '';
    this.todo.assignedPersonName = '';
    this.todo.done = false;
  }

  public deleteTodo(index:number) : void{
    this.todoList.splice(index, 1);
  }

  public startEditing(index:number): void{
    this.isEditing = true;
    this.indexOfTodoInEdit = index;
    this.todoInEdit.assignedPersonName = this.todoList[index].assignedPersonName;
    this.todoInEdit.description = this.todoList[index].description;
    this.todoInEdit.done = this.todoList[index].done;
  }

  public saveEdit(): void{
    this.todoList[this.indexOfTodoInEdit].assignedPersonName = this.todoInEdit.assignedPersonName;
    this.todoList[this.indexOfTodoInEdit].description = this.todoInEdit.description;
    this.todoList[this.indexOfTodoInEdit].done = this.todoInEdit.done;
    this.clearEdit();
  }

  public clearEdit(): void{
    this.isEditing = false;
    this.indexOfTodoInEdit = -1;
    this.todoInEdit.assignedPersonName = '';
    this.todoInEdit.description = '';
    this.todoInEdit.done = false;
  }




}





