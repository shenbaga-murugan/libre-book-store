import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

    private countriesURL: string = "http://localhost:8080/countries";
    private booksURL: string = "http://localhost:8080/books";

    constructor(private httpClient: HttpClient) {

    }

    getBookFormats(): BookFormat[] {
        return [
            {
                text: 'Paperback',
                value: 'paperback'
            },
            {
                text: 'Hardcover',
                value: 'hardcover'
            },
            {
                text: 'Mass Market Paperback',
                value: 'mmpaperback'
            },
            {
                text: 'Ebook',
                value: 'ebook'
            },
            {
                text: 'Spiral Bound',
                value: 'spiralbound'
            }
        ];
    }

    getCountries(): Observable<Country[]> {
        const headers: HttpHeaders = new HttpHeaders({"Access-Control-Allow-Origin": "http://localhost:8080"});
        return this.httpClient.get(this.countriesURL, {headers: headers}) as Observable<Country[]>;
    }

    getBook(bookId: number): Observable<Book>{
        const headers: HttpHeaders = new HttpHeaders({"Access-Control-Allow-Origin": "http://localhost:8080"});
        return this.httpClient.get(this.booksURL+`/${bookId}`, {headers: headers}) as Observable<Book>;
    }

    saveBook(book: Book): Observable<Book>{
        const headers: HttpHeaders = new HttpHeaders({"Access-Control-Allow-Origin": "http://localhost:8080"});
        return this.httpClient.post(this.booksURL, book, {headers: headers}) as Observable<Book>;
    }
}

export interface BookFormat {
    text: string,
    value: string
}

export interface Country {
    name: string,
    countryCode: string,
    currency: string
}

export interface Book {
      bookTitle: string,
      author: string,
      isbn: string,
      publisher: string,
      bookDetails: BookDetails
}

export interface BookDetails {
    numberOfPages: number,
    format: string[],
    countryOfOrigin: Country,
    price:number
}