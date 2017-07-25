import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { Player } from '../players/player.model';
import { PlayersService } from '../players/players.service';

@Injectable()
export class DataStorageService {
    playersUrl = '';

    constructor(
        private http: Http,
        private pService: PlayersService,
    ) {
    }

    getPlayers(url: string) {
        this.http.get(url)
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

