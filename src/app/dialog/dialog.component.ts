import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  freshNessList = ['Brand New', 'Second hand', 'Refurbished'];
  productForm!: FormGroup;
  actionBtn: string = 'Save';

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>,
    private _snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBtn = 'Update';
      this.productForm.controls['productName'].setValue(
        this.editData.productName
      );
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
    }
  }

  addProduct() {
    if (!this.editData) {
      if (this.productForm.value) {
        this.apiService.postProduct(this.productForm.value).subscribe({
          next: (res) => {
            this._snackbar.open("Them san pham thanh cmn cong roi!!!!!!!!!!!!!!!!", "Close", { duration: 5000 })
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error: (err) => {
            alert('Has error when add product');
          },
        });
      }
    } else {
      this.updateProduct();
    }
  }

  updateProduct() {
    this.apiService.putProduct(this.productForm.value, this.editData.id).subscribe({
      next: (res) => {
        this._snackbar.open("Edit successfully", "Close", { duration: 5000 })
        this.dialogRef.close('updated');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
