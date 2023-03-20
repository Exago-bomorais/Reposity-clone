import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { PrismaService } from '../../database/PrismaService';

describe('AppController', () => {
  let bookController: BookController;
  let bookService: BookService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [BookService, PrismaService],
    }).compile();

    prisma = module.get<PrismaService>(PrismaService);
    bookService = module.get<BookService>(BookService);
    bookController = module.get<BookController>(BookController);
    await prisma.$connect();
  });

  describe('Rota Create', () => {
    it('criação de usuario pelo teste', async () => {
      const user = {
        title: 'Os segredos da mente milhonaria',
        description: 'Livro para enriquecer',
        bar_code: '8956226565-87984465468',
      };

      const create = await bookController.create(user);

      expect(create.bar_code).toEqual(user.bar_code);
    });

    it('criação de usuario duplicado', async () => {
      const user = {
        title: 'Os segredos da mente milhonaria',
        description: 'Livro para enriquecer',
        bar_code: '8956226565-87984465468',
      };

      expect(async () => {
        await bookController.create(user);
      }).rejects.toThrow(
        `Livro já cadastrado ${user.title.toLocaleLowerCase()}`,
      );
    });
  });

  // describe('Rota Show', () => {
  //   test('Procurando um usuario especifico no banco de dados', async () => {
  //       const id: string = '1'

  // });
  // });
});
