import { IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  actor_name: string;
  @IsString()
  group: string;

  @IsString()
  action_name: string;
  @IsString()
  target_name: string;
  @IsString()
  location: string;
  @IsString()
  metadata_redirect: string;
  @IsString()
  metadata_description: string;
}
