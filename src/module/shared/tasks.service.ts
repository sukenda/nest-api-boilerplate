import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TasksService {

  private readonly logger = new Logger(TasksService.name);

  /**
   *   * * * * * * *
   *   | | | | | |
   *   | | | | | day of week
   *   | | | | month
   *   | | | day of month
   *   | | hour
   *   | minute
   *   second (optional)
   */
  @Cron(CronExpression.EVERY_5_SECONDS)
  handleCron() {
    this.logger.error('Called when the current second is 5');
  }

}
