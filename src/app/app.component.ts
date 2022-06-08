import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ApiService} from './services/api.service';
import {MatTableDataSource} from '@angular/material/table';
import {DialogComponent} from "./dialog/dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PopupComponent} from "./popup/popup.component";
import {Product} from "./Models/product";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'productName',
    'category',
    'date',
    'freshness',
    'price',
    'comment',
    'actions',
  ];
  dataSource!: MatTableDataSource<any>;
  title = 'AngularCRUD';

  constructor(public dialog: MatDialog, private apiService: ApiService, private _snackbar: MatSnackBar) {
  }

  ngOnInit() {
    this.getAllProducts();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {width: "30%"});

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result === "save") {
        this.getAllProducts()
      }
    });
  }


  getAllProducts() {
    this.apiService.getAllProducts().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  handleEditProduct(row: any) {
    const editDialogRef = this.dialog.open(DialogComponent, {width: '30%', data: row});

    editDialogRef.afterClosed().subscribe(res => {
      if (res && res === "updated") {
        this.getAllProducts()
      }
    })
  }

  handleDeleteProduct(row: Product ) {
    this.dialog.open(PopupComponent, {width: "30%", data: row}).afterClosed().subscribe(res =>{
      if(res === "deleted"){
        console.log("running here");
        this.getAllProducts()
      }
    } );
  }
}
