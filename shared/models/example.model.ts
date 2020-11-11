import { PrimaryColumn, Column, OneToMany, Entity } from "typeorm";
import { v4 } from "uuid";

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
    if (!entity.id) entity.id = v4();
    return entity;
  }

  @PrimaryColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
}
