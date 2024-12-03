export interface IEventDTO {
    id?: string;
    userId: string;
    name: string;
    maxTotalAttenders: number;
    price: number;
    description: string;
    details: Record<string, any>;
    datetime: string;
}
