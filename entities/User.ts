import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class User extends BaseEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  username!: string;

  @Property()
  email!: string;
}
