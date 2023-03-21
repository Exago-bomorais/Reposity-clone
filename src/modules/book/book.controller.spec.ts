import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { PrismaService } from '../../database/PrismaService';
import { BookTestDTO } from './book.controller.spec.dto';

describe('AppController', () => {
  let bookController: BookController;
  let bookService: BookService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [BookService, PrismaService],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
    bookController = module.get<BookController>(BookController);
    bookService = module.get<BookService>(BookService);
    await prismaService.$connect();
  });

  it('Inicialização do bookController e bookService', () => {
    expect(bookController).toBeDefined();
    expect(bookService).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  describe('Rota POST para criação do book', () => {
    afterAll(async () => {
      await prismaService.book.delete({
        where: { bar_code: bookData.bar_code },
      });
    });

    const bookData: BookTestDTO = {
      title: 'Livro 1',
      description: 'Descrição do livro 1',
      bar_code: '56987458-5896588',
    };
    test('Criação de um book', async () => {
      const book = await bookController.create(bookData);

      expect(book).toHaveProperty('id');
    });

    test('book já cadastrado', async () => {
      expect(async () => {
        await bookController.create(bookData);
      }).rejects.toThrowError();
    });
  });
});
