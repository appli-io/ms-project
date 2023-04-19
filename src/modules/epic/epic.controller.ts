import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { EpicService }                                                                                   from './epic.service';
import { CreateEpicDto }                                     from './dto/create-epic.dto';
import { UpdateEpicDto }                                     from './dto/update-epic.dto';
import { PageOptionsDto }                                           from '@common/dto/page-options.dto';
import { PageDto }                                                  from '@common/dto/page.dto';
import { Epic }                                                     from '@modules/epic/entities/epic.entity';
import { ApiTags }                                                                        from '@nestjs/swagger';

@Controller('epic')
@ApiTags('Epics')
export class EpicController {
  constructor(private readonly epicService: EpicService) {}

  @Post()
  create(@Body() createEpicDto: CreateEpicDto) {
    return this.epicService.create(createEpicDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<Epic>> {
    return this.epicService.findAll(pageOptionsDto)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.epicService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEpicDto: UpdateEpicDto) {
    return this.epicService.update(id, updateEpicDto);
  }

  @Patch(':id/disable')
  disabled(@Param('id',ParseUUIDPipe) id : string){
    return this.epicService.disabled(id, false)
  }

  @Patch(':id/disable')
  enable(@Param('id',ParseUUIDPipe) id : string){
    return this.epicService.disabled(id, true);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.epicService.remove(id);
  }
}
