import { Controller, Post, Body, Get, Param, ParseIntPipe, Put, Delete } from '@nestjs/common';
import { CreatedBookDto } from './dto/created-book.dto';
import { BooksService } from './books.service';
import { Book } from './book.entity'
import { UpdatedBookDto } from './dto/updated-book.dto';



@Controller('books')
export class BooksController {
    constructor(private booksServices: BooksService) {}

    @Get()
    getBooks() {
        return this.booksServices.getBooks()
    }

    @Get(':id')
    getBook(@Param('id', ParseIntPipe) id: number) {
        return this.booksServices.getBook(id)
    }

    @Post()
    createdBook(@Body() newBook: CreatedBookDto) {
        return this.booksServices.createBook(newBook)
    }

    @Put(':id')
    updatedBook(@Param('id', ParseIntPipe) id: number, @Body() book: UpdatedBookDto) {
        return this.booksServices.updateBook(id, book)
    }

    @Delete(':id')
    deleteBook(@Param('id', ParseIntPipe) id: number) {
        return this.booksServices.deleteBook(id)
    }

}
