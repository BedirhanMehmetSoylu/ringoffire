import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collection, collectionData, addDoc, doc, docData } from '@angular/fire/firestore';
import { Game } from '../../models/game';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent implements OnInit {

  constructor(private firestore: Firestore, private router: Router) {

  }

  ngOnInit(): void {

  }

  newGame() {
    let game = new Game();
    addDoc(collection(this.firestore, 'games'), game.toJson())
      .then((docRef) => {
        console.log('Dokument erfolgreich hinzugefügt mit ID:', docRef.id);
        this.router.navigateByUrl('/game/' + docRef.id);
      })
      .catch((error) => {
        console.error('Fehler beim Hinzufügen des Dokuments:', error);
      });
  }

}
