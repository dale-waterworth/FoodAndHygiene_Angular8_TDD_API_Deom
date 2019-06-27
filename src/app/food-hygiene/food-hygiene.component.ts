import { Component, OnInit } from '@angular/core';
import { FoodHygieneService, IBasicAuthorityCall, IEstablishmentCall, IEstablishment, IRating, IRatingsCall } from './food-hygiene.service';
import { forkJoin } from 'rxjs';
import { IDropDownList } from '../formItems/dropdown/dropdown.component';

export interface IRatingListItem {
  label: string;
  count: number;
  order: number;
}

/**
 * This is used for general statues when getting the data.
 * It helps when displaying content in the markup
 */
enum Status { Awaiting, Loading, Loaded, Error }

@Component({
  selector: 'app-food-hygiene',
  templateUrl: './food-hygiene.component.html',
  styleUrls: ['./food-hygiene.component.css']
})
export class FoodHygieneComponent implements OnInit {

  Status = Status; // so it can be accessed in html

  authorityList: IDropDownList[];
  authorityListError = false;
  establishments: IEstablishment[];
  ratings: IRating[];

  authoritiesStatus: Status;
  establishmentStatus: Status;

  // could be content driven
  content = {
    main: {
      title: 'Food Hygiene Rating'
    },
    authorityList: {
      loadingLabel: 'Fetching authorities',
      label: 'Authorities'
    },
    establishments: {
      noResults: 'No establishments',
      waitingForDropdown: 'Select an authority to view the details',
      label: 'List'
    },
    ratings: {
      noResults: 'No ratings',
      label: 'Breakdown'
    },
    error: {
      couldNotGetEstablishments: 'Could not load establishments',
      couldNotGetAuthorities: 'Could not load authorities',
    },
    loading: {
      label: 'Loading data'
    }
  };

  constructor(
    public foodHygienSvc: FoodHygieneService) { }


  // start off by gettin the list of establishments
  ngOnInit() {

    this.establishmentStatus = Status.Awaiting;
    this.authoritiesStatus = Status.Loading;

    this.foodHygienSvc.getBasicAuthorities()
      .subscribe((authorities: IBasicAuthorityCall) => {

        this.authorityList = this.getBasicAuthoritiesList(authorities);

        this.authoritiesStatus = Status.Loaded;
      }, () => {
        this.authoritiesStatus = Status.Error;
      });
  }

  // map the data to the drop down
  getBasicAuthoritiesList(authorities: IBasicAuthorityCall): IDropDownList[] {
    return authorities.authorities.map(authority => {
      return {
        name: `${authority.Name} ${authority.EstablishmentCount}`,
        value: authority.LocalAuthorityId
      };
    });
  }

  // drop down click event
  authorityChange(authorityId: number) {

    this.establishmentStatus = Status.Loading;

    // call 2 api's here as the establishment countswill be appended to the ratings object
    // as this holds all the keys and values
    const apiCalls = [
      this.foodHygienSvc.getRatings(),
      this.foodHygienSvc.getEstablishments(authorityId)
    ];

    forkJoin(apiCalls)
      .subscribe(([ratings, establishments]: [IRatingsCall, IEstablishmentCall]) => {

        this.establishments = establishments.establishments;

        const ratingsTmp = this.getRatings(ratings.ratings, this.establishments);

        this.ratings = this.workOutPercentages(establishments.meta.itemCount, ratingsTmp);

        this.establishmentStatus = Status.Loaded;
      }, (error) => {

        this.establishmentStatus = Status.Error;
      });
  }

  getRatings(ratings: IRating[], establishments: IEstablishment[]): IRating[] {

    establishments.forEach(e => {
      // maybe this would be better as an object so it could be called like:
      // ratings[e.RatingKey].count ...
      // but would have to write a test and compare both to get least latency solution
      const rating = ratings.find(x => x.ratingKey === e.RatingKey);
      if (rating) {

        // rating count might not be set yet
        rating.count = rating.count ? rating.count += 1 : 1;

      } else {

        const newItem: IRating = {
          count: 1,
          ratingName: e.RatingValue,
          ratingKey: e.RatingKey,
          ratingKeyName: e.RatingValue,
          notmatched: true
        };

        ratings.push(newItem);
      }

    });

    return ratings;
  }

  workOutPercentages(totalCount: number, ratings: IRating[]): IRating[] {
    ratings.map(rating => {
      if (rating.count) {
        rating.percentage = (rating.count / totalCount) * 100;
      }
    });

    return ratings;
  }

}
