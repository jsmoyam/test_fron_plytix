import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Word } from './word.model';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  apiURL: string = 'http://127.0.0.1:5000/api';

  words: Word[] = [];

  constructor(private httpClient: HttpClient) { }

  public getDataFromServer(): any {
    return this.httpClient.get<Word[]>(`${this.apiURL}/words`);
  }

  public storeDataToServer(words: Word[]) {
    return this.httpClient.post(`${this.apiURL}/store`, words).subscribe();
  }

  public getAnagrams(word) {
    return this.httpClient.post(`${this.apiURL}/anagrams`, word);
  }
}
