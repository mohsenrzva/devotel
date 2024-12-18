import { FilesModule } from '../files/files.module';
import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { RelationalBlogPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    FilesModule,

    // import modules, etc.
    RelationalBlogPersistenceModule,
  ],
  controllers: [BlogsController],
  providers: [BlogsService],
  exports: [BlogsService, RelationalBlogPersistenceModule],
})
export class BlogsModule {}
