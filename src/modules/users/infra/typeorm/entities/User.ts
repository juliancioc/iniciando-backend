import { 
    Entity,
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn 
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;
    
    @Column()
    avatar: string;

    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;

    @Expose({ name: 'avatar_url' })
    getAvatarUrl(): string | null {
        return this.avatar 
        ? `${process.env.AWS_IMAGE_S3}/${this.avatar}`
        : null
    }
}

export default User;