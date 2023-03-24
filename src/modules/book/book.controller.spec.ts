import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { PrismaService } from '../../database/PrismaService';
import { BookTestDTO } from './dto/book.controller.spec.dto';
import { BookDTO } from './dto/create-book.dto';

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
      await expect(async () => {
        await bookController.create(bookData);
      }).rejects.toThrowError();
    });

    afterAll(async () => {
      await prismaService.book.delete({
        where: { bar_code: bookData.bar_code },
      });
    });
  });

  describe('Rota GET para pesquisa de um Book especifico', () => {
    const bookTest: BookTestDTO = {
      id: 3,
      title: 'Testando o findOne',
      description: 'Teste do findOne',
      bar_code: '565595959-595959116546',
    };
    test('Pesquisa de um book especifico com sucesso', async () => {
      const bookExists = await bookController.show('3');

      expect(bookExists).toEqual(bookTest);
    });

    test('Pesquisa de um book especifico com falha', async () => {
      const id = bookTest.id + 10;

      await expect(async () => {
        await bookController.show(id.toString());
      }).rejects.toThrowError();
    });
  });

  describe('Rota GET para pesquisar todos os Book', () => {
    test('Pesquisando a função bookController.index com sucesso', async () => {
      const bookTest: BookTestDTO[] = [
        {
          id: 4,
          title: 'Testando FindAll',
          description: 'teste do findAll',
          bar_code: '85698-98565221',
          author: null,
        },
        {
          id: 3,
          title: 'Testando o findOne',
          description: 'Teste do findOne',
          bar_code: '565595959-595959116546',
          author: null,
        },
      ];
      const books = await bookController.index();

      expect(books).toEqual(bookTest);
    });
  });
});
