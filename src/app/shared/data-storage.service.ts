import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { Player } from '../players/player.model';
import { PlayersService } from '../players/players.service';

@Injectable()
export class DataStorageService {
    private playersUrl = 'https://challenge-me-ca7c3.firebaseio.com/men.json';

    constructor(private http: Http, private pService: PlayersService) {
    }

    getPlayers() {
        this.http.get(this.playersUrl)
            .map((response: Response) => {
                const players: Player[] = response.json()
                return players;
            })
            .catch((error: any) => Observable.throw(error.json().error || 'Server Error!'))
            .subscribe(
            (players: Player[]) => {
                this.pService.setPlayers(players);
            })
    }

}
