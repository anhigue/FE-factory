import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PartInterface } from '../../../interfaces/PartInterface';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from '../../services/dialog/dialog.service';
import { PartService } from '../../services/part/part.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-part-select',
  templateUrl: './part-select.component.html',
  styleUrls: ['./part-select.component.scss']
})
export class PartSelectComponent implements OnInit {

  displayedColumns: string[] = [
    'position',
    'name',
    'description',
    'partNo',
    'price',
    'options'
  ];
  parts: PartInterface[] = [];
  dataSource: MatTableDataSource<PartInterface>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public dialogRef: MatDialogRef<PartSelectComponent>,
    private _DIALOG_SERVICE: DialogService,
    private _PART_SERVICE: PartService
  ) {}

  ngOnInit() {
    this.getParts();
  }

  private getParts(): void {
    try {
      this._PART_SERVICE.readProduct().subscribe((value: any) => {
        if (value) {
          this.parts = value;
          this.dataSource = new MatTableDataSource<PartInterface>(this.parts);
          this.dataSource.paginator = this.paginator;
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.showError(
        'Error',
        'Error al obtener los repuestos',
        JSON.stringify(error.name)
      );
    }
  }
}
