import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { ApiKeyService } from './api-key.service';
import { ApiKeyController } from './api-key.controller';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';

@Module({
  controllers: [
    UserController,
    RoleController,
    PermissionController,
    ApiKeyController,
    SessionController,
  ],
  providers: [
    UserService,
    RoleService,
    PermissionService,
    ApiKeyService,
    SessionService,
  ],
  exports: [
    UserService,
    RoleService,
    PermissionService,
    ApiKeyService,
    SessionService,
  ],
})
export class IdentityModule {}
