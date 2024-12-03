/* eslint-disable no-unused-vars */
export class EventEntity {
    constructor(
        public id: string,
        public userId: string,
        public name: string,
        public maxTotalAttenders: number,
        public price: number,
        public description: string,
        public details: Record<string, any>,
        public datetime: Date | string,
        public createdAt: Date | string | null = null,
    ) {}
}
