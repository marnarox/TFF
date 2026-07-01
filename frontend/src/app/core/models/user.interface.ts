import { UserRole } from "@core/enums/user-role.enum";

export interface UsersData {
    email: string;
    nickname: string;
    password: string;
    role: UserRole;
}
