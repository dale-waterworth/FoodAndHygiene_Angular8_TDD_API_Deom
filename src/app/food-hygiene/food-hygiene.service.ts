import { Injectable } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { HttpHeaders } from '@angular/common/http';
import { IDropDownList } from '../formItems/dropdown/dropdown.component';

export interface IBasicAuthorityCall {
  authorities: IBasicAuthority[];
}
export interface IBasicAuthority {
  LocalAuthorityId: number;
  LocalAuthorityIdCode: string;
  Name: string;
  EstablishmentCount: number;
  SchemeType: number;
  links: { rel: string, href: string }[];
}

export interface IEstablishmentCall {
  establishments: IEstablishment[];
  meta: {
    itemCount: number;
  };
}

export interface IRating {
  ratingName: string;
  ratingKey: string;
  ratingKeyName: string;

  // custom - not from ws call
  percentage?: number;
  count?: number;
  notmatched?: boolean; // if the result key is not found from results call
}

export interface IRatingsCall {
  ratings: IRating[];
  meta: any;
  links: any;
}

export interface IEstablishment {
  RatingValue: string;
  BusinessName: string;
  RatingKey: string;
}

@Injectable({
  providedIn: 'root'
})
export class FoodHygieneService {

  readonly AUTHORITIES_BASIC = 'Authorities/basic';
  readonly ESTABLISHMENTS = 'Establishments';
  readonly RATINGS = 'ratings';
  private headers: HttpHeaders;

  constructor(
    private apiSvc: ApiService
  ) {
    this.headers = this.getHeaders();
  }

  getHeaders(): HttpHeaders {
    const headers = {
      'x-api-version': '2'
    };

    return new HttpHeaders(headers);
  }

  getBasicAuthorities() {
    return this.apiSvc.get(this.AUTHORITIES_BASIC, this.headers);
  }

  getEstablishments(authorityId: any) {
    const searchParams = {
      localAuthorityId: authorityId
    }
    return this.apiSvc.get(`${this.ESTABLISHMENTS}`, this.headers, searchParams);
  }

  getRatings() {
    return this.apiSvc.get(this.RATINGS, this.headers);
  }

  getSumOfValues() {

  }
}
