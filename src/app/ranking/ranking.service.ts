import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class RankingService {

  constructor(
    private router: Router
  ) { }

  recalculateRanks() {
    this.router.navigate(['/ranking/men']);
  }

}
