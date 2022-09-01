import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ManuscriptService } from './manuscript.service';
import { ManuscriptController } from './manuscript.controller';
import { Manuscript } from './entities/manuscript.entity';
import { User } from '../user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Manuscript, User])],
  controllers: [ManuscriptController],
  providers: [ManuscriptService],
})
export class ManuscriptModule {}
