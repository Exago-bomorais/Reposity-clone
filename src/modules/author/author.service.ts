import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';

import { AuthorDto } from './dto/create-author.dto';

@Injectable()
export class AuthorService {
  constructor(private prisma: PrismaService) {}

  async create(data: AuthorDto) {
    const authorExists = await this.prisma.author.findFirst({
      where: { name: data.name },
    });

    if (authorExists) {
      throw new HttpException(
        { msg: 'Author já cadastrado', author: `${authorExists.name}` },
        HttpStatus.BAD_REQUEST,
      );
    }

    const author = await this.prisma.author.create({ data });

    return author;
  }
}
