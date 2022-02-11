import { ObjectType, Field } from "type-graphql";
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class About extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ type: "text" })
  content!: string;

  @Field()
  @Column()
  imageUrl!: string;
}
