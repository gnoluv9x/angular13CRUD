import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Product} from "../Models/product";
import {ApiService} from "../services/api.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private _snackbar: MatSnackBar,
    private dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Product
  ) { }

  ngOnInit(): void {
    console.log("this.dialogRef: ", this.dialogRef);
  }

  handleRemoveProduct() {
    if(this.product){
    this.apiService.deleteProduct(this.product.id).subscribe({
      next: (res) => {
        this.dialogRef.close("deleted")
        this._snackbar.open("Xoa san pham roi nha!!!!!!!!!!!!!", "Close", { duration: 2000 })
      },
      error:(error) => {
        console.log(error)
      }
    })
    }
  }

}
