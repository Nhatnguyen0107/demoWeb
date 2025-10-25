import type { Pagination } from "./common";

export type Room = {
    id?: string;
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
    image_url?: string[]; // backend trả về mảng
    category_id?: string;
    category?: {
        id: string;
        name: string;
    };
    city?: {
        id: string;
        name: string;
    };
};

export interface RoomResDto {
    data: Room[];
    pagination: Pagination;
}

export type GetAllRoomParams = {
    page?: number;
    pageSize?: number;
    search?: string;
    sortField?: string;
    sortOrder?: string;
};
