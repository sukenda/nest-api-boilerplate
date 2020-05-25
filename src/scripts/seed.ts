import { createConnection, ConnectionOptions } from 'typeorm';
import { configService } from '../config/config.service';
import { MenuEntity } from '../entity/menu.entity';
import { RoleDto } from '../dto/role.dto';
import { MenuDto } from '../dto/menu.dto';
import { RoleEntity } from '../entity/role.entity';

async function run() {

  const connectionOptions = {
    ...configService.getTypeOrmConfig(),
    debug: true,
  };

  const connection = await createConnection(connectionOptions as ConnectionOptions);
  const menuService = connection.getRepository(MenuEntity);
  const roleService = connection.getRepository(RoleEntity);

  // 'ADMIN', 'STUDENT', 'TEACHER', 'GUEST'
  const roles = [
    {
      name: 'ADMIN',
      code: 'ADMIN',
    },
    {
      name: 'STUDENT',
      code: 'STUDENT',
    },
    {
      name: 'TEACHER',
      code: 'TEACHER',
    },
    {
      name: 'GUEST',
      code: 'GUEST',
    },
  ];

  const menus = [
    {
      name: 'Dashboard',
      url: '/index',
    },
    {
      name: 'Setting',
      url: '/setting',
    },
    {
      name: 'Teachers',
      url: '/teachers',
    },
    {
      name: 'Students',
      url: '/students',
    },
  ];

  const insertRoles = roles.map(role => roleService.save(RoleDto.from(role).toEntity())
    .then(r => (console.log('done ->', r.name), r)));

  const insertMenus = menus.map(menu => menuService.save(MenuDto.from(menu).toEntity())
    .then(r => (console.log('done ->', r.name), r)));

  return await Promise.all([insertRoles, insertMenus]);
}

run()
  .then(_ => console.log('...wait for script to exit'))
  .catch(error => console.error('seed error', error));
