import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){

    }

    @Post('signup')
    createUser(@Body() body: CreateUserDto){
        console.log(body);
        this.userService.create(body.email, body.password);
    }
}
