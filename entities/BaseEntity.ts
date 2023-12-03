import { Entity, Property, BeforeCreate, BeforeUpdate } from "@mikro-orm/core";

// @Entity()
export abstract class BaseEntity {
  // @PrimaryKey()
  // id: string = v4();

  @Property({ type: "date", onUpdate: () => new Date() })
  createdAt: Date = new Date();

  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @BeforeCreate()
  beforeCreate() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  beforeUpdate() {
    this.updatedAt = new Date();
  }
}
