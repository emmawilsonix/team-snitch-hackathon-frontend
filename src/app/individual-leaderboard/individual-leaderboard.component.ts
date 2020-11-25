import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';

import { ITeam, ITeamImgMappings, ITeamNameMappings, IUser } from '../models/models';
import { LeaderboardApiService } from '../services/leaderboard-api.service';

@Component({
  selector: 'app-individual-leaderboard',
  templateUrl: './individual-leaderboard.component.html',
  styleUrls: ['./individual-leaderboard.component.scss']
})
export class IndividualLeaderboardComponent implements OnChanges {

  @Input() usersList!: IUser[];

  public teamImgMappings: ITeamImgMappings = {
    189631: {
      img: '../../assets/images/parrot.png',
      height: '18px',
      width: '26.5px'
    },
    189651: {
      img: '../../assets/images/cat.png',
      height: '24px',
      width: '24px'
    },
    189641: {
      img: '../../assets/images/banana.png',
      height: '25px',
      width: '20px'
    },
    189661: {
      img: '../../assets/images/orange.png',
      height: '21px',
      width: '25px'
    }
  };


  constructor() {

  }

  ngOnChanges(changes: SimpleChanges): void {

  }


}
