import { ObjectType, Field } from "type-graphql";
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { Generation } from "./Generation";

@ObjectType()
@Entity()
export class GenerationImage extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  imageUrl!: string;

  @ManyToOne(() => Generation, (g) => g.images, { onDelete: "CASCADE" })
  generation: Generation;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
