import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Generation } from "./Generation";

@ObjectType()
@Entity()
export class Project extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  description!: string;

  @Field()
  @Column()
  body!: string;

  @Field({ nullable: true })
  @Column({ default: "" })
  imageUrl: string;

  @Field({ nullable: true })
  @ManyToMany(() => Generation, (g) => g.projects, { nullable: true })
  @JoinTable()
  generation: Generation;

  @Field()
  @Column()
  isPublished!: boolean;

  @Field()
  @Column({ default: false })
  wasPublished!: boolean;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String, { nullable: true })
  @Column({ type: "timestamp without time zone", nullable: true })
  publishedAt?: Date;
}
