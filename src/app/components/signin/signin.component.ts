import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { SigninService } from 'src/app/services/signin.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  signInForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _signInService: SigninService,
    private _dialogRef: MatDialogRef<SigninComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.signInForm = this._fb.group({
      username: '',
      password: '',
    });
  }

  onFormSubmit() {
    if (this.signInForm.valid) {
      const signinData = {
        userName: this.signInForm.value.username,
        password: this.signInForm.value.password,
      };
      this._signInService.signIn(signinData).subscribe({
        next: (val: any) => {
          console.log(val.token);
          localStorage.setItem('token', val.token);
          this._coreService.openSnackBar('You are signed in now', 'Yay');
          this._dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
          this._coreService.openSnackBar(err.statusText, 'Try again');
        },
      });
    }
  }
}
