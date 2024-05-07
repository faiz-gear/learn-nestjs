import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/mapped-types';
import { CreateAaaDto } from './create-aaa.dto';
import { XxxDto } from './xxx.dto';

// export class UpdateAaaDto extends PartialType(CreateAaaDto) {}

// export class UpdateAaaDto extends PickType(CreateAaaDto, [
//   'name',
//   'age',
//   'sex',
// ]) {}

// export class UpdateAaaDto extends OmitType(CreateAaaDto, [
//   'sex',
//   'email',
//   'hobbies',
// ]) {}

// export class UpdateAaaDto extends IntersectionType(CreateAaaDto, XxxDto) {}

export class UpdateAaaDto extends IntersectionType(
  PickType(CreateAaaDto, ['name', 'age']),
  PartialType(OmitType(XxxDto, ['yyy'])),
) {}
