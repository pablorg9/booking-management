/* eslint-disable no-unused-vars */
export class User {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public password: string,
        public phone: string,
        public createdAt: Date | string | null = null,
    ) {}
}
