import { Component, OnInit } from '@angular/core';
import { ITeam, ITeamNameMappings, ITeamStylesMappings, IUser } from '../models/models';
import { LeaderboardApiService } from '../services/leaderboard-api.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  public teamMappings: ITeamNameMappings = {};
  public teamsList: ITeam[];
  public usersList: IUser[];
  private teamStyleMappings: ITeamStylesMappings = {
    189631: {
      colour: 'rgb(30, 149, 166)',
      image: 'assets/images/parrot.png'
    },
    189651: {
      colour: 'rgb(135, 74, 162)',
      image: 'assets/images/cat.png'
    },
    189641: {
      colour: 'rgb(217, 169, 0)',
      image: 'assets/images/banana.png'
    },
    189661: {
      colour: 'rgb(64, 150, 70)',
      image: 'assets/images/orange.png'
    }
  };

  constructor(private apiService: LeaderboardApiService) {}

  ngOnInit(): void {
    this.getTeams();
  }

    /** Function to get test teams */
   public getTeams(): void {
    this.apiService
      .getAllTeams()
      .subscribe(response => {
        response.forEach(team => {
          team.colour = this.teamStyleMappings[team.teamID].colour;
          team.img = this.teamStyleMappings[team.teamID].image;
          this.teamMappings[team.teamID] = team.name;
        });
        this.teamsList = response.sort((a, b) => (b.team_points) - (a.team_points));

        this.getUsers();
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
          // this.isLoaded = true;
        },
        console.error
      );
    }
    /** Function to parse users and get names from emails */
  public parseUsers(users: IUser[]): IUser[] {
    users.forEach(user => {
      user.teamName = this.teamMappings[user.teamID];
    });
    return users.sort((a, b) => (b.points) - (a.points));
  }
    /** Function to make first and last name title-case */
    public titleCaseName(name: string) {
      const titleCasedName = name.charAt(0).toUpperCase() + name.substring(1);
      return titleCasedName;
   }
}
