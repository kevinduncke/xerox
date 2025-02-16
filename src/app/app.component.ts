import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';

/* XEROX FILES & SERVICES */
import { Capacitor } from '@capacitor/core';
import { DatabaseService } from './services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonApp, IonRouterOutlet, FormsModule, RouterModule],
})
export class AppComponent {
  constructor(private database: DatabaseService) {
    if (!this.isSQLitePluginAvailable()) {
      console.error('Capacitor SQLite Plugin is not available.');
      alert('Capacitor SQLite Plugin is not available.');
      return;
    }
    this.initializeApp();
  }

  // SQLITE CAPACITOR PLUGIN | CHECKING
  private isSQLitePluginAvailable(): boolean {
    return Capacitor.isPluginAvailable('CapacitorSQLite');
  }

  // INITIALIZATION OF DATABASE
  async initializeApp() {
    try {
      // Initialize the database
      await this.database.initializeDatabase();
      console.log('Database initialized successfully!');
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }
}
