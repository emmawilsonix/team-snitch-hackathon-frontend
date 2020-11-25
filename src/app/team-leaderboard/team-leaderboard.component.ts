import { Component, Input, OnChanges } from '@angular/core';
import { ITeam } from '../models/models';

@Component({
  selector: 'app-team-leaderboard',
  templateUrl: './team-leaderboard.component.html',
  styleUrls: ['./team-leaderboard.component.scss']
})
export class TeamLeaderboardComponent implements OnChanges {

  @Input() teamsList: ITeam[];

  constructor() { }

  ngOnChanges(): void {
  }

}
