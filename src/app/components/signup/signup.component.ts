import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { SigninService } from 'src/app/services/signin.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _signInService: SigninService,
    private _dialogRef: MatDialogRef<SignupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.signupForm = this._fb.group({
      email: '',
      phoneNumber: '',
      username: '',
      password: '',
      confirmPassword: '',
    });
  }

  onFormSubmit() {
    if (this.signupForm.valid) {
      const signupData = {
        email: this.signupForm.value.email,
        phoneNumber: this.signupForm.value.phoneNumber,
        userName: this.signupForm.value.username,
        password: this.signupForm.value.password,
        confirmPassword: this.signupForm.value.confirmPassword,
      };
      console.log(signupData);
      this._signInService.signUp(signupData).subscribe({
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
