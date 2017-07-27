import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Player } from './player.model';

@Injectable()
export class PlayersService {
    playersChanged = new Subject<Player[]>();
    players: Player[] = [];
    player: Player;

    constructor() { }

    setPlayers(players: Player[]) {
        this.players = players;
        this.playersChanged.next(this.players.slice());
    }

    setPlayer(player: Player) {
        this.player = player;
    }

    getPlayers() {
        return this.players.slice();
    }

    getPresetPlayer() {
        return this.player;
    }

    getPlayer(id: number) {
        return this.players[id];
    }

    genderChanged() {
        this.playersChanged.next(this.players.slice());
    }

}
