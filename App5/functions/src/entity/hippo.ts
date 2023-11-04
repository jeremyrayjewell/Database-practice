import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Hippo extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    weight: number;

    @Column()
    createdAt: Date;

}

import { Hat } from './Hat';

@Entity()
export class Hippo extends BaseEntity {

    //...

    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(type => Hat, hat => hat.owner)
    hats: Hat[];
}

@Entity()
export class Hippo extends BaseEntity {

    //...

    @Column()
    createdAt: Date;


    @BeforeInsert()
    addTimestamp() {
        this.createdAt = new Date();
    }
}