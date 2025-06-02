import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookValidators } from './book-validator';
import { Book, BookFormat, BookService, Country } from './book-service';

@Component({
  selector: 'book-management',
  standalone: false,
  templateUrl: './book-management.component.html',
  styleUrl: './book-management.component.css'
})
export class BookManagementComponent {
 
  bookManagementForm: FormGroup;
  countries: Country[] = [];
  bookFormats: BookFormat[];
  
  constructor(private formBuilder: FormBuilder, private bookService: BookService) {
    
    this.bookManagementForm = formBuilder.group({
      bookTitle:['', [Validators.required]],
      author:[''],
      isbn:['', BookValidators.validISBN],
      publisher:[''],
      bookDetails: this.formBuilder.group({
        numberOfPages:[],
        format:[[]],
        countryOfOrigin:[],
        price:[]
      })
    });

    bookService.getCountries().subscribe({
      next: (resp: Country[]) => {
        this.countries = resp;
      },
      error: err => {
        console.log(err);
      }
    });
    this.bookFormats = bookService.getBookFormats();

  }

  get bookTitle() {
    return this.bookManagementForm.get('bookTitle');
  }

  get author() {
    return this.bookManagementForm.get('author');
  }

  get isbn() {
    return this.bookManagementForm.get('isbn');
  }

  get publisher() {
    return this.bookManagementForm.get('publisher');
  }

   get numberOfPages() {
    return this.bookManagementForm.get('bookDetails')?.get('numberOfPages');
  }

  get format() {
    return this.bookManagementForm.get('bookDetails')?.get('format');
  }

  get countryOfOrigin() {
    return this.bookManagementForm.get('bookDetails')?.get('countryOfOrigin');
  }

  get price() {
    return this.bookManagementForm.get('bookDetails')?.get('price');
  }

  updateBookInfo() {
    let book: Book = this.bookManagementForm.value;
    book.isbn = (this.isbn?.value as string).replaceAll("-", "");
    this.bookService.saveBook(book).subscribe({
      next: (resp: Book) => {
        console.log(resp);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
