import { v4 as uuidv4 } from 'uuid';
import { Permission } from './permission';

export class Group {
    id: string;
    name: string;
    permissions: Array<Permission>;

    constructor(name: string, permissions: Array<Permission>) {
        this.id = uuidv4();
        this.name = name;
        this.permissions = permissions;
    }
}
