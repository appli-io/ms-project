import { plainToClass }  from 'class-transformer';
import { CreateEpicDto } from '@modules/epic/dto/create-epic.dto';
import { Epic }          from '@modules/epic/entities/epic.entity';

export const createDtoToEntityMapper = (dto: CreateEpicDto): Epic => {
  const mappedEntity = plainToClass(Epic,dto);

  mappedEntity.isActive = true;
  return mappedEntity;
}
