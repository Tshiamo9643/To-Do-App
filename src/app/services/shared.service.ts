import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  // this is todoList
  private todoList = new BehaviorSubject<any[]>([]);
  // this is my observable object, where all components can see the to-do-list
  todoList$ = this.todoList.asObservable();
  
  constructor() {
   console.log(this.refreshToDoList()); 
  }

  refreshToDoList():void{
    this.todoList.next(this.getTodoList());
  }

  getTodoList(): any {
    const temp = localStorage.getItem('todoList');
    return temp ? JSON.parse(temp) : [];
  }

  addToDoList(todoList: any): string {
    localStorage.setItem('todoList', JSON.stringify(todoList));
    return 'To-do added successfully';
  }
}
