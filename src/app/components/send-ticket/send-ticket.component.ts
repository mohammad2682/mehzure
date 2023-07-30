import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CoreService } from 'src/app/core/core.service';
import { WorkItemService } from 'src/app/services/work-item.service';
import { Ticket, updateTicket } from 'src/app/types';
import { WorkItemDialogService } from 'src/app/services/work-item-dialog.service';

@Component({
  selector: 'app-send-ticket',
  templateUrl: './send-ticket.component.html',
  styleUrls: ['./send-ticket.component.css'],
})
export class SendTicketComponent {
  workItemForm: FormGroup;
  loading: boolean = false;

  types: string[] = ['Bug', 'Product Backlog Item'];
  users: string[] = [
    'Sajad Afaghiy',
    'Hamed Banijamali',
    'Erfan Shahbazi',
    'Mohammad Akradi',
    'Alireza Feyzi',
  ];

  constructor(
    private _fb: FormBuilder,
    private _workService: WorkItemService,
    private _dialogRef: MatDialogRef<SendTicketComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService, // private _workService: WorkItemService
    private _workItemDialogService: WorkItemDialogService
  ) {
    this.workItemForm = this._fb.group({
      title: '',
      description: '',
      assignedTo: '',
      workItemType: '',
    });
  }

  ngOnInit(): void {
    this.workItemForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.workItemForm.valid) {
      if (this.data) {
        const newTicket: updateTicket = {
          id: this.data.id,
          workItems: [
            {
              op: 'add',
              path: '/fields/System.Title',
              from: null,
              value: this.workItemForm.value.title,
            },
            {
              op: 'add',
              path: '/fields/System.Description',
              from: null,
              value: this.workItemForm.value.description,
            },
            {
              op: 'add',
              path: '/fields/System.AssignedTo',
              from: null,
              value: this.workItemForm.value.assignedTo,
            },
            {
              op: 'add',
              path: '/fields/System.WorkItemType',
              from: null,
              value: this.workItemForm.value.workItemType,
            },
          ],
        };
        this._workService.updateWorkItem(JSON.stringify(newTicket)).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar(
              'work item updated successfully',
              'Yay'
            );
            this.loading = false;
            this._dialogRef.close(true);
            this._workItemDialogService.setFormSubmitted(true);
          },
          error: (err: any) => {
            console.error(err);
            this._coreService.openSnackBar(err.statusText, 'Try again');
            this._workItemDialogService.setFormSubmitted(false);
            this.loading = false;
          },
        });
      } else {
        this.loading = true;
        const newTicket: Ticket = {
          workItems: [
            {
              op: 'add',
              path: '/fields/System.Title',
              from: null,
              value: this.workItemForm.value.title,
            },
            {
              op: 'add',
              path: '/fields/System.Description',
              from: null,
              value: this.workItemForm.value.description,
            },
            {
              op: 'add',
              path: '/fields/System.AssignedTo',
              from: null,
              value: this.workItemForm.value.assignedTo,
            },
          ],
          workItemType: this.workItemForm.value.workItemType,
        };
        console.log(newTicket);
        this._workService.addWorkItem(JSON.stringify(newTicket)).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar(
              'work item added successfully',
              'Yay'
            );
            this.loading = false;
            this._dialogRef.close(true);
            this._workItemDialogService.setFormSubmitted(true);
          },
          error: (err: any) => {
            console.error(err);
            this._coreService.openSnackBar(err.statusText, 'Try again');
            this._workItemDialogService.setFormSubmitted(false);
            this.loading = false;
          },
        });
      }
    }
  }
}
