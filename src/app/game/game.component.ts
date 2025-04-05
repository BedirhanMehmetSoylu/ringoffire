import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { MatDialogModule } from '@angular/material/dialog';
import { GameInfoComponent } from '../game-info/game-info.component';
import { Firestore, collection, collectionData, addDoc, updateDoc, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PlayerMobileComponent } from "../player-mobile/player-mobile.component";
import { EditPlayerComponent } from '../edit-player/edit-player.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, RouterModule, PlayerComponent, MatButtonModule, MatIconModule, MatDialogModule, GameInfoComponent, PlayerMobileComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent implements OnInit {
  game: Game;
  gamePathId?: string;
  gameOver = false;

  constructor(private route: ActivatedRoute, private firestore: Firestore, private router: Router, public dialog: MatDialog) {
    this.game = new Game();
    console.log(this.game);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params);
      this.gamePathId = params['id'];
      const gameId = params['id'];
      
      if (gameId) {
        const gameDocRef = doc(this.firestore, `games/${gameId}`);
        
        docData(gameDocRef).subscribe((game: any) => {
          console.log('Game update', game);
          this.game.currentPlayer = game.currentPlayer;
          this.game.playedCards = game.playedCards;
          this.game.players = game.players;
          this.game.player_images = game.player_images,
          this.game.stack = game.stack;
          this.game.pickCardAnimation = game.pickCardAnimation;
          this.game.currentCard = game.currentCard;
        });
      }
    });
  }

  newGame() {
    this.game = new Game();
    
    console.log(this.game);
  }

  takeCard() {
    if (this.game.stack.length == 0) {
      this.gameOver = true;
    } else if (!this.game.pickCardAnimation) {
      const card = this.game.stack.pop();
      if (card !== undefined) {
        this.game.currentCard = card;
      }
      console.log(this.game.currentCard);
      this.game.pickCardAnimation = true;
    }

    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    this.saveGame();
    setTimeout(() => {
      this.game.pickCardAnimation = false;
      this.game.playedCards.push(this.game.currentCard);
      this.saveGame();
    }, 1000);
  }

  editPlayer(playerId: number) {
    console.log('Edit Player:', playerId);
    
    const dialogRef = this.dialog.open(EditPlayerComponent);

    dialogRef.afterClosed().subscribe((change: string) => {
      if (change) {
        if (change == 'DELETE') {

          this.game.players.splice(playerId, 1);
        } else {
          console.log('Reveiced change', change);
          this.game.player_images[playerId] = change;
        }
        this.saveGame();
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.game.player_images.push('1.png');
        this.saveGame();
      }
    });
  }

  saveGame() {
    const gameDocRef = doc(this.firestore, `games/${this.gamePathId}`);
        
    updateDoc(gameDocRef, this.game.toJson());
  }
}



