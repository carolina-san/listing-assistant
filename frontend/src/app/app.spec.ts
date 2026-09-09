import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App Component', () => {
  let fixture: ComponentFixture<App>;
  let component: App;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call the backend API correctly when submitting', async () => {
    // Intercept (spy) the browser's native fetch API to avoid real network requests
    const mockResponse = {
      title: 'Mocked Generated Title',
      tags: ['mock', 'test'],
      priceRange: '20€-30€'
    };

    const fetchSpy = spyOn(window, 'fetch').and.returnValue(
      Promise.resolve(new Response(JSON.stringify(mockResponse), {
        status: 200,
        headers: { 'Content-type': 'application/json' }
      }))
    );

    // Set a description and trigger the submission
    component.description = 'Test Item';
    await component.onSubmit();
    
    // 1. Verify fetch was actually called
    expect(fetchSpy).toHaveBeenCalled();
    
    // 2. Verify it was called with the correct URL and parameters
    const [url, requestInit] = fetchSpy.calls.mostRecent().args;
    expect(url).toBe('http://localhost:3000/api/generate-listing');
    expect(requestInit?.method).toBe('POST');
    
    const body = JSON.parse(requestInit?.body as string);
    expect(body.description).toBe('Test Item');

    // 3. Verify the component processed the mocked backend response correctly
    expect(component.listingTitle).toBe('Mocked Generated Title');
    expect(component.tags).toEqual(['mock', 'test']);
    expect(component.priceRange).toBe('20€-30€');
    expect(component.hasError).toBeFalse();
  });

  it('should handle broken backend responses and display error message', async () => {
    // Intercept fetch to return a broken response (missing fields)
    const brokenResponse = {
      title_wrong_key: 'Unknown',
      tags: 'not an array',
      priceRange: null
    };

    spyOn(window, 'fetch').and.returnValue(
      Promise.resolve(new Response(JSON.stringify(brokenResponse), {
        status: 200,
        headers: { 'Content-type': 'application/json' }
      }))
    );

    // Set description and submit
    component.description = 'Broken Item';
    await component.onSubmit();
    
    // Trigger Angular change detection to update the HTML DOM
    fixture.detectChanges();

    // 1. Verify component state is set to error
    expect(component.hasError).toBeTrue();
    expect(component.listingTitle).toBe('');

    // 2. Verify the HTML displays the expected error message
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Something went wrong, the AI could not process this request');
  });
});
