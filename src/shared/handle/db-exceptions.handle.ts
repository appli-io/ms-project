import { InternalServerErrorException, Logger } from '@nestjs/common';

export const handleDBExceptions = (error: any, logger: Logger) => {
  if (error.code == 23505) { // DUPLiCATE ENTRY
    logger.error(error.message);
    throw new InternalServerErrorException(error.detail);
  }

  throw new InternalServerErrorException(error.message);
};
