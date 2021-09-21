import { ObjectType, Field } from "type-graphql";
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
@ObjectType()
export class SocialLinks extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field({ nullable: true })
  @Column({ default: "", nullable: true })
  instagram!: string;

  @Field({ nullable: true })
  @Column({ default: "", nullable: true })
  facebook!: string;

  @Field({ nullable: true })
  @Column({ default: "", nullable: true })
  youtube!: string;

  @Field({ nullable: true })
  @Column({ default: "", nullable: true })
  iearnGlobal!: string;
}
