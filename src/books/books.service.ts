import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Book } from './book.entity';
import { Repository } from 'typeorm'
import { CreatedBookDto } from './dto/created-book.dto'
import { UpdatedBookDto } from './dto/updated-book.dto';

@Injectable()
export class BooksService {
    constructor (@InjectRepository(Book) private bookRepository: Repository<Book> ) {}
    async findBookInTable (obj: object) {
        const bookFount = await  this.bookRepository.findOne({ where: obj })
        return bookFount
    }
    async createBook (book: CreatedBookDto) {
        try {
            const bookFount = await this.findBookInTable({ nameBook: book.nameBook })
            if (bookFount) {
                throw new HttpException('Libro ya registrado', HttpStatus.CONFLICT)
            }
            const newBook = this.bookRepository.create(book)
            const savedBook = await this.bookRepository.save(newBook)
            return { success: true, data: savedBook, message: 'Se agrego el Libro correctamente' }
        } catch (error) {
            throw  error
        }
    }
    async getBooks() {
        try {
            const findBooks = await this.bookRepository.find()
            return { success: true, data: findBooks }
        } catch (error) {
            throw  new HttpException(error.message, HttpStatus.FOUND)
        }
    }
    async getBook(id: number) {
        try {
            const bookFount = await  this.findBookInTable({ id })
            if (!bookFount) {
                throw new HttpException('Libro no encontrado', HttpStatus.NOT_FOUND)
            }
            return { success: true, data: bookFount }
        } catch (error) {
            throw  error
        }
    }
    async updateBook(id: number, book: UpdatedBookDto) {
        try {
            const bookFount = await this.findBookInTable({ id })
            if (!bookFount) {
                throw new HttpException('Libro no encontrado', HttpStatus.NOT_FOUND)
            }
            const updatedBook = Object.assign(bookFount, book)
            const handledUpdated = this.bookRepository.save(updatedBook)
            return { success: true, data: handledUpdated, message: 'Se actulizo la informacion correctamente' }
        } catch (error) {
            throw error
        }
    }
    async deleteBook (id: number) {
        try {
            const bookToDelete = await this.findBookInTable({ id })
            if (!bookToDelete) {
                throw new HttpException('Libro no encontrado', HttpStatus.NOT_FOUND);
            }
            const removeBook = await this.bookRepository.delete({ id })
            return { success: true, data: removeBook, message: 'El libro fue removido correctamente' }
        } catch (error) {
            throw  error
        }
    }
}
