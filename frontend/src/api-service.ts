const API_URL = '/api/generate-listing';

export const generateListing = async (description: string) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description }),
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