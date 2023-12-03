import { BeforeCreate, BeforeUpdate, Property } from "@mikro-orm/core";

export abstract class BaseEntity {
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
