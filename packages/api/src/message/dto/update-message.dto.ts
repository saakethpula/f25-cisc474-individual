import { IsIn, IsNotEmpty } from 'class-validator';

export class UpdateMessageDto {
  @IsNotEmpty()
  @IsIn(['READ', 'UNREAD'])
  status!: 'READ' | 'UNREAD';
}
