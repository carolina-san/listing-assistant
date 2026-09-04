import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');

  private description: string = '';
  private listingTitle: string = '';
  private tags: string[] = [];
  private priceRange: string = '';


  onSubmit() {
    this.description = (document.getElementById('description') as HTMLInputElement).value;
    console.log(this.description);
  }
}

