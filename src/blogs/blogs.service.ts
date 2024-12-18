import { FilesService } from '../files/files.service';
import { FileType } from '../files/domain/file';

import { HttpStatus, UnprocessableEntityException } from '@nestjs/common';

import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { BlogRepository } from './infrastructure/persistence/blog.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Blog } from './domain/blog';

@Injectable()
export class BlogsService {
  constructor(
    private readonly fileService: FilesService,

    // Dependencies here
    private readonly blogRepository: BlogRepository,
  ) {}

  async create(createBlogDto: CreateBlogDto) {
    // Do not remove comment below.
    // <creating-property />
    let image: FileType | null | undefined = undefined;

    if (createBlogDto.image) {
      const imageObject = await this.fileService.findById(
        createBlogDto.image.id,
      );
      if (!imageObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            image: 'notExists',
          },
        });
      }
      image = imageObject;
    } else if (createBlogDto.image === null) {
      image = null;
    }

    return this.blogRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      image,

      content: createBlogDto.content,

      title: createBlogDto.title,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.blogRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Blog['id']) {
    return this.blogRepository.findById(id);
  }

  findByIds(ids: Blog['id'][]) {
    return this.blogRepository.findByIds(ids);
  }

  async update(
    id: Blog['id'],

    updateBlogDto: UpdateBlogDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let image: FileType | null | undefined = undefined;

    if (updateBlogDto.image) {
      const imageObject = await this.fileService.findById(
        updateBlogDto.image.id,
      );
      if (!imageObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            image: 'notExists',
          },
        });
      }
      image = imageObject;
    } else if (updateBlogDto.image === null) {
      image = null;
    }

    return this.blogRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      image,

      content: updateBlogDto.content,

      title: updateBlogDto.title,
    });
  }

  remove(id: Blog['id']) {
    return this.blogRepository.remove(id);
  }
}
