// ContactController
// Justin Tromp
// Controller of contact entity endpoints and db access
// TODO: - Consider refactoring code into separate repositories in addition to controller methods to account for scaling
//       - Implement more comprehensive error checking and look into global error catches instead of try/catch blocks

import {Body, Delete, Get, JsonController, Param, Post, Put, Res} from "routing-controllers";
import {Response} from "express";
import {getConnection} from 'typeorm';
import {Contact} from "../entity/Contact";

@JsonController()
export class ContactController {
    readonly entityManager = getConnection().manager;
    readonly connection = getConnection();

    // Get all
    @Get("/contacts")
    public async getAll() {
        return await this.entityManager.find(Contact);
    }

    // Get one by id
    @Get("/contacts/:id")
    public async getOne(@Param("id") id: string, @Res() res: Response) {
        const contact = await this.entityManager.findOne(Contact, id);

        // If no entity is found to update, send 404
        if (contact == undefined) {
            return res.status(404).send(JSON.stringify({ Error: 'Entity not found' }));
        }

        return res.status(200).send(contact);
    }

    // Add one
    @Post("/contacts")
    public async post(@Body() contact: Contact, @Res() res: Response) {
        return this.connection.getRepository(Contact).create(contact).save();
    }

    // Update one by id
    @Put("/contacts/:id")
    public async put(@Param("id") id: number, @Body() contact: any, @Res() res: Response) {
        const dbContact = await this.entityManager.findOne(Contact, id);

        // If no entity is found to update, send 404
        if (dbContact == undefined) {
            return res.status(404).send(JSON.stringify({ Error: 'Entity not found' }));
        }

        const updatedContact = await this.connection.getRepository(Contact).merge(dbContact, contact);

        const result = await this.entityManager.update(Contact, id, updatedContact);

        if (result.affected == 1) {
            const newContact = await this.entityManager.findOne(Contact, id);

            return res.status(200).send(newContact);
        }
        else {
            return res.status(400).send(JSON.stringify({ Error: 'Entity not updated' }));
        }
    }

    // Delete one by id
    @Delete("/contacts/:id")
    public async remove(@Param("id") id: number, @Res() res: Response) {
        // Try to delete entity
        try {
            const result = await this.entityManager.delete(Contact, id);

            // If no entity is deleted, send 404
            if (result.affected == 0) {
                return res.status(404).send(JSON.stringify({ Error: 'Entity not found' }));
            }

            return res.status(204).send;
        } catch (error) {
            return res.status(400).send(JSON.stringify({ Error: '' }));
        };
    }
}
