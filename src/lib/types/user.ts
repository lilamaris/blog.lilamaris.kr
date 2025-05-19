import type { Post } from "./post";

export interface User {
    id: number;
    email: string;
    name: string;
    posts: Post[];
}
