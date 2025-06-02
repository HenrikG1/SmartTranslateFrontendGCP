import { TranslatorComponentComponent } from "./translator-component/translator-component.component";
import { FavoritesComponentComponent } from "./favorites-component/favorites-component.component";
import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { favorite } from "./models/favorite";
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [TranslatorComponentComponent, FavoritesComponentComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'SmartTranslateFrontend';
  selectedFavoriteText: favorite = { id: '', text: '', sourceLanguage: '', languageKey: '' };
  favoriteToAdd: favorite = { id: '', text: '', sourceLanguage: '', languageKey: '' };
  isAuthenticated = false;

  constructor(private authService: AuthService) {}

  onAddFavorite(favorite: favorite): void {
    this.favoriteToAdd = { ...favorite }; // Triggert das Input-Binding
  }

  onFavoriteSelected(favorite: favorite): void {
    this.selectedFavoriteText = favorite;
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  login(): void {
    this.authService.loginWithGoogle();
  }

  logout(): void {
    this.authService.logout();
  }
}
