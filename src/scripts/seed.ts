import * as _ from 'lodash';
import { createConnection, ConnectionOptions } from 'typeorm';
import { configService } from '../config/config.service';
import { UserService } from '../shared/user.service';
import { UserDto } from '../dto/user.dto';
import { User } from '../model/user.entity';

async function run() {

  const seedId = Date.now()
    .toString()
    .split('')
    .reverse()
    .reduce((s, it, x) => (x > 3 ? s : (s += it)), '');

  const opt = {
    ...configService.getTypeOrmConfig(),
    debug: true,
  };

  const connection = await createConnection(opt as ConnectionOptions);
  const userService = new UserService(connection.getRepository(User));

  const work = _.range(1, 25)
    .map(n => UserDto.from({
      username: `Seed ${seedId}-${n}`,
      password: `Seed ${seedId}-${n}`,
      email: `Seed${seedId}-${n}@gmail.com`,
      profileName: `User dari generate ke ${n}`,
    }))
    .map(dto => userService.register(dto)
      .then(r => (console.log('done ->', r.email), r)));

  return await Promise.all(work);
}

run()
  .then(_ => console.log('...wait for script to exit'))
  .catch(error => console.error('seed error', error));
