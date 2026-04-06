export declare const UserRole: {
    readonly USER: "USER";
    readonly TRAINER: "TRAINER";
    readonly ADMIN: "ADMIN";
};
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export declare const CourseStatus: {
    readonly DRAFT: "DRAFT";
    readonly PUBLISHED: "PUBLISHED";
};
export type CourseStatus = (typeof CourseStatus)[keyof typeof CourseStatus];
export declare const TrainerRequestStatus: {
    readonly PENDING: "PENDING";
    readonly APPROVED: "APPROVED";
    readonly REJECTED: "REJECTED";
};
export type TrainerRequestStatus = (typeof TrainerRequestStatus)[keyof typeof TrainerRequestStatus];
export declare const OrderStatus: {
    readonly PENDING: "PENDING";
    readonly COMPLETED: "COMPLETED";
    readonly CANCELLED: "CANCELLED";
};
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
//# sourceMappingURL=enums.d.ts.map