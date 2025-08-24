import { Injectable } from '@angular/core';

/* XEROX SERVICES */
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root',
})
export class SqlqueryService {
  constructor(private databaseService: DatabaseService) {}

  async insertAllData(
    surname: string,
    name: string,
    born: any,
    father: any,
    mother: any,
    national_ids: any
  ): Promise<void> {
    // Check if the db object is available
    if (!this.databaseService['db']) {
      throw new Error('Database connection is not available.');
    }

    const mainQuery = 'INSERT INTO contacts (surname, name) VALUES (?, ?);';
    const mainParams = [surname, name];

    const bornQuery = `INSERT INTO born (
      city, department, state, country, birth_date, sex, dni, cuit
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;
    const bornParams = [
      born.city,
      born.department,
      born.state,
      born.country,
      born.birthDate,
      born.sex,
      born.dni,
      born.cuit,
    ];

    const parentsQuery = `INSERT INTO parents (
      type, surname, name, dni, cuit, nationality
    ) VALUES (?, ?, ?, ?, ?, ?);`;
    const fatherParams = [
      father.type,
      father.surname,
      father.name,
      father.dni,
      father.cuit,
      father.nationality,
    ];
    const motherParams = [
      mother.type,
      mother.surname,
      mother.name,
      mother.dni,
      mother.cuit,
      mother.nationality,
    ];

    const nationalIdsQuery = `INSERT INTO national_ids (
      surname, name, sex, nationality, type, birth_date, 
      issue_date, expiry_date, id_code, document_number,
      address, place_of_birth, cuil
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    const nationalIdsParams = [
      national_ids.surname,
      national_ids.name,
      national_ids.sex,
      national_ids.nationality,
      national_ids.type,
      national_ids.birthDate,
      national_ids.issueDate,
      national_ids.expiryDate,
      national_ids.idCode,
      national_ids.documentNumber,
      national_ids.address,
      national_ids.placeOfBirth,
      national_ids.cuil,
    ];

    try {
      // EXECUTE SQL INSERT QUERY
      // await this.databaseService['db'].run(query, params);
      await this.databaseService['db'].run(mainQuery, mainParams);
      await this.databaseService['db'].run(bornQuery, bornParams);
      await this.databaseService['db'].run(parentsQuery, fatherParams);
      await this.databaseService['db'].run(parentsQuery, motherParams);
      await this.databaseService['db'].run(nationalIdsQuery, nationalIdsParams);
      console.log('SQL INSERT Query executed in database successfully.');
    } catch (error) {
      console.error('Failed to INSERT data: ', error);
      throw new Error('Failed to INSERT data.');
    }
  }

  // SELECT QUERY DATA FROM DATABASE
  async selectData(): Promise<
    Array<{ id: number; surname: string; name: string }>
  > {
    // Check if the db object is available
    if (!this.databaseService['db']) {
      throw new Error('Database connection is not available.');
    }

    const query = 'SELECT id, surname, name FROM contacts;';

    try {
      // EXECUTE SQL SELECT QUERY
      const result = await this.databaseService['db'].query(query);
      console.log('SQL SELECT Query executed in database successfully.');

      // RETURN ARRAY OF OBJECT DATA OR EMPTY ARRAY
      return result.values || [];
    } catch (error) {
      console.error('Failed to SELECT data: ', error);
      throw new Error('Failed to SELECT data.');
    }
  }

  // DELETE QUERY DATA TO DATABASE
  async deleteData(id: number): Promise<void> {
    // VALIDATE INPUT PARAMETER
    if (!id || isNaN(Number(id))) {
      console.error(`Invalid id provided: ${id}, type is ${typeof id}.`);
      throw new Error('Invalid id provided.');
    }

    // Check if the db object is available
    if (!this.databaseService._db) {
      throw new Error('Database connection is not available.');
    }

    const query = 'DELETE FROM contacts WHERE id = ?';
    const params = [id];

    try {
      // EXECUTE SQL DELETE QUERY
      const result = await this.databaseService._db.run(query, params);
      console.log('SQL DELETE Query executed in database successfully.');
      console.log(`Deleted ${result.changes?.changes} row(s).`);
    } catch (error) {
      console.error(`Failed to DELETE data with id ${id}: `, error);
      throw new Error('Failed to DELETE data.');
    }
  }

  // GET SPECIFIC CONTACT DETAILS
  async contactDetails(id: number): Promise<any> {
    // Check if the db object is available
    if (!this.databaseService['db']) {
      throw new Error('Database connection is not available.');
    }

    const query = 'SELECT id, surname, name FROM contacts WHERE id = ?;';
    const params = [id];


    try {
      // EXECUTE SQL SELECT QUERY
      const result = await this.databaseService['db'].query(query, params);
      console.log('SQL SELECT Query executed in database successfully.');

      // RETURN ARRAY OF OBJECT DATA OR EMPTY ARRAY
      return result.values || [];
    } catch (error) {
      console.error('Failed to SELECT data: ', error);
      throw new Error('Failed to SELECT data.');
    }
  }

  async bornDetails(id: number): Promise<any> {
    // Check if the db object is available
    if (!this.databaseService['db']) {
      throw new Error('Database connection is not available.');
    }    

    const queryBorn = 'SELECT id, city, department, state, country, birth_date, sex, dni, cuit FROM born WHERE id = ?;';
    const paramsBorn = [id];
    
    try {
      // EXECUTE SQL SELECT QUERY
      const resultBorn = await this.databaseService['db'].query(queryBorn, paramsBorn);
      console.log('SQL SELECT Query executed in database successfully.');

      // RETURN ARRAY OF OBJECT DATA OR EMPTY ARRAY
      return resultBorn.values || [];      
    } catch (error) {
      console.error('Failed to SELECT data: ', error);
      throw new Error('Failed to SELECT data.');
    }
  }
}
