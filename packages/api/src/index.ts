import { Link } from './links/entities/link.entity';

import { CreateLinkDto } from './links/dto/create-link.dto';
import { UpdateLinkDto } from './links/dto/update-link.dto';
import type { UpdateMessageDto } from './message/dto/update-message.dto';

export const links = {
  dto: {
    CreateLinkDto,
    UpdateLinkDto,
  },
  message: {
    // types only
  } as { UpdateMessageDto?: UpdateMessageDto },
  entities: {
    Link,
  },
};
