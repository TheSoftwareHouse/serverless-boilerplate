import { PrimaryColumn, Column, OneToMany, Entity } from "typeorm";
import { v4 } from "uuid";

interface MemberModelProps {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  slackId?: string;
}

@Entity({
  name: "member",
})
export class MemberModel {
  public static create(data: Partial<MemberModelProps>): MemberModel {
    const entity = new MemberModel();
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
