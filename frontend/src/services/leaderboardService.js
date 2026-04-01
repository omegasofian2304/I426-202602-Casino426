const API_URL = 'http://127.0.0.1:8000';

export async function getLeaderboard() {
    const response = await fetch(`${API_URL}/leaderboard`);

    if (!response.ok) {
        throw new Error('Impossible de récupérer le leaderboard');
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
        return [];
    }

    return data
}
const API_URL = 'http://127.0.0.1:8000';

export async function getLeaderboard() {
    try {
        const response = await fetch(`${API_URL}/leaderboard`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
            console.warn('La réponse n\'est pas un tableau:', data);
            return [];
        }

        return data;

    } catch (error) {
        if (error instanceof TypeError && error.message.includes('fetch')) {
            console.error('Impossible de contacter le serveur. Vérifiez que le backend tourne sur', API_URL);
        } else {
            console.error('Erreur getLeaderboard:', error.message);
        }
        throw error;
    }
}