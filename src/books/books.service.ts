import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Book } from './book.entity';
import { Repository } from 'typeorm'
import { CreatedBookDto } from './dto/created-book.dto'
import { UpdatedBookDto } from './dto/updated-book.dto';

@Injectable()
export class BooksService {
    constructor (@InjectRepository(Book) private bookRepository: Repository<Book> ) {}

    async createBook (book: CreatedBookDto) {
        const bookFount = await this.bookRepository.findOne({
            where: {
                nameBook: book.nameBook
            }
        })
        if (bookFount) {
            return new HttpException('Libro ya registrado', HttpStatus.CONFLICT)
        }
        const newBook = this.bookRepository.create(book)
        return this.bookRepository.save(newBook)
    }

    async getBooks() {
        return this.bookRepository.find()
    }

    getBook(id: number) {
        const bookFount =  this.bookRepository.findOne({
            where: {
                id
            }
        })
        if (!bookFount) {
            return new HttpException('Libro no encontrado', HttpStatus.NOT_FOUND)
        }
        return bookFount
    }

    updateBook(id: number, book: UpdatedBookDto) {
        return this.bookRepository.update({ id }, book)
    }
}
