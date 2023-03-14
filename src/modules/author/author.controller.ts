import { Body, Controller, Post } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorDto } from './dto/create-author.dto';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  async create(@Body() data: AuthorDto) {
    return this.authorService.create(data);
  }
}
