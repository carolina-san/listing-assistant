import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { generateListing } from '../api-service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');

  description: string = '';
  listingTitle: string = '';
  tags: string[] = [];
  priceRange: string = '';


  async onSubmit() {
    const response = await generateListing(this.description);
    this.listingTitle = response.title;
    this.tags = response.tags;
    this.priceRange = response.priceRange;
    console.log(this.listingTitle, this.tags, this.priceRange);
  }
}

