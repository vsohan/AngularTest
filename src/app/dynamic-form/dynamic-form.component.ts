// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-dynamic-form',
//   standalone: true,
//   imports: [],
//   templateUrl: './dynamic-form.component.html',
//   styleUrl: './dynamic-form.component.css'
// })
// export class DynamicFormComponent {

// }
// -------------
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-dynamic-form',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './dynamic-form.component.html',
//   styleUrls: ['./dynamic-form.component.css']
// })
// export class DynamicFormComponent implements OnInit {
//   loginForm!: FormGroup;
//   signupForm!: FormGroup;
//   currentForm: 'login' | 'signup' = 'login'; // Track the currently active form
//   loginFormValid: boolean = true; // Track login form validity
//   signupFormValid: boolean = true; // Track signup form validity

//   constructor(private fb: FormBuilder) {}

//   ngOnInit(): void {
//     this.loginForm = this.fb.group({
//       username: ['', Validators.required],
//       password: ['', Validators.required],
//       rememberMe: [false],
//       additionalField: ['']
//     });

//     this.signupForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       username: ['', Validators.required],
//       password: ['', Validators.required],
//       confirmPassword: ['', Validators.required]
//     });

//     this.loginForm.statusChanges.subscribe(status => {
//       this.loginFormValid = status === 'VALID';
//     });

//     this.signupForm.statusChanges.subscribe(status => {
//       this.signupFormValid = status === 'VALID';
//     });
//   }

//   switchForm(form: 'login' | 'signup'): void {
//     this.currentForm = form;
//   }

//   onSubmit(): void {
//     const missingFields: string[] = [];

//     // Validate the active form
//     if (this.currentForm === 'login') {
//       Object.keys(this.loginForm.controls).forEach(field => {
//         const control = this.loginForm.get(field);
//         if (control && control.invalid) {
//           missingFields.push(`Login - ${field}`);
//         }
//       });
//     } else {
//       Object.keys(this.signupForm.controls).forEach(field => {
//         const control = this.signupForm.get(field);
//         if (control && control.invalid) {
//           missingFields.push(`Signup - ${field}`);
//         }
//       });
//     }

//     // Check for missing fields across both forms
//     if (this.loginForm.invalid) {
//       Object.keys(this.loginForm.controls).forEach(field => {
//         const control = this.loginForm.get(field);
//         if (control && control.invalid) {
//           missingFields.push(`Login - ${field}`);
//         }
//       });
//     }

//     if (this.signupForm.invalid) {
//       Object.keys(this.signupForm.controls).forEach(field => {
//         const control = this.signupForm.get(field);
//         if (control && control.invalid) {
//           missingFields.push(`Signup - ${field}`);
//         }
//       });
//     }

//     if (missingFields.length > 0) {
//       alert(`Missing fields:\n${missingFields.join('\n')}`);
//     } else {
//       alert('Form submitted successfully!');
//     }
//   }
// }
// -----------------------------

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {
  loginForm!: FormGroup;
  signupForm!: FormGroup;
  currentForm: 'login' | 'signup' = 'login'; // Track the currently active form
  showLoginError: boolean = false; // Track if login form error should be shown
  showSignupError: boolean = false; // Track if signup form error should be shown

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false],
      additionalField: ['']
    });

    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  switchForm(form: 'login' | 'signup'): void {
    this.currentForm = form;
  }

  onSubmit(): void {
    const missingFields: string[] = [];
    this.showLoginError = this.loginForm.invalid;
    this.showSignupError = this.signupForm.invalid;

    // Check for missing fields across both forms
    if (this.loginForm.invalid) {
      this.checkMissingFields(this.loginForm, 'Login', missingFields);
    }

    if (this.signupForm.invalid) {
      this.checkMissingFields(this.signupForm, 'Signup', missingFields);
    }

    if (missingFields.length > 0) {
      alert(`Missing fields:\n${missingFields.join('\n')}`);
    } else {
      alert('Form submitted successfully!');
    }
  }

  checkMissingFields(formGroup: FormGroup, formName: string, missingFields: string[]): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control && control.invalid) {
        missingFields.push(`${formName} - ${field}`);
      }
    });
  }
}
