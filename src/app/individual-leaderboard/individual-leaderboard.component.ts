import { Component, OnInit, OnChanges } from '@angular/core';
import { ITeam, ITeamImgMappings, ITeamNameMappings, IUser } from '../models/models';
import { LeaderboardApiService } from '../services/leaderboard-api.service';

@Component({
  selector: 'app-individual-leaderboard',
  templateUrl: './individual-leaderboard.component.html',
  styleUrls: ['./individual-leaderboard.component.scss']
})
export class IndividualLeaderboardComponent implements OnInit {

  public usersList: IUser[];
  public teamsList: ITeam[];
  public teamMappings: ITeamNameMappings = {};
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


  constructor(private apiService: LeaderboardApiService) { 
    this.getTeams();
    this.getUsers();
  }

  ngOnInit(): void {
  }

  /** Function to get test users */
  public getTestUsers(): void {
    this.apiService
      .getAllTestUsers()
      .subscribe(response => {
        this.usersList = this.parseUsers(response);
      },
      console.error
    );
  }

  /** Function to get test users */
  public getUsers(): void {
    this.apiService
      .getAllUsers()
      .subscribe(response => {
        this.usersList = this.parseUsers(response);
      },
      console.error
    );
  }

  /** Function to make first and last name title-case */
  public titleCaseName(name: string) {
    const titleCasedName = name.charAt(0).toUpperCase() + name.substring(1);
    return titleCasedName;
 }

 /** Function to parse users and get names from emails */
  public parseUsers(users: IUser[]): IUser[] {
    users.forEach(user => {
      let fullName: string[]  = user.emailAddress.split('@');
      fullName = fullName[0].split('.');
      const firstName: string = this.titleCaseName(fullName[0]);
      const lastName: string = this.titleCaseName(fullName[1]);
      const fullNameString: string = firstName + ' ' + lastName;
      user.name = fullNameString;
      user.teamName = this.teamMappings[user.teamID];
    });
    return users.sort((a, b) => (b.points) - (a.points));
  }

  /** Function to get test teams */
  public getTestTeams(): void {
    this.apiService
      .getAllTestTeams()
      .subscribe(response => {
        response.forEach(team => {
          this.teamMappings[team.teamID] = team.name;
        });
        this.teamsList = response;
      },
      console.error
    );
  }

  /** Function to get test teams */
  public getTeams(): void {
    this.apiService
      .getAllTeams()
      .subscribe(response => {
        response.forEach(team => {
          this.teamMappings[team.teamID] = team.name;
        });
        this.teamsList = response;
      },
      console.error
    );
  }

}
