// Contact Entity Class
// Justin Tromp
// Data model for contact entity with database associations.
// Note: id, dateCreated, and dateUpdated are automatically handled within the database.

import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "contacts" })
export class Contact extends BaseEntity {
    @PrimaryGeneratedColumn()
    private id: string;

    @Column({ name: "date_created" })
    private dateCreated: string;

    @Column({ name: "date_updated" })
    private dateUpdated: string;

    @Column({ name: "first_name" })
    private firstName: string;

    @Column({ name: "last_name" })
    private lastName: string;

    @Column({ name: "email_address" })
    private emailAddress: string;
}
