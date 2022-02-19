import { ObjectType, Field } from "type-graphql";
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class GalleryImage extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  imageUrl!: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, type: "text" })
  description: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
