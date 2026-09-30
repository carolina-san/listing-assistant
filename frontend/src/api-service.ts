const API_URL = 'http://localhost:3000/api/generate-listing';

export const generateListing = async (description: string, language: string) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description, language }),
        });

        if (!response.ok) {
            throw new Error('Error generating listing');
        }

        return await response.json();

    } catch (error) {
        console.error('Error generating listing:', error);
        throw error;
    }
}