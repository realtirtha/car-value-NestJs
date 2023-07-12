import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private repo: Repository<User>
      ){}
      
        //create method
        create(email:string, password:string){
          //creates a user instance using incoming values
          const user = this.repo.create({email,password});
          //saves that user to db
          return this.repo.save(user);
        }
      
}
