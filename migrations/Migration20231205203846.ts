import { Migration } from '@mikro-orm/migrations';

export class Migration20231205203846 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "users" ("id" bigserial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "username" varchar(255) not null, "email" varchar(255) not null, "name" varchar(255) null);');
    this.addSql('alter table "users" add constraint "users_username_unique" unique ("username");');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');

    this.addSql('create table "posts" ("id" bigserial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "author_id" bigint not null, "title" varchar(255) not null, "contents" varchar(255) not null);');

    this.addSql('alter table "posts" add constraint "posts_author_id_foreign" foreign key ("author_id") references "users" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "posts" drop constraint "posts_author_id_foreign";');

    this.addSql('drop table if exists "users" cascade;');

    this.addSql('drop table if exists "posts" cascade;');
  }

}
