import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  // IonItem,
  IonLabel,
  // IonInput,
  IonButton,
  IonFooter,
  IonGrid,
  IonCol,
  IonRow
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    // IonItem,
    IonLabel,
    // IonInput,
    IonButton,
    IonFooter,
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
    IonGrid,
    IonCol,
    IonRow
  ],
})
export class HomePage {
  constructor(private router: Router, private navCtrl: NavController) {}

  // METHOD TO NAVIGATE TO THE CONTACT PAGE
  navigateToContactPage() {
    this.navCtrl.navigateForward('/contacts', {
      animationDirection: 'forward',
    });
  }
}
