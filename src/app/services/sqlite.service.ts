import { Injectable } from '@angular/core';
import {
  SQLiteConnection,
  CapacitorSQLite,
  SQLiteDBConnection,
} from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root',
})
export class SqliteService {
  private db!: SQLiteDBConnection;

  constructor() {}

  // INITIALIZE THE SQLITE DATABASE
  async initializeDatabase(): Promise<void> {
    const sqlite = new SQLiteConnection(CapacitorSQLite);

    // CREATE OR OPEN DATABASE
    this.db = await sqlite.createConnection(
      'contacts_db',
      false, // Set to `true` if you want to delete the database if it already exists
      'no-encryption', // Encryption option
      1, // Database version
      false // Set to `true` for read-only mode
    );

    // OPEN THE DATABASE
    await this.db.open();

    // CREATE THE CONTACTS TABLE
    await this.createTable();
  }

  // CREATE THE CONTACTS TABLE
  async createTable(): Promise<void> {
    const query = `
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        surname TEXT NOT NULL,
        name TEXT NOT NULL
      );
    `;

    await this.db.execute(query);
  }

  // ADD A NEW CONTACT
  async addContact(surname: string, name: string) {
    const query = 'INSERT INTO contacts (surname, name) VALUES (?, ?)';
    const params = [surname, name];
    await this.db.run(query, params);
  }

  // GET ALL CONTACTS
  async getContacts(): Promise<any[]> {
    const query = 'SELECT * FROM contacts';
    const result = await this.db.query(query);
    return result.values || [];
  }
}
