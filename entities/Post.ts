import {
  BigIntType,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

@Entity({ tableName: "posts" })
export class Post extends BaseEntity {
  @PrimaryKey({ type: BigIntType })
  id!: number;

  @ManyToOne()
  author!: User;

  @Property()
  title!: string;

  @Property()
  contents!: string;
}
