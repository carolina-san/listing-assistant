import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { generateListing } from '../api-service';
import { CommonModule } from '@angular/common';
import { LucideCopy, LucideTag, LucideCircleDollarSign, LucidePencilSparkles, LucideSearch } from '@lucide/angular';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule, LucideCopy, LucideTag, LucideCircleDollarSign, LucidePencilSparkles, LucideSearch],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');

  description: string = '';
  listingTitle: string = '';
  tags: string[] = [];
  priceRange: string = '';

  isLoading: boolean = false;
  hasError: boolean = false;
  copiedType: string | null = null;
  copyTimeout: any;

  async onSubmit() {
    if (!this.description.trim()) return;

    this.isLoading = true;
    this.listingTitle = '';
    this.hasError = false;

    try {
      const response = await generateListing(this.description);
      
      if (!response || !response.title || !response.priceRange || !Array.isArray(response.tags)) {
        this.hasError = true;
        return;
      }
      
      this.listingTitle = response.title;
      this.tags = response.tags;
      this.priceRange = response.priceRange;

      console.log('Processed response:', this.listingTitle, this.tags, this.priceRange);
    } catch (err) {
      console.error('Error fetching listing:', err);
      this.hasError = true;
    } finally {
      this.isLoading = false;
    }
  }

  async copyToClipboard(text: string, type: string) {
    try {
      await navigator.clipboard.writeText(text);
      this.copiedType = type;
      if (this.copyTimeout) clearTimeout(this.copyTimeout);
      this.copyTimeout = setTimeout(() => {
        this.copiedType = null;
      }, 500);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  }
}

