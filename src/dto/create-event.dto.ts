import { IsEmail, IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  actor_name: string;
  @IsString()
  @IsEmail()
  actor_email: string;
  @IsString()
  action_name: string;
}
