import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { BookDTO } from './dto/create-book.dto';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async create(data: BookDTO): Promise<BookDTO> {
    const bookExists: BookDTO = await this.prisma.book.findFirst({
      where: { bar_code: data.bar_code },
    });

    if (bookExists) {
      throw new HttpException(
        `Livro já cadastrado ${data.title.toLowerCase()}`,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const book = await this.prisma.book.create({ data });

    return book;
  }

  async findOne(id: string) {
    const book: BookDTO = await this.prisma.book.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!book) {
      throw new HttpException('Livro não encontrado', HttpStatus.NOT_FOUND);
    }

    return book;
  }

  async findAll(): Promise<BookDTO[]> {
    return this.prisma.book.findMany({
      include: {
        author: true,
      },
    });
  }

  async update(id: string, data: BookDTO) {
    const bookExists: BookDTO = await this.prisma.book.findUnique({
      where: { id: Number(id) },
    });

    if (!bookExists) {
      throw new HttpException(`Livro não cadastrado`, HttpStatus.NOT_FOUND);
    }

    const bookUpdate = await this.prisma.book.update({
      data,
      where: {
        id: Number(id),
      },
    });

    return bookUpdate;
  }

  async delete(id: string): Promise<HttpException> {
    const bookExists: BookDTO = await this.prisma.book.findUnique({
      where: { id: Number(id) },
    });

    if (!bookExists) {
      throw new HttpException(`Livro não encontrado`, HttpStatus.NOT_FOUND);
    }

    await this.prisma.book.delete({ where: { id: Number(id) } });

    throw new HttpException('Livro deletado com sucesso', HttpStatus.OK);
  }
}
