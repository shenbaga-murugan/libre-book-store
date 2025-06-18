import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookValidators } from './book-validator';
import { Book, BookFormat, BookService, Country } from './book-service';
import { IsbnPipe } from './isbn.pipe';

@Component({
  selector: 'book-management',
  standalone: false,
  templateUrl: './book-management.component.html',
  styleUrl: './book-management.component.css'
})
export class BookManagementComponent implements OnInit {
 
  bookManagementForm: FormGroup;
  countries: Country[] = [];
  bookFormats!: BookFormat[];
  countryLoading: boolean = false;
  fetchingBook: boolean = false;
  
  constructor(private formBuilder: FormBuilder, private bookService: BookService) {
    
    this.bookManagementForm = formBuilder.group({
      id:[''],
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

  }

  ngOnInit(): void {
    this.countryLoading = true;
    this.bookService.getCountries().subscribe({
      next: (resp: Country[]) => {
        this.countries = resp;
        this.countryLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.countryLoading = false;
      }
    });
    this.bookFormats = this.bookService.getBookFormats(); 
  }

  get id() {
    return this.bookManagementForm.get('id');
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

  saveBookInfo(bookIdInput: HTMLInputElement) {
    let book: Book = this.bookManagementForm.value;
    book.isbn = (this.isbn?.value as string).replaceAll("-", "");
    if(bookIdInput.value) {
      book.id = +bookIdInput.value;
      this.updateBookInfo(book);
    } else {
      delete book.id;
      this.addBookInfo(book);
    }
  }

  addBookInfo(book: Book) {
    this.bookService.addBook(book).subscribe({
      next: (resp: Book) => {
        console.log(resp);
        this.id?.setValue(resp.id);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  updateBookInfo(book: Book) {
    this.bookService.saveBook(book).subscribe({
      next: (resp: Book) => {
        console.log(resp);
      },
      error: (err: Response) => {
        if(err.status === 401) {
          console.log("User not authorized to modify book details!");
          this.id?.setErrors(err.json());
        }
        console.log(err);
      }
    });
  }

  getBookInfo(idInput: HTMLInputElement): void  {
    const isbnPipe: IsbnPipe = new IsbnPipe();
    this.fetchingBook = true;
    this.bookService.getBook((+idInput.value)).subscribe({
      next: (response: Book) => {
        this.bookTitle?.setValue(response.bookTitle);
        this.author?.setValue(response.author)
        this.countryOfOrigin?.setValue(this.countries.find((c) => c.countryCode === response.bookDetails.countryOfOrigin.countryCode));
        this.format?.setValue(response.bookDetails.format);
        this.publisher?.setValue(response.publisher);
        this.numberOfPages?.setValue(`${response.bookDetails.numberOfPages}`);
        this.price?.setValue(`${response.bookDetails.price}`);
        this.isbn?.setValue(isbnPipe.transform(response.isbn));
        this.fetchingBook = false;
      },
      error: (error) => {
        console.log(error);
        this.fetchingBook = false;
        this.clearForm();
      }
    });
  }

  deleteBookInfo(bookId: number) {
    this.bookService.deleteBook(bookId).subscribe({
      next: (resp: number) => {
        console.log(resp);
        this.clearForm();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  
  clearForm() {
    this.bookManagementForm.setValue({
      id: '',
      bookTitle: '',
      author: '',
      publisher: '',
      isbn: '',
      bookDetails: {
        numberOfPages: '',
        countryOfOrigin: null,
        price: '',
        format: []
      }
    });
  }

}