import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

import { Word } from './word.model';
import { WordService } from './word.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    words: Word[] = [];
    values: String[] = [];
    wordToSearch = '';
    input_search: String = '';

    constructor(private wordservice: WordService) {}

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.words, event.previousIndex, event.currentIndex);
        this.wordservice.storeDataToServer(this.words);
    }

    ngOnInit() {
        const wordObservable = this.wordservice.getDataFromServer();
        wordObservable.subscribe((wordsData: Word[]) => {
            this.words = wordsData
        });      
    }
   
    keyPress(e) {
        if (e.keyCode == 32) {
            // Space
            return false;
        }
    }

    onKey(e) {
        var code = e.keyCode
        if (code == 8) {
            // Backspace
            this.wordToSearch = this.wordToSearch.substring(0, this.wordToSearch.length-1);
        } else if (code >= 48 && code <= 90) {
            this.wordToSearch += e.key;
        } else {
            return false;
        }

        const anagramObservable = this.wordservice.getAnagrams(this.wordToSearch);
        anagramObservable.subscribe((words: String[]) => {
            this.values = words;
        });
    }
}