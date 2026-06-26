export interface PreOrderBody{
    name: string;
    products: number;
    preOrderWhen: 'regardless-of-stock' | 'out-of-stock';
    startsAt: string;
    endsAt: string | null;
    status: 'active' | "inactive";
}