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
export class Article extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ type: "text" })
  body!: string;
}

@ObjectType()
@Entity()
export class Project extends Article {
  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  description!: string;

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
  @Column({ type: "timestamp", nullable: true })
  publishedAt?: Date;
}
