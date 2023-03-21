import { PrimaryColumn, Column, Entity } from "typeorm";
import { randomUUID } from "crypto";

interface ExampleModelProps {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

@Entity({
  name: "example-model",
})
export class ExampleModel {
  public static create(data: Partial<ExampleModelProps>): ExampleModel {
    const entity = new ExampleModel();
    Object.assign(entity, data);
    if (!entity.id) entity.id = randomUUID();
    return entity;
  }

  @PrimaryColumn()
  id!: string;

  @Column()
  email!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;
}
