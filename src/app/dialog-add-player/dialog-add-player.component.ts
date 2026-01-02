import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dialog-add-player',
  imports: [
    MatFormField,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatLabel,
    MatDialogTitle,
    FormsModule,
    MatInputModule,
  ],
  templateUrl: './dialog-add-player.component.html',
  styleUrl: './dialog-add-player.component.scss',
})
export class DialogAddPlayerComponent {

  name: string = '';

  readonly dialogRef = inject(MatDialogRef<DialogAddPlayerComponent>);
  constructor() {}
  onNoClick() {
       this.dialogRef.close();
  }
}
