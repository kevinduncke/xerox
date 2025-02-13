import { Injectable } from '@angular/core';
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  // PRIVATE SQL DATABASE
  private db: SQLiteDBConnection | null = null;

  constructor() {
    this.initializeDatabase();
  }

  // INITIALIZE THE CONTACTS DATABASE
  async initializeDatabase() {
    try {
      // CREATE CONNECTION TO DATABASE
      const sqliteConnection = new SQLiteConnection(CapacitorSQLite);
      this.db = await sqliteConnection.createConnection(
        'contacts_db',
        false,
        'no-encryption',
        1,
        false
      );

      // OPEN DATABASE
      await this.db.open();

      // CREATE CONTACTS TABLE
      await this.db.execute(`
        CREATE TABLE IF NOT EXISTS contacts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          phone TEXT NOT NULL
        );
      `);
      console.log('Database initialized and table created.');
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }

  // ADD A CONTACT
  async addContact(name: string, phone: string) {
    if (!this.db) {
      console.error('Database not initialized.');
      return;
    }

    await this.db.run(`INSERT INTO contacts (name, phone) VALUES (?, ?)`, [
      name,
      phone,
    ]);
    console.log('Contact added successfully to database.');
  }

  // GET ALL CONTACTS
  async getContacts() {
    if (!this.db) {
      console.error('Database not initialized.');
      return [];
    }

    const result = await this.db.query('SELECT * FROM contacts');
    return result.values || [];
  }

  // DELETE A CONTACT BY ID
  async deleteContact(id: number) {
    if (!this.db) {
      console.error('Database not initialized.');
      return false;
    }

    await this.db.run('DELETE FROM contacts WHERE id = ?', [id]);
    console.log('Contact deleted successfully from database.');
    return true;
  }
}
