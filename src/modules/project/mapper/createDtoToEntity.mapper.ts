import { plainToClass }     from 'class-transformer';
import { CreateProjectDto } from '@modules/project/dto/create-project.dto';
import { Project }          from '@modules/project/entities/project.entity';

export const createDtoToEntityMapper = (dto: CreateProjectDto): Project => {
  const mappedEntity = plainToClass(Project, dto);

  mappedEntity.isActive = true;
  return mappedEntity;
};
