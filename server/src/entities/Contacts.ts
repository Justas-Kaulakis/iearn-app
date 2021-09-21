import { ObjectType, Field } from "type-graphql";
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
@ObjectType()
export class Contacts extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field({ nullable: true })
  @Column({ default: "", nullable: true })
  contact!: string;
}
