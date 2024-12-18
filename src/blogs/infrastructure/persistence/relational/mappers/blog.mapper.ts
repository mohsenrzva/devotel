import { Blog } from '../../../../domain/blog';
import { FileMapper } from '../../../../../files/infrastructure/persistence/relational/mappers/file.mapper';

import { BlogEntity } from '../entities/blog.entity';

export class BlogMapper {
  static toDomain(raw: BlogEntity): Blog {
    const domainEntity = new Blog();
    if (raw.image) {
      domainEntity.image = FileMapper.toDomain(raw.image);
    } else if (raw.image === null) {
      domainEntity.image = null;
    }

    domainEntity.content = raw.content;

    domainEntity.title = raw.title;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Blog): BlogEntity {
    const persistenceEntity = new BlogEntity();
    if (domainEntity.image) {
      persistenceEntity.image = FileMapper.toPersistence(domainEntity.image);
    } else if (domainEntity.image === null) {
      persistenceEntity.image = null;
    }

    persistenceEntity.content = domainEntity.content;

    persistenceEntity.title = domainEntity.title;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
