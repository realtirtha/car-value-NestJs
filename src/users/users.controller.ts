import { Controller, Post, Body, Param, Get, NotFoundException, Query, Delete, Patch } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){

    }


    @Post('signup')
    createUser(@Body() body: CreateUserDto){
        console.log(body);
        this.userService.create(body.email, body.password);
    }

    @Get('/:id')
    async findUser(@Param('id') id:string){
        const user = await this.userService.findOne(parseInt(id));
        if(!user){
            throw new NotFoundException('user not found')
        }
        return user;
    }

    @Get()
    findAll(){
        return this.userService.findAll();
    }

    @Get('/:email')
    findByEmail(@Query('email') email:string){
        return this.userService.findbyEmail(email);
    }

    @Delete('/:id')
    removeUser(@Param('id') id:string){
        return this.userService.remove(parseInt(id));
    }
    
    
    @Patch('/:id')
    updateUser(@Param('id') id:string, @Body() body:UpdateUserDto){
            return this.userService.update(parseInt(id), body);
    }
    
}
