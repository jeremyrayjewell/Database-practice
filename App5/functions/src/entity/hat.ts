import { Hippo } from './Hippo'

@Entity()
export class Hat extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Hippo, hippo => hippo.hats)
    owner: Hippo;
}