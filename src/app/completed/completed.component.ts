import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddToDoComponent } from '../add-to-do/add-to-do.component';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss']
})
export class CompletedComponent implements OnInit{
  displayColomn: string[] = ['title', 'dueDate', 'status', 'action'];
  dataSource:any[] = [];
 constructor(private sharedService: SharedService,private dialog: MatDialog,private snackbar: MatSnackBar){} 
 ngOnInit(): void {
  this.dataSource= this.sharedService.getTodoList();
  console.log(this.sharedService.getTodoList());
 }
  getCompletedData(){
     return this.dataSource.filter(completedArray => completedArray.status === 'completed');
  }
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
  goDelete(i: any):any{
    let newList= this.dataSource.filter(i,i+1)
    localStorage.setItem("todoList", JSON.stringify(newList))
    this.dataSource=newList
    return this.dataSource
  }
}
