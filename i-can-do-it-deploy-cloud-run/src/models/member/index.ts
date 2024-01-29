export class Member {
    constructor(
        public name: string,
        public picUrl: string,
        public quote: string,
        public socials: {
            instagram: string;
            email: string;
        }
    ) {}
}
