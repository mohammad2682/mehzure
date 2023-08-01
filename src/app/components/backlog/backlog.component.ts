import { WorkItemService } from 'src/app/services/work-item.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { WorkItemDialogService } from 'src/app/services/work-item-dialog.service';
import { CoreService } from 'src/app/core/core.service';
import { SendTicketComponent } from '../send-ticket/send-ticket.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { SigninComponent } from '../signin/signin.component';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css'],
})
export class BacklogComponent {
  displayedColumns: string[] = ['id', 'title', 'assignedTo', 'state', 'action'];

  loading: boolean = false;

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _workItemList: WorkItemService,
    private _coreService: CoreService,
    private _dialog: MatDialog,
    private _workItemDialogService: WorkItemDialogService
  ) {}

  ngOnInit(): void {
    this._workItemDialogService.formSubmitted$.subscribe((result: boolean) => {
      if (result === true) {
        this.getWorkItemList();
      }
    });

    this.getWorkItemList();
  }

  getWorkItemList() {
    this.loading = true;
    this._workItemList.getWorkItems().subscribe({
      next: (res) => {
        console.log(res.workItems);
        this.dataSource = new MatTableDataSource(res.workItems);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.loading = false;
      },
      error: (err: any) => {
        console.error(err);
        this._coreService.openSnackBar(err.statusText, 'Try again');
        if (err.status === 401) {
          this._coreService.openSnackBar('You should sign in first', 'Ok');
        }
        this._workItemDialogService.setFormSubmitted(false);
        this.loading = false;
      },
    });
  }

  onFormSubmitted() {
    this.getWorkItemList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getRecord(data: any) {
    this.openEditForm(data);
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(SendTicketComponent, {
      data: data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val === true) {
          this.getWorkItemList();
        }
      },
    });
  }

  deleteWorkItem(data: any) {
    const dialogRef = this._dialog.open(ConfirmationComponent, {
      width: '250px',
      data: {
        title: 'Confirm Deletion',
        message: `Are you sure you want to delete "${data.title}" work item?`,
      },
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
    });

    dialogRef.afterClosed().subscribe((result) => {
      // result will be true if the user clicked on "Confirm" in the dialog
      if (result) {
        this._workItemList.deleteWorkItem(data.id).subscribe({
          next: (res) => {
            this._coreService.openSnackBar('Work item deleted!', 'Ok');
            this.getWorkItemList();
          },
          error: (err: any) => {
            console.error(err);
            this._coreService.openSnackBar(err.statusText, 'Try again');
            if (err.statusText === 'Unauthorized') {
              this._coreService.openSnackBar('You should sign in first', 'Ok');
            }
            this.loading = false;
          },
        });
      }
    });
  }
}
