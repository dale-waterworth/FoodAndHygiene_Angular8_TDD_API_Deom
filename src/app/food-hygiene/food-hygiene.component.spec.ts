import { async, ComponentFixture, TestBed, fakeAsync, inject, tick } from '@angular/core/testing';

import { FoodHygieneComponent } from './food-hygiene.component';
import { testDeclarations } from '../test/test.declarations';
import { testImports } from '../test/test.imports';
import { testProviders } from '../test/test.providers';
import { FormItemsModule } from '../formItems/form-items.module';
import { EstablishmentListComponent } from './establishment-list/establishment-list.component';
import { HttpTestingController } from '@angular/common/http/testing';
import { HttpRequest } from '@angular/common/http';
import { IEstablishmentCall, IRatingsCall, IRating } from './food-hygiene.service';
import { environment } from 'src/environments/environment';
import { RatingsComponent } from './ratings/ratings.component';

describe('FoodHygieneComponent', () => {
  let component: FoodHygieneComponent;
  let fixture: ComponentFixture<FoodHygieneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FoodHygieneComponent,
        RatingsComponent,
        EstablishmentListComponent,
        ...testDeclarations
      ],
      imports: [
        ...testImports,
        FormItemsModule.forRoot()
      ],
      providers: [
        ...testProviders
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodHygieneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Generic call to send a mock web service call and return back expected data
   * 
   * @param httpMock
   * @param callingURL
   * @param data
   */
  const runMockGetAPIData = (httpMock: HttpTestingController, callingURL: string, data: any) => {

    const mockReq = httpMock.expectOne((req: HttpRequest<any>) => {
      return req.url.includes(callingURL);
    });

    mockReq.flush(data);

    httpMock.verify();

    tick(250);

    fixture.detectChanges();
  };


  /**
   * Same as above but for multiple
   * (Todo = think about combing them into a single function, maybe?)
   * @param httpMock
   * @param callingURLs
   * @param data
   */
  const runMockGetAPIDataMultiple = (httpMock: HttpTestingController, callingURLs: string[], data: any[]) => {

    const mockReq = httpMock.match((req: HttpRequest<any>) => {
      const match = callingURLs.includes(req.url);
      expect(match).toBeTruthy();
      return match;
    });

    expect(mockReq.length).toBe(callingURLs.length);

    let i = 0;
    data.forEach(element => {
      mockReq[i].flush(element);
      i++;
    });

    httpMock.verify();

    tick(250);

    fixture.detectChanges();
  };


  const getUniqueData = (data: any) => {
    // ensure the data is 'new' (quick and dirty way)
    return JSON.parse(JSON.stringify(data));
  };

  function getRatingData() {
    return getUniqueData(require('../test/ratings.json'));
  }

  const getAuthorityBasicData = () => {
    return getUniqueData(require('../test/authorities-basic.json'));
  };

  const getEstablishmentData = () => {
    return getUniqueData(require('../test/establishments_uk.json'));
  };


  const runAuthorityBasicDataWebServiceCall = (httpMock: HttpTestingController) => {
    const callingURL = component.foodHygienSvc.AUTHORITIES_BASIC;

    const data: any = getAuthorityBasicData();

    runMockGetAPIData(httpMock, callingURL, data);
  };

  const runEstablishmentBasicDataWebServiceCall = (httpMock: HttpTestingController) => {
    const calls = [
      `${environment.serverURL}/${component.foodHygienSvc.RATINGS}`,
      `${environment.serverURL}/${component.foodHygienSvc.ESTABLISHMENTS}`
    ];
    const data: any = [
      getRatingData(),
      getEstablishmentData()
    ];
    runMockGetAPIDataMultiple(httpMock, calls, data);
  };

  const simulateError = (httpMock: HttpTestingController, callingURL: string, statusText: string) => {

    httpMock.expectOne((req: HttpRequest<any>) => {
      return req.url.includes(callingURL);
    }).error(new ErrorEvent('Customer Error', { error: 500, message: 'error message' }),
      { status: 500, statusText });

    httpMock.verify();

    tick(250);

    fixture.detectChanges();
  };

  const selectDropDown = (index: number) => {
    const dropDownOptions = fixture.nativeElement.querySelector('app-dropdown select');
    dropDownOptions.value = dropDownOptions[index].value;
    dropDownOptions.dispatchEvent(new Event('change'));
  };


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title', () => {
    const firstSection = fixture.nativeElement.querySelector('header').innerHTML;
    expect(firstSection).toContain(component.content.main.title);
  });

  it('should get the basic authorities on load', fakeAsync(inject([HttpTestingController],
    (httpMock: HttpTestingController) => {

      runAuthorityBasicDataWebServiceCall(httpMock);

      expect(component.authorityList).toBeTruthy();
      expect(component.authorityList.length).toBeGreaterThan(0);

    })));

  it('should handle the error if it can\'t get authorities ', fakeAsync(inject([HttpTestingController],
    (httpMock: HttpTestingController) => {

      const callingURL = component.foodHygienSvc.AUTHORITIES_BASIC;

      const statusText = 'Internal Server Error';

      // simulate error 500
      simulateError(httpMock, callingURL, statusText);

      const sections = fixture.nativeElement.querySelectorAll('section');

      expect(sections[0].innerHTML).toContain(component.content.error.couldNotGetAuthorities);

    })));


  it('should be able to click and select a drop down', fakeAsync(inject([HttpTestingController],
    (httpMock: HttpTestingController) => {

      runAuthorityBasicDataWebServiceCall(httpMock);

      selectDropDown(0);

      fixture.detectChanges();

      // expect it to get the ratings the establishments
      runEstablishmentBasicDataWebServiceCall(httpMock);

      // should set establishments
      expect(component.establishments).toBeTruthy();
      expect(component.authorityList.length).toBeGreaterThan(0);

    })));


  /**
   * This is the data set
   * fhrs_5_en-gb | 5 = 343
   * context.js:255 fhrs_4_en-gb | 4 = 48
   * context.js:255 fhrs_3_en-gb | 3 = 7
   * context.js:255 fhrs_2_en-gb | 2 = 1
   * context.js:255 fhrs_1_en-gb | 1 = 6
   * context.js:255 fhrs_0_en-gb | 0 = undefined
   * context.js:255 fhis_pass_en-gb | Pass = undefined
   * context.js:255 fhis_improvement_required_en-gb | Improvement Required = undefined
   * context.js:255 fhis_awaiting_publication_en-gb | Awaiting Publication = undefined
   * context.js:255 fhis_awaiting_inspection_en-gb | Awaiting Inspection = undefined
   * context.js:255 fhis_exempt_en-gb | Exempt = undefined
   * context.js:255 fhrs_exempt_en-gb | Exempt = 29
   */
  it('should get the correct breakdown results', () => {
    // unit test the breakdown function
    const establishmentData: IEstablishmentCall = getEstablishmentData();
    const ratings: IRatingsCall = getRatingData();
    const ratingsProcessed = component.getRatings(ratings.ratings, establishmentData.establishments);

    const numberOfResults = establishmentData.meta.itemCount;

    expect(numberOfResults).toBe(establishmentData.establishments.length);


    const sumOfCounts = ratingsProcessed.reduce((sum: number, rating: IRating) => {
      // rating may not have has any counts
      return rating.hasOwnProperty('count') ? sum + rating.count : sum;

    }, 0);

    expect(sumOfCounts).toBe(numberOfResults);
    // to go into finer granular test for each rating 
    expect(ratingsProcessed.find(r => r.ratingKey === 'fhrs_5_en-gb').count).toBe(343);

  });

  it('should get the correct percentage results', () => {
    // unit test the percentage function
    const establishmentData: IEstablishmentCall = getEstablishmentData();
    const ratings: IRatingsCall = getRatingData();
    const numberOfResults = establishmentData.meta.itemCount;
    const ratingsProcessed = component.getRatings(ratings.ratings, establishmentData.establishments);

    const ratingsWithPercent = component.workOutPercentages(numberOfResults, ratingsProcessed);

    // if it's correct it should add up to 100
    const sumPercents = ratingsWithPercent.reduce((sum: number, rating: IRating) => {
      // rating may not have has any counts
      return rating.hasOwnProperty('count') ? sum + rating.percentage : sum;
    }, 0);

    // could test more precision
    expect(sumPercents).toBeGreaterThan(99.9);
    // to go into finer granular test for each rating
    const percentage = ratingsWithPercent.find(r => r.ratingKey === 'fhrs_5_en-gb').percentage;
    expect(parseInt('' + percentage, 10)).toBe(79);
  });

  it('should see loading when populating establishments and ratings', fakeAsync(inject([HttpTestingController],
    (httpMock: HttpTestingController) => {

      runAuthorityBasicDataWebServiceCall(httpMock);

      selectDropDown(0);
      fixture.detectChanges();

      const section = fixture.nativeElement.querySelectorAll('section')[1];

      expect(section.innerHTML).toContain(component.content.loading.label);

    })));

  it('should dislay establishments and ratings', fakeAsync(inject([HttpTestingController],
    (httpMock: HttpTestingController) => {

      runAuthorityBasicDataWebServiceCall(httpMock);

      selectDropDown(0);
      fixture.detectChanges();

      runEstablishmentBasicDataWebServiceCall(httpMock);

      fixture.detectChanges();

      const section = fixture.nativeElement.querySelectorAll('section')[1];

      const dataSections = section.querySelectorAll('section');

      // should have 2 sections
      expect(dataSections.length).toBe(2);

      // check for the titles
      expect(dataSections[0].innerHTML).toContain(component.content.ratings.label);
      expect(dataSections[1].innerHTML).toContain(component.content.establishments.label);

    })));

    /**
     * etc etc - Many more test could be done and to a more granular level.
     */


});
