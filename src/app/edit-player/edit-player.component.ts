import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@Component({
  selector: 'app-edit-player',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDialogModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './edit-player.component.html',
  styleUrl: './edit-player.component.scss'
})
export class EditPlayerComponent  {

  allProfilePictures = ['1.png', '2.png', 'monkey.png', 'penguin.png'];

  constructor( public dialogRef: MatDialogRef<EditPlayerComponent> ) {}

  selectPicture(picture: string) {

  }
}
