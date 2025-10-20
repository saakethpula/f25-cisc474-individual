import { Link } from './links/entities/link.entity';

import { CreateLinkDto } from './links/dto/create-link.dto';
import { UpdateLinkDto } from './links/dto/update-link.dto';
import { UpdateMessageDto } from './message/dto/update-message.dto';

export const links = {
  dto: {
    CreateLinkDto,
    UpdateLinkDto,
    UpdateMessageDto,
  },
  entities: {
    Link,
  },
};
