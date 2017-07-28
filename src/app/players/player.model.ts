export class Player {
    public firstName: string;
    public lastName: string;
    public email: string;
    public gender: string;
    public rank: number;

    constructor(firstName: string, lastName: string, email: string, gender: string, rank: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.gender = gender;
        this.rank = rank;

    }
}
