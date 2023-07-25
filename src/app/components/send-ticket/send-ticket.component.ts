import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CoreService } from 'src/app/core/core.service';
import { WorkItemService } from 'src/app/services/work-item.service';

@Component({
  selector: 'app-send-ticket',
  templateUrl: './send-ticket.component.html',
  styleUrls: ['./send-ticket.component.css'],
})
export class SendTicketComponent {
  workItemForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<SendTicketComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) // private _workService: WorkItemService
  {
    this.workItemForm = this._fb.group({
      workTitle: '',
      description: '',
    });
  }

  ngOnInit(): void {
    this.workItemForm.patchValue(this.data);
  }

  onFormSubmit() {
    // if (this.workItemForm.valid) {
    //   if (this.data) {
    //     this._workService
    //       .updateEmployee(this.data.id, this.workItemForm.value)
    //       .subscribe({
    //         next: (val: any) => {
    //           this._coreService.openSnackBar(
    //             'Employee updated successfully',
    //             'Ok'
    //           );
    //           this._dialogRef.close(true);
    //         },
    //         error: (err: any) => {
    //           console.error(err);
    //         },
    //       });
    //   } else {
    //     this._workService.addEmployee(this.workItemForm.value).subscribe({
    //       next: (val: any) => {
    //         this._coreService.openSnackBar(
    //           'Employee added successfully',
    //           'Yay'
    //         );
    //         this._dialogRef.close(true);
    //       },
    //       error: (err: any) => {
    //         console.error(err);
    //       },
    //     });
    //   }
    // }
  }
}
