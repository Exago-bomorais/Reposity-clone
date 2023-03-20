import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { BookController } from './book.controller';

describe('AppController', () => {
  let book: BookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [BookService],
    }).compile();

    book = module.get<BookController>(BookController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(BookController).toBeDefined();
    });
  });
});
