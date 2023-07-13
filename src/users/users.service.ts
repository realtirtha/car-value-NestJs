import { Injectable, NotFoundException } from '@nestjs/common';
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

        findOne(userId: number){
          return this.repo.findOne({
            where:{
              id:userId
            }
          })
        }

        findAll(){
          return this.repo.find();
        }

        findbyEmail(useremail: string){
          return this.repo.findOne({
            where:{
              email:useremail
            }
          })
        }

        async update(id:number, attrs: Partial<User>){
          const user = await this.repo.findOne({
            where:{
              id:id
            }
          });
          
          if(!user){
            throw new NotFoundException('no user found');
          }
          Object.assign(user, attrs);
          return this.repo.save(user);
        }

        async remove(id:number){
          const user = await this.repo.findOne({ 
            where:{
              id:id
            }
          })
          if(!user){
            throw new NotFoundException('no user found');
          }
          return this.repo.remove(user);
        }

      
}
