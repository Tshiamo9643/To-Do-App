import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddToDoComponent } from '../add-to-do/add-to-do.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  selectedItem: number = 0;
  navItems: any[] = [
    { label: 'all', route: '/home/all' },
    { label: 'pending', route: '/home/pending' },
    { label: 'completed', route: '/home/completed' },
  ];

  constructor(
    private router: Router,private dialog: MatDialog,
    private snackbar: MatSnackBar,private sharedService: SharedService) {
    this.navItems.find((item: any, i: number) => {
      if (item.route === this.router.url) {
        this.selectedItem = i;
      }
    });
  }
  addToDo(): void {
    const dialogRef = this.dialog.open(AddToDoComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        this.snackbar.open('action was cancelled', 'Ok', { duration: 3000 });
      } else {

        console.log(`Dialog result: ${result}`);
        this.sharedService.refreshToDoList();
        this.snackbar.open(result, 'Ok', { duration: 3000 });
      }
      console.log(`Dialog result: ${result}`);
    });
  }
}

// log(i:number):void{
//   console.log(i);
//   this.selectedItem = 1;
//   this.router.navigate([`/home/${this.navItems[i]}`]);
// }
