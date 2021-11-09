import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from "typeorm";
import { GenerationImage } from "./GenerationImage";
import { Project } from "./Project";

@ObjectType()
@Entity()
export class Generation extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  description!: string;

  @Field(() => [GenerationImage], { nullable: true })
  @OneToMany(() => GenerationImage, (img) => img.generation, { cascade: true })
  images: GenerationImage[];

  @Field(() => [Project], { nullable: true })
  @ManyToMany(() => Project, (p) => p.generation, { nullable: true })
  projects: Project[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
