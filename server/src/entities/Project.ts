import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

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
