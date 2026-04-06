export interface PaginationParams {
    page: number;
    limit: number;
    skip: number;
}
export declare function parsePagination(query: {
    page?: string;
    limit?: string;
}): PaginationParams;
export declare function paginatedResponse<T>(data: T[], total: number, page: number, limit: number): {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
};
//# sourceMappingURL=pagination.d.ts.map