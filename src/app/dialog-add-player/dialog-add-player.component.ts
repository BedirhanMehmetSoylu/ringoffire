import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-dialog-add-player',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDialogModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './dialog-add-player.component.html',
  styleUrl: './dialog-add-player.component.scss'
})
export class DialogAddPlayerComponent {
  name: string = '';

  constructor( public dialogRef: MatDialogRef<DialogAddPlayerComponent> ) {}

  onNoClick() {
    this.dialogRef.close();
  }
}
