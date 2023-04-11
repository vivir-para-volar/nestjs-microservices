import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { User } from "./users.model";
import { UsersService } from "./users.service";
import { AddRoleDto } from "./dto/add-role.dto";
import { JwtAuthGuard } from "./../auth/jwt-auth.guard";
import { RolesGuard } from "./../auth/roles.guard";
import { Roles } from "./../auth/roles-auth.decorator";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get()
  getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  getUserById(@Param("id") id: number): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post("/role")
  addRole(@Body() addRoleDto: AddRoleDto): Promise<User> {
    return this.usersService.addRole(addRoleDto);
  }
}
