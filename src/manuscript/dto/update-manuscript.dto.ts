import { PartialType } from '@nestjs/mapped-types';
import { CreateManuscriptDto } from './create-manuscript.dto';

export class UpdateManuscriptDto extends PartialType(CreateManuscriptDto) {}
