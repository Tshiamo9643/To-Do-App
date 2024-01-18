import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddToDoComponent } from '../add-to-do/add-to-do.component';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss'],
})
export class AllComponent implements OnInit {
  displayedColumns: string[] = ['title', 'dueDate', 'status', 'action'];
  dataSource: any = [];
  todoData: any = {
    title: '',
    dueDate: null,
    status: '',
  };
  todoList: string[] = [];
  constructor(private sharedService: SharedService,private dialog: MatDialog,private snackbar: MatSnackBar) 
  {
    //It add the data u have loaded from
    // console.log(this.sharedService.getTodoList());
  }
  ngOnInit(): void {
    // this.todoList = this.sharedService.getTodoList();
    console.log(this.sharedService.getTodoList());
    this.sharedService.todoList$.subscribe({
      next: (result) => this.dataSource = result,
      error: (error) => console.log(error),
      complete: () => {}
    });

  }
  goDelete() {
    let newList= this.dataSource.splice(1)
    localStorage.setItem("todoList", JSON.stringify(newList))
    this.dataSource=newList
    return this.dataSource
  }
  // goDelete(indx: number){
  //   this.dataSource = this.dataSource.filter((indx:number, i:number));
  //    return   
  // }
  editToDo(todo:any): void{
    const dialogRef = this.dialog.open(AddToDoComponent,{
      data:todo
    })
    dialogRef.afterClosed().subscribe((result) =>{
      if (!result) {
        this.snackbar.open('Update was cancelled', 'Ok', { duration: 3000 });
      } else {
        this.snackbar.open(result, 'Ok', { duration: 3000 });
      }
    })    
  }  
}
// goEdit(): void {
  //   const dialogRef = this.dialog.open(AddToDoComponent);
  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (!result) {
  //       this.snackbar.open('action was cancelled', 'Ok', { duration: 3000 });
  //     } else {
  //       console.log(`Dialog result: ${result}`);
  //       this.snackbar.open(result, 'Ok', { duration: 3000 });
  //     }
  //   })
  // }

