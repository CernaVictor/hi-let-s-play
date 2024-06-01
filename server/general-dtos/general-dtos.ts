import { Transform } from 'class-transformer';

export class PaginationDto {
  @Transform(({ value }) => parseInt(value))
  from = 0;

  @Transform(({ value }) => parseInt(value))
  count = 20;
}
