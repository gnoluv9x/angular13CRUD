import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { subscribeOn } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  freshNessList = ['Brand New', 'Second hand', 'Refurbished'];
  productForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
    });
  }

  addProduct() {
    // console.log('this.productForm.value: ', this.productForm.value);
    this.apiService.postProduct(this.productForm.value).subscribe({
      next: (res) => {
        alert('add product successfully');
        this.productForm.reset();
        this.dialogRef.close('save');
      },
      error: (err) => {
        alert('Has error when add product');
      },
    });
  }
}
