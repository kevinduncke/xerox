import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { RouterModule, Routes } from '@angular/router';

/* XEROX FILES & SERVICES */
import { SqliteService } from './services/sqlite.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonApp, IonRouterOutlet, FormsModule, RouterModule],
})
export class AppComponent {
  constructor(private SqliteService: SqliteService) {
    this.initializeApp();
  }

  // INITIALIZATION OF DATABASE
  async initializeApp() {
    try {
      await this.SqliteService.initializeDatabase(); // Initialize the database
      console.log('Database initialized successfully!');
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }
}
