import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateEpicDto }                                               from './dto/create-epic.dto';
import { UpdateEpicDto }                            from './dto/update-epic.dto';
import { PageOptionsDto }                           from '@common/dto/page-options.dto';
import { PageDto }                                  from '@common/dto/page.dto';
import { Epic }                                     from '@modules/epic/entities/epic.entity';
import { PageMetaDto }                              from '@common/dto/page-meta.dto';
import { InjectRepository }                         from '@nestjs/typeorm';
import { Repository }                               from 'typeorm';
import { createDtoToEntityMapper }                  from '@modules/epic/mapper/createDtoToEntity.mapper';

@Injectable()
export class EpicService {

  constructor(
    @InjectRepository(Epic) private readonly epicRepository: Repository<Epic>
  ) {}
  async create(createEpicDto: CreateEpicDto) {
    const epic = await this.epicRepository.findOneBy([{prefix: createEpicDto.prefix}]);

    if (epic)
      throw new InternalServerErrorException('Epic already exists with this prefix and client');

    const newEpic = this.epicRepository.create(createDtoToEntityMapper(createEpicDto));

    return await this.epicRepository.save(newEpic);
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Epic>> {
    const queryBuilder = this.epicRepository.createQueryBuilder('epic');

    queryBuilder
      .orderBy('epic.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const {entities} = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({itemCount, pageOptionsDto});

    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: string): Promise<Epic>{
    const epic = await  this.epicRepository.findOneBy({id});

    if(!epic)
      throw new NotFoundException('Epic Not Found');

    return epic
  }

  async update(id:string, updateEpicDto: UpdateEpicDto){
    const epic = await this.epicRepository.preload({
      id,
      ...updateEpicDto
    });
    if (!epic)
      throw new NotFoundException('Epic not Found');

    return await this.epicRepository.save(epic)
  }

  async remove(id: string): Promise<Epic>{
    const epic = await this.findOne(id);
    if(!epic)
      throw new NotFoundException('Epic not Found')

    return this.epicRepository.softRemove(epic)
  }

  async disabled(id: string, isActive = false): Promise<Epic>{
    const epic = await this.findOne(id);
    if(!epic)
      throw new NotFoundException('Epic not found');

    if(epic.isActive === isActive)
      throw new InternalServerErrorException('Epic Already ' + (isActive ? 'enabled' : 'disabled'));

    return this.epicRepository.save(epic)
  }
}
