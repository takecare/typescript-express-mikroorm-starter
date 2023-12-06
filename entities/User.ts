import {
  BigIntType,
  Cascade,
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
  Unique,
} from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";
import { Post } from "./Post";

@Entity({ tableName: "users" })
export class User extends BaseEntity {
  @PrimaryKey({ type: BigIntType })
  id!: number;

  @Property()
  @Unique()
  username!: string;

  @Property()
  @Unique()
  email!: string;

  @Property()
  name?: string;

  @OneToMany(() => Post, (p) => p.author, { cascade: [Cascade.ALL] })
  posts = new Collection<Post>(this);
}
