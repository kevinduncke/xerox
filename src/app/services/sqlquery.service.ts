import { Injectable } from '@angular/core';

/* XEROX SERVICES */
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root',
})
export class SqlqueryService {
  constructor(private databaseService: DatabaseService) {}

  // INSERT QUERY DATA TO DATABASE
  async insertData(surname: string, name: string): Promise<void> {
    // Check if the db object is available
    if (!this.databaseService['db']) {
      throw new Error('Database connection is not available.');
    }

    const query = 'INSERT INTO contacts (surname, name) VALUES (?, ?);';
    const params = [surname, name];

    try {
      // EXECUTE SQL INSERT QUERY
      await this.databaseService['db'].run(query, params);
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
}
