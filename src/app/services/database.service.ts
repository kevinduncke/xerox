import { Injectable } from '@angular/core';

/* XEROX SERVICES */
import {
  SQLiteConnection,
  CapacitorSQLite,
  SQLiteDBConnection,
} from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  // DATABASE CONFIG CONSTANTS
  private db!: SQLiteDBConnection;
  private readonly DB_NAME = 'contacts_db';
  private readonly DB_ENCRYPTION = 'no-encryption';
  private readonly DB_VERSION = 1;
  private readonly DB_READ_ONLY = false;

  // TRACK INITIALIZATION STATUS
  private isDatabaseInitialized = false;
  private initializationPromise: Promise<void> | null = null;

  constructor() {}

  // SQLITE CAPACITOR PLUGIN | CHECKING
  private isSQLitePluginAvailable(): boolean {
    return Capacitor.isPluginAvailable('CapacitorSQLite');
  }

  // DATABASE INITIALIZATION
  async initializeDatabase(): Promise<void> {
    // CHECK IF DATABASE IS ALREADY INITIALIZED
    if (this.isDatabaseInitialized) {
      return;
    }
    if (!this.initializationPromise) {
      this.initializationPromise = (async () => {
        if (!this.isSQLitePluginAvailable()) {
          throw new Error('Capacitor SQLite Plugin is not available.');
        }
        try {
          await this.setupDatabaseConnection();
          await this.createDatabaseTable();
          this.isDatabaseInitialized = true;
          console.log('Database initialized successfully.');
        } catch (error) {
          console.error('Failed initializing database: ', error);
          throw new Error('Failed to initialize database');
        }
      })();
    }

    return this.initializationPromise;
  }

  // WAIT FOR DATABASE INITIALIZATION
  async waitForInitialization(): Promise<void> {
    if (this.isDatabaseInitialized) {
      return;
    }
    if (!this.initializationPromise) {
      throw new Error('Database initialization has no started');
    }

    return this.initializationPromise;
  }

  // DATABASE CONNECTION
  private async setupDatabaseConnection(): Promise<void> {
    const sqlite = new SQLiteConnection(CapacitorSQLite);
    this.db = await sqlite.createConnection(
      this.DB_NAME,
      false,
      this.DB_ENCRYPTION,
      this.DB_VERSION,
      this.DB_READ_ONLY
    );

    await this.db.open();
    console.log('Database connection established:', this.db);
  }

  // DATABASE TABLE
  private async createDatabaseTable(): Promise<void> {
    const query = `
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        surname TEXT NOT NULL,
        name TEXT NOT NULL
      );
    `;
    const BORN_TABLE = `
      CREATE TABLE IF NOT EXISTS born (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        city TEXT NOT NULL,
        department TEXT NOT NULL,
        state TEXT NOT NULL,
        country TEXT NOT NULL,
        birth_date TEXT NOT NULL,
        sex TEXT NOT NULL,
        dni TEXT NOT NULL,
        cuit TEXT NOT NULL
      );
    `;
    const PARENTS_TABLE = `
      CREATE TABLE IF NOT EXISTS parents (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL,
        surname TEXT NOT NULL,
        name TEXT NOT NULL,
        dni TEXT NOT NULL,
        cuit TEXT NOT NULL,
        nationality TEXT NOT NULL
      );
    `;    
    const NATIONAL_IDS_TABLE = `
      CREATE TABLE IF NOT EXISTS national_ids (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        surname TEXT NOT NULL,
        name TEXT NOT NULL,
        sex TEXT NOT NULL,
        nationality TEXT NOT NULL,
        type TEXT NOT NULL,
        birth_date TEXT NOT NULL,
        issue_date TEXT NOT NULL,
        expiry_date TEXT NOT NULL,
        id_code TEXT NOT NULL,
        document_number TEXT NOT NULL,
        address TEXT NOT NULL,
        place_of_birth TEXT NOT NULL,
        cuil TEXT NOT NULL
      );
    `;    

    try {
      await this.db.execute(query);
      await this.db.execute(BORN_TABLE);
      await this.db.execute(PARENTS_TABLE);
      await this.db.execute(NATIONAL_IDS_TABLE);
    } catch (error) {
      console.error('Failed to create contacts table', error);
      throw new Error('Failed to create contacts table');
    }
  }

  // CLOSE DATABASE
  async closeDatabase(): Promise<void> {
    if (this.db) {
      try {
        await this.db.close();
        this.isDatabaseInitialized = false;
        this.initializationPromise = null;
      } catch (error) {
        console.error('Error closing database: ', error);
        throw new Error('Failed to close database');
      }
    }
  }

  // RETURNS THE DB INSTANCE
  get _db(): SQLiteDBConnection {
    if (!this.isDatabaseInitialized) {
      throw new Error('Database is not initialized.');
    }
    return this.db;
  }
}
