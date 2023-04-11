import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { Role } from "./roles.model";
import { CreateRoleDto } from "./dto/create-role.dto";
import { RolesService } from "./roles.service";
import { Roles } from "./../auth/roles-auth.decorator";
import { RolesGuard } from "./../auth/roles.guard";

@Controller("roles")
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get()
  getAllRoles(): Promise<Role[]> {
    return this.rolesService.getAllRoles();
  }

  @Get(":value")
  getRoleByValue(@Param() param: { value: string }) {
    return this.rolesService.getRoleByValue(param.value);
  }

  @Post()
  createRole(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.rolesService.createRole(createRoleDto);
  }
}
