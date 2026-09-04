import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { generateListing } from '../api-service';
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


  async onSubmit() {
    this.description = (document.getElementById('description') as HTMLInputElement).value;
    const response = await generateListing(this.description);
    this.listingTitle = response.title;
    this.tags = response.tags;
    this.priceRange = response.priceRange;
    console.log(this.listingTitle, this.tags, this.priceRange);
  }
}

