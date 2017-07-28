import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Player } from './player.model';

@Injectable()
export class PlayersService {
    playersChanged = new Subject<Player[]>();
    players: Player[] = [];
    player: Player = null;
    playerKey: string;

    constructor() { }

    setPlayer(player: Player, key: string) {
        this.player = player;
        this.playerKey = key;
    }

    getPlayers() {
        return this.players.slice();
    }

    getPlayer() {
        // Create dummy player to avoid error in console by refreshing PlayerEditComponent => redirects to AdminComponent
        if ( this.player === null) {
            return this.player = new Player('dummyPlayer', null, null, 'dummyGender', null);
        } else {
            return this.player;
        }
    }

}
