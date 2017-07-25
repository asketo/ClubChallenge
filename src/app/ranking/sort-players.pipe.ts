import { Pipe, PipeTransform } from '@angular/core';

import { Player } from '../players/player.model';

@Pipe({
  name: 'sortPlayers'
})
export class SortPlayersPipe implements PipeTransform {

  transform(players: Player[]): Player[] {
    players.sort((a: Player, b: Player) => {
      if (a['rank'] < b['rank']) {
        return -1;
      } else if (a['rank'] > b['rank']) {
        return 1;
      } else {
        return 0;
      }
    });
    return players;
  }

}
