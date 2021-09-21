import { ObjectType, Field } from "type-graphql";
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class ProjectImage extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  imageName!: string;

  @Column()
  projectId!: number;
}
