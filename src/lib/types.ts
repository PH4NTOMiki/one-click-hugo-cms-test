export interface Nominee {
	id: string;
	name: string;
	workplace: string | null;
	city: string | null;
	approved: boolean;
	is_winner: boolean;
	created_at: string;
	vote_count?: number;
}

export interface Story {
	id: string;
	nurse_name: string;
	workplace: string | null;
	city: string | null;
	author_name: string | null;
	author_email: string | null;
	message: string;
	status: 'pending' | 'approved' | 'rejected';
	is_winner: boolean;
	created_at: string;
}
