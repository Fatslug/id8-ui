import { Idea, BusinessArea } from './idea';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OperatorFunction, Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IdeaService {
  private ideas: BehaviorSubject<Idea[]> = new BehaviorSubject([]);
  public $ideas: Observable<Idea[]> = this.ideas.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  public addIdea(idea: Idea): Promise<string> {
    let headers = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')});
    
    return new Promise((resolve, reject) => {
      this.http.post<Idea>(`${environment.serviceUrl}/ideas/`, {
        idea: idea
      }, {
        headers: headers,
        withCredentials: true
      }).pipe(
        map(savedIdea => savedIdea._id),
        catchError(this.handleError)
      ).toPromise().then((ideaID) => {
        resolve(ideaID);
      });
    });
  }

  public getIdeas(filter?: IdeaFilter): void {
    let filterParams = '';
    if (filter) {
      filterParams = this.buildFilterParams(filter);
    }

    this.http.get<Idea[]>(`${environment.serviceUrl}/ideas${filterParams}`, {
      withCredentials: true
    }).pipe(
      catchError(this.handleError)
    ).toPromise().then((ideas: Idea[]) => {
      this.ideas.next(ideas);
    });
  }

  private buildFilterParams(filter: IdeaFilter): string {
    let filterString = '?';
    Object.keys(filter).forEach((prop, index) => {
      if (index !== 0) {
        filterString += '&';
      }
      filterString += `${prop}=${filter[prop]}`;
    });
    return filterString;
  }

  public getIdeaByID(ideaID: string): Promise<Idea> {
    return this.http.get<Idea>(`${environment.serviceUrl}/ideas/${ideaID}`, {
      withCredentials: true
    }).pipe(
      catchError(this.handleError)
    ).toPromise().then((idea: Idea) => {
      return idea;
    });
  }

  public updateIdeaByID(ideaID: string, idea: Idea): Promise<Idea> {
    const headers = new HttpHeaders({'Authorization': 'Basic ' + localStorage.getItem('token')});

    console.log('Updating idea:', idea);

    return this.http.put<Idea>(`${environment.serviceUrl}/ideas/${ideaID}`, {
      idea: idea
    }, {
      headers: headers,
      withCredentials: true
    }).pipe(
      catchError(this.handleError)
    ).toPromise().then((updatedIdea: Idea) => {
      return idea;
    });
  }

  public getBusinessAreas(): Promise<BusinessArea[]> {
    return new Promise((resolve, reject) => {
      this.http.get<BusinessArea[]>(`${environment.serviceUrl}/businessareas/`, {
        withCredentials: true
      })
      .pipe(
        catchError(this.handleError)
      ).toPromise().then((result => {
        resolve(result);
      }));
    });
  }

  private handleError(handleError: any): OperatorFunction<string, any> {
    throw new Error(handleError.error.message);
  }
}

export class IdeaFilter {
  public startDate?: Date;
  public endDate?: Date;
  public quickDate?: string;
  public title?: string;
  public businessAreas?: string[];
}
