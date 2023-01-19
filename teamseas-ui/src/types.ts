export interface Donation {
    id? : string;
    count: number;
    displayName: string;
    message?: string;
    team?: string;
    createdAt?: Date;
}