import { OrderInterface } from './../../../interfaces/OrderInterface';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-parts',
  templateUrl: './list-parts.component.html',
  styleUrls: ['./list-parts.component.scss']
})
export class ListPartsComponent implements OnInit {

  displayedColumns: string[] = ['part', 'image', 'howMany', 'price', 'total'];
  dataSource: MatTableDataSource<any>;
  constructor(
    public dialogRef: MatDialogRef<ListPartsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderInterface,
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<any>(this.data.parts);
  }

}
