import { FileType } from '../../files/domain/file';
import { ApiProperty } from '@nestjs/swagger';

export class Blog {
  @ApiProperty({
    type: () => FileType,
    nullable: true,
  })
  image?: FileType | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  content: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  title: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
