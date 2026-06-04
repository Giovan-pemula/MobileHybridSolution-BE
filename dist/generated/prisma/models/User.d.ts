import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model User
 *
 */
export type UserModel = runtime.Types.Result.DefaultSelection<Prisma.$UserPayload>;
export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _avg: UserAvgAggregateOutputType | null;
    _sum: UserSumAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
export type UserAvgAggregateOutputType = {
    id: number | null;
};
export type UserSumAggregateOutputType = {
    id: number | null;
};
export type UserMinAggregateOutputType = {
    id: number | null;
    name: string | null;
    email: string | null;
    password: string | null;
    role: $Enums.UserRole | null;
    avatar: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserMaxAggregateOutputType = {
    id: number | null;
    name: string | null;
    email: string | null;
    password: string | null;
    role: $Enums.UserRole | null;
    avatar: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserCountAggregateOutputType = {
    id: number;
    name: number;
    email: number;
    password: number;
    role: number;
    avatar: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type UserAvgAggregateInputType = {
    id?: true;
};
export type UserSumAggregateInputType = {
    id?: true;
};
export type UserMinAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    password?: true;
    role?: true;
    avatar?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserMaxAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    password?: true;
    role?: true;
    avatar?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserCountAggregateInputType = {
    id?: true;
    name?: true;
    email?: true;
    password?: true;
    role?: true;
    avatar?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type UserAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType;
};
export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUser[P]> : Prisma.GetScalarType<T[P], AggregateUser[P]>;
};
export type UserGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithAggregationInput | Prisma.UserOrderByWithAggregationInput[];
    by: Prisma.UserScalarFieldEnum[] | Prisma.UserScalarFieldEnum;
    having?: Prisma.UserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCountAggregateInputType | true;
    _avg?: UserAvgAggregateInputType;
    _sum?: UserSumAggregateInputType;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
};
export type UserGroupByOutputType = {
    id: number;
    name: string;
    email: string;
    password: string;
    role: $Enums.UserRole;
    avatar: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: UserCountAggregateOutputType | null;
    _avg: UserAvgAggregateOutputType | null;
    _sum: UserSumAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
export type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]>;
}>>;
export type UserWhereInput = {
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    id?: Prisma.IntFilter<"User"> | number;
    name?: Prisma.StringFilter<"User"> | string;
    email?: Prisma.StringFilter<"User"> | string;
    password?: Prisma.StringFilter<"User"> | string;
    role?: Prisma.EnumUserRoleFilter<"User"> | $Enums.UserRole;
    avatar?: Prisma.StringNullableFilter<"User"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    courses?: Prisma.CourseListRelationFilter;
    enrollments?: Prisma.EnrollmentListRelationFilter;
    ratings?: Prisma.RatingListRelationFilter;
    wishlists?: Prisma.WishlistListRelationFilter;
    discussions?: Prisma.DiscussionListRelationFilter;
    replies?: Prisma.ReplyListRelationFilter;
    orders?: Prisma.OrderListRelationFilter;
    trainerRequest?: Prisma.XOR<Prisma.TrainerRequestNullableScalarRelationFilter, Prisma.TrainerRequestWhereInput> | null;
    lessonCompletions?: Prisma.LessonCompletionListRelationFilter;
    userXp?: Prisma.XOR<Prisma.UserXpNullableScalarRelationFilter, Prisma.UserXpWhereInput> | null;
    xpHistory?: Prisma.XpHistoryListRelationFilter;
    loginStreak?: Prisma.XOR<Prisma.UserLoginStreakNullableScalarRelationFilter, Prisma.UserLoginStreakWhereInput> | null;
    coupons?: Prisma.CouponListRelationFilter;
};
export type UserOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    avatar?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    courses?: Prisma.CourseOrderByRelationAggregateInput;
    enrollments?: Prisma.EnrollmentOrderByRelationAggregateInput;
    ratings?: Prisma.RatingOrderByRelationAggregateInput;
    wishlists?: Prisma.WishlistOrderByRelationAggregateInput;
    discussions?: Prisma.DiscussionOrderByRelationAggregateInput;
    replies?: Prisma.ReplyOrderByRelationAggregateInput;
    orders?: Prisma.OrderOrderByRelationAggregateInput;
    trainerRequest?: Prisma.TrainerRequestOrderByWithRelationInput;
    lessonCompletions?: Prisma.LessonCompletionOrderByRelationAggregateInput;
    userXp?: Prisma.UserXpOrderByWithRelationInput;
    xpHistory?: Prisma.XpHistoryOrderByRelationAggregateInput;
    loginStreak?: Prisma.UserLoginStreakOrderByWithRelationInput;
    coupons?: Prisma.CouponOrderByRelationAggregateInput;
};
export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    email?: string;
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    name?: Prisma.StringFilter<"User"> | string;
    password?: Prisma.StringFilter<"User"> | string;
    role?: Prisma.EnumUserRoleFilter<"User"> | $Enums.UserRole;
    avatar?: Prisma.StringNullableFilter<"User"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    courses?: Prisma.CourseListRelationFilter;
    enrollments?: Prisma.EnrollmentListRelationFilter;
    ratings?: Prisma.RatingListRelationFilter;
    wishlists?: Prisma.WishlistListRelationFilter;
    discussions?: Prisma.DiscussionListRelationFilter;
    replies?: Prisma.ReplyListRelationFilter;
    orders?: Prisma.OrderListRelationFilter;
    trainerRequest?: Prisma.XOR<Prisma.TrainerRequestNullableScalarRelationFilter, Prisma.TrainerRequestWhereInput> | null;
    lessonCompletions?: Prisma.LessonCompletionListRelationFilter;
    userXp?: Prisma.XOR<Prisma.UserXpNullableScalarRelationFilter, Prisma.UserXpWhereInput> | null;
    xpHistory?: Prisma.XpHistoryListRelationFilter;
    loginStreak?: Prisma.XOR<Prisma.UserLoginStreakNullableScalarRelationFilter, Prisma.UserLoginStreakWhereInput> | null;
    coupons?: Prisma.CouponListRelationFilter;
}, "id" | "email">;
export type UserOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    avatar?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.UserCountOrderByAggregateInput;
    _avg?: Prisma.UserAvgOrderByAggregateInput;
    _max?: Prisma.UserMaxOrderByAggregateInput;
    _min?: Prisma.UserMinOrderByAggregateInput;
    _sum?: Prisma.UserSumOrderByAggregateInput;
};
export type UserScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"User"> | number;
    name?: Prisma.StringWithAggregatesFilter<"User"> | string;
    email?: Prisma.StringWithAggregatesFilter<"User"> | string;
    password?: Prisma.StringWithAggregatesFilter<"User"> | string;
    role?: Prisma.EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole;
    avatar?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
};
export type UserCreateInput = {
    name: string;
    email: string;
    password: string;
    role?: $Enums.UserRole;
    avatar?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    courses?: Prisma.CourseCreateNestedManyWithoutTrainerInput;
    enrollments?: Prisma.EnrollmentCreateNestedManyWithoutUserInput;
    ratings?: Prisma.RatingCreateNestedManyWithoutUserInput;
    wishlists?: Prisma.WishlistCreateNestedManyWithoutUserInput;
    discussions?: Prisma.DiscussionCreateNestedManyWithoutUserInput;
    replies?: Prisma.ReplyCreateNestedManyWithoutUserInput;
    orders?: Prisma.OrderCreateNestedManyWithoutUserInput;
    trainerRequest?: Prisma.TrainerRequestCreateNestedOneWithoutUserInput;
    lessonCompletions?: Prisma.LessonCompletionCreateNestedManyWithoutUserInput;
    userXp?: Prisma.UserXpCreateNestedOneWithoutUserInput;
    xpHistory?: Prisma.XpHistoryCreateNestedManyWithoutUserInput;
    loginStreak?: Prisma.UserLoginStreakCreateNestedOneWithoutUserInput;
    coupons?: Prisma.CouponCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateInput = {
    id?: number;
    name: string;
    email: string;
    password: string;
    role?: $Enums.UserRole;
    avatar?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    courses?: Prisma.CourseUncheckedCreateNestedManyWithoutTrainerInput;
    enrollments?: Prisma.EnrollmentUncheckedCreateNestedManyWithoutUserInput;
    ratings?: Prisma.RatingUncheckedCreateNestedManyWithoutUserInput;
    wishlists?: Prisma.WishlistUncheckedCreateNestedManyWithoutUserInput;
    discussions?: Prisma.DiscussionUncheckedCreateNestedManyWithoutUserInput;
    replies?: Prisma.ReplyUncheckedCreateNestedManyWithoutUserInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutUserInput;
    trainerRequest?: Prisma.TrainerRequestUncheckedCreateNestedOneWithoutUserInput;
    lessonCompletions?: Prisma.LessonCompletionUncheckedCreateNestedManyWithoutUserInput;
    userXp?: Prisma.UserXpUncheckedCreateNestedOneWithoutUserInput;
    xpHistory?: Prisma.XpHistoryUncheckedCreateNestedManyWithoutUserInput;
    loginStreak?: Prisma.UserLoginStreakUncheckedCreateNestedOneWithoutUserInput;
    coupons?: Prisma.CouponUncheckedCreateNestedManyWithoutUserInput;
};
export type UserUpdateInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    courses?: Prisma.CourseUpdateManyWithoutTrainerNestedInput;
    enrollments?: Prisma.EnrollmentUpdateManyWithoutUserNestedInput;
    ratings?: Prisma.RatingUpdateManyWithoutUserNestedInput;
    wishlists?: Prisma.WishlistUpdateManyWithoutUserNestedInput;
    discussions?: Prisma.DiscussionUpdateManyWithoutUserNestedInput;
    replies?: Prisma.ReplyUpdateManyWithoutUserNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutUserNestedInput;
    trainerRequest?: Prisma.TrainerRequestUpdateOneWithoutUserNestedInput;
    lessonCompletions?: Prisma.LessonCompletionUpdateManyWithoutUserNestedInput;
    userXp?: Prisma.UserXpUpdateOneWithoutUserNestedInput;
    xpHistory?: Prisma.XpHistoryUpdateManyWithoutUserNestedInput;
    loginStreak?: Prisma.UserLoginStreakUpdateOneWithoutUserNestedInput;
    coupons?: Prisma.CouponUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    courses?: Prisma.CourseUncheckedUpdateManyWithoutTrainerNestedInput;
    enrollments?: Prisma.EnrollmentUncheckedUpdateManyWithoutUserNestedInput;
    ratings?: Prisma.RatingUncheckedUpdateManyWithoutUserNestedInput;
    wishlists?: Prisma.WishlistUncheckedUpdateManyWithoutUserNestedInput;
    discussions?: Prisma.DiscussionUncheckedUpdateManyWithoutUserNestedInput;
    replies?: Prisma.ReplyUncheckedUpdateManyWithoutUserNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutUserNestedInput;
    trainerRequest?: Prisma.TrainerRequestUncheckedUpdateOneWithoutUserNestedInput;
    lessonCompletions?: Prisma.LessonCompletionUncheckedUpdateManyWithoutUserNestedInput;
    userXp?: Prisma.UserXpUncheckedUpdateOneWithoutUserNestedInput;
    xpHistory?: Prisma.XpHistoryUncheckedUpdateManyWithoutUserNestedInput;
    loginStreak?: Prisma.UserLoginStreakUncheckedUpdateOneWithoutUserNestedInput;
    coupons?: Prisma.CouponUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateManyInput = {
    id?: number;
    name: string;
    email: string;
    password: string;
    role?: $Enums.UserRole;
    avatar?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserUpdateManyMutationInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    avatar?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type UserMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    avatar?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    password?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    avatar?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type UserScalarRelationFilter = {
    is?: Prisma.UserWhereInput;
    isNot?: Prisma.UserWhereInput;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type UserCreateNestedOneWithoutCoursesInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutCoursesInput, Prisma.UserUncheckedCreateWithoutCoursesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutCoursesInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutCoursesNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutCoursesInput, Prisma.UserUncheckedCreateWithoutCoursesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutCoursesInput;
    upsert?: Prisma.UserUpsertWithoutCoursesInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutCoursesInput, Prisma.UserUpdateWithoutCoursesInput>, Prisma.UserUncheckedUpdateWithoutCoursesInput>;
};
export type UserCreateNestedOneWithoutEnrollmentsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutEnrollmentsInput, Prisma.UserUncheckedCreateWithoutEnrollmentsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutEnrollmentsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutEnrollmentsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutEnrollmentsInput, Prisma.UserUncheckedCreateWithoutEnrollmentsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutEnrollmentsInput;
    upsert?: Prisma.UserUpsertWithoutEnrollmentsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutEnrollmentsInput, Prisma.UserUpdateWithoutEnrollmentsInput>, Prisma.UserUncheckedUpdateWithoutEnrollmentsInput>;
};
export type UserCreateNestedOneWithoutRatingsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutRatingsInput, Prisma.UserUncheckedCreateWithoutRatingsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutRatingsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutRatingsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutRatingsInput, Prisma.UserUncheckedCreateWithoutRatingsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutRatingsInput;
    upsert?: Prisma.UserUpsertWithoutRatingsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutRatingsInput, Prisma.UserUpdateWithoutRatingsInput>, Prisma.UserUncheckedUpdateWithoutRatingsInput>;
};
export type UserCreateNestedOneWithoutWishlistsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutWishlistsInput, Prisma.UserUncheckedCreateWithoutWishlistsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutWishlistsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutWishlistsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutWishlistsInput, Prisma.UserUncheckedCreateWithoutWishlistsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutWishlistsInput;
    upsert?: Prisma.UserUpsertWithoutWishlistsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutWishlistsInput, Prisma.UserUpdateWithoutWishlistsInput>, Prisma.UserUncheckedUpdateWithoutWishlistsInput>;
};
export type UserCreateNestedOneWithoutTrainerRequestInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutTrainerRequestInput, Prisma.UserUncheckedCreateWithoutTrainerRequestInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutTrainerRequestInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutTrainerRequestNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutTrainerRequestInput, Prisma.UserUncheckedCreateWithoutTrainerRequestInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutTrainerRequestInput;
    upsert?: Prisma.UserUpsertWithoutTrainerRequestInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutTrainerRequestInput, Prisma.UserUpdateWithoutTrainerRequestInput>, Prisma.UserUncheckedUpdateWithoutTrainerRequestInput>;
};
export type UserCreateNestedOneWithoutDiscussionsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutDiscussionsInput, Prisma.UserUncheckedCreateWithoutDiscussionsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutDiscussionsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutDiscussionsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutDiscussionsInput, Prisma.UserUncheckedCreateWithoutDiscussionsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutDiscussionsInput;
    upsert?: Prisma.UserUpsertWithoutDiscussionsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutDiscussionsInput, Prisma.UserUpdateWithoutDiscussionsInput>, Prisma.UserUncheckedUpdateWithoutDiscussionsInput>;
};
export type UserCreateNestedOneWithoutRepliesInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutRepliesInput, Prisma.UserUncheckedCreateWithoutRepliesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutRepliesInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutRepliesNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutRepliesInput, Prisma.UserUncheckedCreateWithoutRepliesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutRepliesInput;
    upsert?: Prisma.UserUpsertWithoutRepliesInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutRepliesInput, Prisma.UserUpdateWithoutRepliesInput>, Prisma.UserUncheckedUpdateWithoutRepliesInput>;
};
export type UserCreateNestedOneWithoutLessonCompletionsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutLessonCompletionsInput, Prisma.UserUncheckedCreateWithoutLessonCompletionsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutLessonCompletionsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutLessonCompletionsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutLessonCompletionsInput, Prisma.UserUncheckedCreateWithoutLessonCompletionsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutLessonCompletionsInput;
    upsert?: Prisma.UserUpsertWithoutLessonCompletionsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutLessonCompletionsInput, Prisma.UserUpdateWithoutLessonCompletionsInput>, Prisma.UserUncheckedUpdateWithoutLessonCompletionsInput>;
};
export type UserCreateNestedOneWithoutOrdersInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutOrdersInput, Prisma.UserUncheckedCreateWithoutOrdersInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutOrdersInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutOrdersInput, Prisma.UserUncheckedCreateWithoutOrdersInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutOrdersInput;
    upsert?: Prisma.UserUpsertWithoutOrdersInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutOrdersInput, Prisma.UserUpdateWithoutOrdersInput>, Prisma.UserUncheckedUpdateWithoutOrdersInput>;
};
export type UserCreateNestedOneWithoutUserXpInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutUserXpInput, Prisma.UserUncheckedCreateWithoutUserXpInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutUserXpInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutUserXpNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutUserXpInput, Prisma.UserUncheckedCreateWithoutUserXpInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutUserXpInput;
    upsert?: Prisma.UserUpsertWithoutUserXpInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutUserXpInput, Prisma.UserUpdateWithoutUserXpInput>, Prisma.UserUncheckedUpdateWithoutUserXpInput>;
};
export type UserCreateNestedOneWithoutXpHistoryInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutXpHistoryInput, Prisma.UserUncheckedCreateWithoutXpHistoryInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutXpHistoryInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutXpHistoryNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutXpHistoryInput, Prisma.UserUncheckedCreateWithoutXpHistoryInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutXpHistoryInput;
    upsert?: Prisma.UserUpsertWithoutXpHistoryInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutXpHistoryInput, Prisma.UserUpdateWithoutXpHistoryInput>, Prisma.UserUncheckedUpdateWithoutXpHistoryInput>;
};
export type UserCreateNestedOneWithoutLoginStreakInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutLoginStreakInput, Prisma.UserUncheckedCreateWithoutLoginStreakInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutLoginStreakInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutLoginStreakNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutLoginStreakInput, Prisma.UserUncheckedCreateWithoutLoginStreakInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutLoginStreakInput;
    upsert?: Prisma.UserUpsertWithoutLoginStreakInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutLoginStreakInput, Prisma.UserUpdateWithoutLoginStreakInput>, Prisma.UserUncheckedUpdateWithoutLoginStreakInput>;
};
export type UserCreateNestedOneWithoutCouponsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutCouponsInput, Prisma.UserUncheckedCreateWithoutCouponsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutCouponsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutCouponsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutCouponsInput, Prisma.UserUncheckedCreateWithoutCouponsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutCouponsInput;
    upsert?: Prisma.UserUpsertWithoutCouponsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutCouponsInput, Prisma.UserUpdateWithoutCouponsInput>, Prisma.UserUncheckedUpdateWithoutCouponsInput>;
};
export type UserCreateWithoutCoursesInput = {
    name: string;
    email: string;
    password: string;
    role?: $Enums.UserRole;
    avatar?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    enrollments?: Prisma.EnrollmentCreateNestedManyWithoutUserInput;
    ratings?: Prisma.RatingCreateNestedManyWithoutUserInput;
    wishlists?: Prisma.WishlistCreateNestedManyWithoutUserInput;
    discussions?: Prisma.DiscussionCreateNestedManyWithoutUserInput;
    replies?: Prisma.ReplyCreateNestedManyWithoutUserInput;
    orders?: Prisma.OrderCreateNestedManyWithoutUserInput;
    trainerRequest?: Prisma.TrainerRequestCreateNestedOneWithoutUserInput;
    lessonCompletions?: Prisma.LessonCompletionCreateNestedManyWithoutUserInput;
    userXp?: Prisma.UserXpCreateNestedOneWithoutUserInput;
    xpHistory?: Prisma.XpHistoryCreateNestedManyWithoutUserInput;
    loginStreak?: Prisma.UserLoginStreakCreateNestedOneWithoutUserInput;
    coupons?: Prisma.CouponCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutCoursesInput = {
    id?: number;
    name: string;
    email: string;
    password: string;
    role?: $Enums.UserRole;
    avatar?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    enrollments?: Prisma.EnrollmentUncheckedCreateNestedManyWithoutUserInput;
    ratings?: Prisma.RatingUncheckedCreateNestedManyWithoutUserInput;
    wishlists?: Prisma.WishlistUncheckedCreateNestedManyWithoutUserInput;
    discussions?: Prisma.DiscussionUncheckedCreateNestedManyWithoutUserInput;
    replies?: Prisma.ReplyUncheckedCreateNestedManyWithoutUserInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutUserInput;
    trainerRequest?: Prisma.TrainerRequestUncheckedCreateNestedOneWithoutUserInput;
    lessonCompletions?: Prisma.LessonCompletionUncheckedCreateNestedManyWithoutUserInput;
    userXp?: Prisma.UserXpUncheckedCreateNestedOneWithoutUserInput;
    xpHistory?: Prisma.XpHistoryUncheckedCreateNestedManyWithoutUserInput;
    loginStreak?: Prisma.UserLoginStreakUncheckedCreateNestedOneWithoutUserInput;
    coupons?: Prisma.CouponUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutCoursesInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutCoursesInput, Prisma.UserUncheckedCreateWithoutCoursesInput>;
};
export type UserUpsertWithoutCoursesInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutCoursesInput, Prisma.UserUncheckedUpdateWithoutCoursesInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutCoursesInput, Prisma.UserUncheckedCreateWithoutCoursesInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutCoursesInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutCoursesInput, Prisma.UserUncheckedUpdateWithoutCoursesInput>;
};
export type UserUpdateWithoutCoursesInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    enrollments?: Prisma.EnrollmentUpdateManyWithoutUserNestedInput;
    ratings?: Prisma.RatingUpdateManyWithoutUserNestedInput;
    wishlists?: Prisma.WishlistUpdateManyWithoutUserNestedInput;
    discussions?: Prisma.DiscussionUpdateManyWithoutUserNestedInput;
    replies?: Prisma.ReplyUpdateManyWithoutUserNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutUserNestedInput;
    trainerRequest?: Prisma.TrainerRequestUpdateOneWithoutUserNestedInput;
    lessonCompletions?: Prisma.LessonCompletionUpdateManyWithoutUserNestedInput;
    userXp?: Prisma.UserXpUpdateOneWithoutUserNestedInput;
    xpHistory?: Prisma.XpHistoryUpdateManyWithoutUserNestedInput;
    loginStreak?: Prisma.UserLoginStreakUpdateOneWithoutUserNestedInput;
    coupons?: Prisma.CouponUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutCoursesInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    enrollments?: Prisma.EnrollmentUncheckedUpdateManyWithoutUserNestedInput;
    ratings?: Prisma.RatingUncheckedUpdateManyWithoutUserNestedInput;
    wishlists?: Prisma.WishlistUncheckedUpdateManyWithoutUserNestedInput;
    discussions?: Prisma.DiscussionUncheckedUpdateManyWithoutUserNestedInput;
    replies?: Prisma.ReplyUncheckedUpdateManyWithoutUserNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutUserNestedInput;
    trainerRequest?: Prisma.TrainerRequestUncheckedUpdateOneWithoutUserNestedInput;
    lessonCompletions?: Prisma.LessonCompletionUncheckedUpdateManyWithoutUserNestedInput;
    userXp?: Prisma.UserXpUncheckedUpdateOneWithoutUserNestedInput;
    xpHistory?: Prisma.XpHistoryUncheckedUpdateManyWithoutUserNestedInput;
    loginStreak?: Prisma.UserLoginStreakUncheckedUpdateOneWithoutUserNestedInput;
    coupons?: Prisma.CouponUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutEnrollmentsInput = {
    name: string;
    email: string;
    password: string;
    role?: $Enums.UserRole;
    avatar?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    courses?: Prisma.CourseCreateNestedManyWithoutTrainerInput;
    ratings?: Prisma.RatingCreateNestedManyWithoutUserInput;
    wishlists?: Prisma.WishlistCreateNestedManyWithoutUserInput;
    discussions?: Prisma.DiscussionCreateNestedManyWithoutUserInput;
    replies?: Prisma.ReplyCreateNestedManyWithoutUserInput;
    orders?: Prisma.OrderCreateNestedManyWithoutUserInput;
    trainerRequest?: Prisma.TrainerRequestCreateNestedOneWithoutUserInput;
    lessonCompletions?: Prisma.LessonCompletionCreateNestedManyWithoutUserInput;
    userXp?: Prisma.UserXpCreateNestedOneWithoutUserInput;
    xpHistory?: Prisma.XpHistoryCreateNestedManyWithoutUserInput;
    loginStreak?: Prisma.UserLoginStreakCreateNestedOneWithoutUserInput;
    coupons?: Prisma.CouponCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutEnrollmentsInput = {
    id?: number;
    name: string;
    email: string;
    password: string;
    role?: $Enums.UserRole;
    avatar?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    courses?: Prisma.CourseUncheckedCreateNestedManyWithoutTrainerInput;
    ratings?: Prisma.RatingUncheckedCreateNestedManyWithoutUserInput;
    wishlists?: Prisma.WishlistUncheckedCreateNestedManyWithoutUserInput;
    discussions?: Prisma.DiscussionUncheckedCreateNestedManyWithoutUserInput;
    replies?: Prisma.ReplyUncheckedCreateNestedManyWithoutUserInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutUserInput;
    trainerRequest?: Prisma.TrainerRequestUncheckedCreateNestedOneWithoutUserInput;
    lessonCompletions?: Prisma.LessonCompletionUncheckedCreateNestedManyWithoutUserInput;
    userXp?: Prisma.UserXpUncheckedCreateNestedOneWithoutUserInput;
    xpHistory?: Prisma.XpHistoryUncheckedCreateNestedManyWithoutUserInput;
    loginStreak?: Prisma.UserLoginStreakUncheckedCreateNestedOneWithoutUserInput;
    coupons?: Prisma.CouponUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutEnrollmentsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutEnrollmentsInput, Prisma.UserUncheckedCreateWithoutEnrollmentsInput>;
};
export type UserUpsertWithoutEnrollmentsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutEnrollmentsInput, Prisma.UserUncheckedUpdateWithoutEnrollmentsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutEnrollmentsInput, Prisma.UserUncheckedCreateWithoutEnrollmentsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutEnrollmentsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutEnrollmentsInput, Prisma.UserUncheckedUpdateWithoutEnrollmentsInput>;
};
export type UserUpdateWithoutEnrollmentsInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    courses?: Prisma.CourseUpdateManyWithoutTrainerNestedInput;
    ratings?: Prisma.RatingUpdateManyWithoutUserNestedInput;
    wishlists?: Prisma.WishlistUpdateManyWithoutUserNestedInput;
    discussions?: Prisma.DiscussionUpdateManyWithoutUserNestedInput;
    replies?: Prisma.ReplyUpdateManyWithoutUserNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutUserNestedInput;
    trainerRequest?: Prisma.TrainerRequestUpdateOneWithoutUserNestedInput;
    lessonCompletions?: Prisma.LessonCompletionUpdateManyWithoutUserNestedInput;
    userXp?: Prisma.UserXpUpdateOneWithoutUserNestedInput;
    xpHistory?: Prisma.XpHistoryUpdateManyWithoutUserNestedInput;
    loginStreak?: Prisma.UserLoginStreakUpdateOneWithoutUserNestedInput;
    coupons?: Prisma.CouponUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutEnrollmentsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    courses?: Prisma.CourseUncheckedUpdateManyWithoutTrainerNestedInput;
    ratings?: Prisma.RatingUncheckedUpdateManyWithoutUserNestedInput;
    wishlists?: Prisma.WishlistUncheckedUpdateManyWithoutUserNestedInput;
    discussions?: Prisma.DiscussionUncheckedUpdateManyWithoutUserNestedInput;
    replies?: Prisma.ReplyUncheckedUpdateManyWithoutUserNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutUserNestedInput;
    trainerRequest?: Prisma.TrainerRequestUncheckedUpdateOneWithoutUserNestedInput;
    lessonCompletions?: Prisma.LessonCompletionUncheckedUpdateManyWithoutUserNestedInput;
    userXp?: Prisma.UserXpUncheckedUpdateOneWithoutUserNestedInput;
    xpHistory?: Prisma.XpHistoryUncheckedUpdateManyWithoutUserNestedInput;
    loginStreak?: Prisma.UserLoginStreakUncheckedUpdateOneWithoutUserNestedInput;
    coupons?: Prisma.CouponUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutRatingsInput = {
    name: string;
    email: string;
    password: string;
    role?: $Enums.UserRole;
    avatar?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    courses?: Prisma.CourseCreateNestedManyWithoutTrainerInput;
    enrollments?: Prisma.EnrollmentCreateNestedManyWithoutUserInput;
    wishlists?: Prisma.WishlistCreateNestedManyWithoutUserInput;
    discussions?: Prisma.DiscussionCreateNestedManyWithoutUserInput;
    replies?: Prisma.ReplyCreateNestedManyWithoutUserInput;
    orders?: Prisma.OrderCreateNestedManyWithoutUserInput;
    trainerRequest?: Prisma.TrainerRequestCreateNestedOneWithoutUserInput;
    lessonCompletions?: Prisma.LessonCompletionCreateNestedManyWithoutUserInput;
    userXp?: Prisma.UserXpCreateNestedOneWithoutUserInput;
    xpHistory?: Prisma.XpHistoryCreateNestedManyWithoutUserInput;
    loginStreak?: Prisma.UserLoginStreakCreateNestedOneWithoutUserInput;
    coupons?: Prisma.CouponCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutRatingsInput = {
    id?: number;
    name: string;
    email: string;
    password: string;
    role?: $Enums.UserRole;
    avatar?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    courses?: Prisma.CourseUncheckedCreateNestedManyWithoutTrainerInput;
    enrollments?: Prisma.EnrollmentUncheckedCreateNestedManyWithoutUserInput;
    wishlists?: Prisma.WishlistUncheckedCreateNestedManyWithoutUserInput;
    discussions?: Prisma.DiscussionUncheckedCreateNestedManyWithoutUserInput;
    replies?: Prisma.ReplyUncheckedCreateNestedManyWithoutUserInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutUserInput;
    trainerRequest?: Prisma.TrainerRequestUncheckedCreateNestedOneWithoutUserInput;
    lessonCompletions?: Prisma.LessonCompletionUncheckedCreateNestedManyWithoutUserInput;
    userXp?: Prisma.UserXpUncheckedCreateNestedOneWithoutUserInput;
    xpHistory?: Prisma.XpHistoryUncheckedCreateNestedManyWithoutUserInput;
    loginStreak?: Prisma.UserLoginStreakUncheckedCreateNestedOneWithoutUserInput;
    coupons?: Prisma.CouponUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutRatingsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutRatingsInput, Prisma.UserUncheckedCreateWithoutRatingsInput>;
};
export type UserUpsertWithoutRatingsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutRatingsInput, Prisma.UserUncheckedUpdateWithoutRatingsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutRatingsInput, Prisma.UserUncheckedCreateWithoutRatingsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutRatingsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutRatingsInput, Prisma.UserUncheckedUpdateWithoutRatingsInput>;
};
export type UserUpdateWithoutRatingsInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    courses?: Prisma.CourseUpdateManyWithoutTrainerNestedInput;
    enrollments?: Prisma.EnrollmentUpdateManyWithoutUserNestedInput;
    wishlists?: Prisma.WishlistUpdateManyWithoutUserNestedInput;
    discussions?: Prisma.DiscussionUpdateManyWithoutUserNestedInput;
    replies?: Prisma.ReplyUpdateManyWithoutUserNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutUserNestedInput;
    trainerRequest?: Prisma.TrainerRequestUpdateOneWithoutUserNestedInput;
    lessonCompletions?: Prisma.LessonCompletionUpdateManyWithoutUserNestedInput;
    userXp?: Prisma.UserXpUpdateOneWithoutUserNestedInput;
    xpHistory?: Prisma.XpHistoryUpdateManyWithoutUserNestedInput;
    loginStreak?: Prisma.UserLoginStreakUpdateOneWithoutUserNestedInput;
    coupons?: Prisma.CouponUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutRatingsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    courses?: Prisma.CourseUncheckedUpdateManyWithoutTrainerNestedInput;
    enrollments?: Prisma.EnrollmentUncheckedUpdateManyWithoutUserNestedInput;
    wishlists?: Prisma.WishlistUncheckedUpdateManyWithoutUserNestedInput;
    discussions?: Prisma.DiscussionUncheckedUpdateManyWithoutUserNestedInput;
    replies?: Prisma.ReplyUncheckedUpdateManyWithoutUserNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutUserNestedInput;
    trainerRequest?: Prisma.TrainerRequestUncheckedUpdateOneWithoutUserNestedInput;
    lessonCompletions?: Prisma.LessonCompletionUncheckedUpdateManyWithoutUserNestedInput;
    userXp?: Prisma.UserXpUncheckedUpdateOneWithoutUserNestedInput;
    xpHistory?: Prisma.XpHistoryUncheckedUpdateManyWithoutUserNestedInput;
    loginStreak?: Prisma.UserLoginStreakUncheckedUpdateOneWithoutUserNestedInput;
    coupons?: Prisma.CouponUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutWishlistsInput = {
    name: string;
    email: string;
    password: string;
    role?: $Enums.UserRole;
    avatar?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    courses?: Prisma.CourseCreateNestedManyWithoutTrainerInput;
    enrollments?: Prisma.EnrollmentCreateNestedManyWithoutUserInput;
    ratings?: Prisma.RatingCreateNestedManyWithoutUserInput;
    discussions?: Prisma.DiscussionCreateNestedManyWithoutUserInput;
    replies?: Prisma.ReplyCreateNestedManyWithoutUserInput;
    orders?: Prisma.OrderCreateNestedManyWithoutUserInput;
    trainerRequest?: Prisma.TrainerRequestCreateNestedOneWithoutUserInput;
    lessonCompletions?: Prisma.LessonCompletionCreateNestedManyWithoutUserInput;
    userXp?: Prisma.UserXpCreateNestedOneWithoutUserInput;
    xpHistory?: Prisma.XpHistoryCreateNestedManyWithoutUserInput;
    loginStreak?: Prisma.UserLoginStreakCreateNestedOneWithoutUserInput;
    coupons?: Prisma.CouponCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutWishlistsInput = {
    id?: number;
    name: string;
    email: string;
    password: string;
    role?: $Enums.UserRole;
    avatar?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    courses?: Prisma.CourseUncheckedCreateNestedManyWithoutTrainerInput;
    enrollments?: Prisma.EnrollmentUncheckedCreateNestedManyWithoutUserInput;
    ratings?: Prisma.RatingUncheckedCreateNestedManyWithoutUserInput;
    discussions?: Prisma.DiscussionUncheckedCreateNestedManyWithoutUserInput;
    replies?: Prisma.ReplyUncheckedCreateNestedManyWithoutUserInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutUserInput;
    trainerRequest?: Prisma.TrainerRequestUncheckedCreateNestedOneWithoutUserInput;
    lessonCompletions?: Prisma.LessonCompletionUncheckedCreateNestedManyWithoutUserInput;
    userXp?: Prisma.UserXpUncheckedCreateNestedOneWithoutUserInput;
    xpHistory?: Prisma.XpHistoryUncheckedCreateNestedManyWithoutUserInput;
    loginStreak?: Prisma.UserLoginStreakUncheckedCreateNestedOneWithoutUserInput;
    coupons?: Prisma.CouponUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutWishlistsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutWishlistsInput, Prisma.UserUncheckedCreateWithoutWishlistsInput>;
};
export type UserUpsertWithoutWishlistsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutWishlistsInput, Prisma.UserUncheckedUpdateWithoutWishlistsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutWishlistsInput, Prisma.UserUncheckedCreateWithoutWishlistsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutWishlistsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutWishlistsInput, Prisma.UserUncheckedUpdateWithoutWishlistsInput>;
};
export type UserUpdateWithoutWishlistsInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    courses?: Prisma.CourseUpdateManyWithoutTrainerNestedInput;
    enrollments?: Prisma.EnrollmentUpdateManyWithoutUserNestedInput;
    ratings?: Prisma.RatingUpdateManyWithoutUserNestedInput;
    discussions?: Prisma.DiscussionUpdateManyWithoutUserNestedInput;
    replies?: Prisma.ReplyUpdateManyWithoutUserNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutUserNestedInput;
    trainerRequest?: Prisma.TrainerRequestUpdateOneWithoutUserNestedInput;
    lessonCompletions?: Prisma.LessonCompletionUpdateManyWithoutUserNestedInput;
    userXp?: Prisma.UserXpUpdateOneWithoutUserNestedInput;
    xpHistory?: Prisma.XpHistoryUpdateManyWithoutUserNestedInput;
    loginStreak?: Prisma.UserLoginStreakUpdateOneWithoutUserNestedInput;
    coupons?: Prisma.CouponUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutWishlistsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    courses?: Prisma.CourseUncheckedUpdateManyWithoutTrainerNestedInput;
    enrollments?: Prisma.EnrollmentUncheckedUpdateManyWithoutUserNestedInput;
    ratings?: Prisma.RatingUncheckedUpdateManyWithoutUserNestedInput;
    discussions?: Prisma.DiscussionUncheckedUpdateManyWithoutUserNestedInput;
    replies?: Prisma.ReplyUncheckedUpdateManyWithoutUserNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutUserNestedInput;
    trainerRequest?: Prisma.TrainerRequestUncheckedUpdateOneWithoutUserNestedInput;
    lessonCompletions?: Prisma.LessonCompletionUncheckedUpdateManyWithoutUserNestedInput;
    userXp?: Prisma.UserXpUncheckedUpdateOneWithoutUserNestedInput;
    xpHistory?: Prisma.XpHistoryUncheckedUpdateManyWithoutUserNestedInput;
    loginStreak?: Prisma.UserLoginStreakUncheckedUpdateOneWithoutUserNestedInput;
    coupons?: Prisma.CouponUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutTrainerRequestInput = {
    name: string;
    email: string;
    password: string;
    role?: $Enums.UserRole;
    avatar?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    courses?: Prisma.CourseCreateNestedManyWithoutTrainerInput;
    enrollments?: Prisma.EnrollmentCreateNestedManyWithoutUserInput;
    ratings?: Prisma.RatingCreateNestedManyWithoutUserInput;
    wishlists?: Prisma.WishlistCreateNestedManyWithoutUserInput;
    discussions?: Prisma.DiscussionCreateNestedManyWithoutUserInput;
    replies?: Prisma.ReplyCreateNestedManyWithoutUserInput;
    orders?: Prisma.OrderCreateNestedManyWithoutUserInput;
    lessonCompletions?: Prisma.LessonCompletionCreateNestedManyWithoutUserInput;
    userXp?: Prisma.UserXpCreateNestedOneWithoutUserInput;
    xpHistory?: Prisma.XpHistoryCreateNestedManyWithoutUserInput;
    loginStreak?: Prisma.UserLoginStreakCreateNestedOneWithoutUserInput;
    coupons?: Prisma.CouponCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutTrainerRequestInput = {
    id?: number;
    name: string;
    email: string;
    password: string;
    role?: $Enums.UserRole;
    avatar?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    courses?: Prisma.CourseUncheckedCreateNestedManyWithoutTrainerInput;
    enrollments?: Prisma.EnrollmentUncheckedCreateNestedManyWithoutUserInput;
    ratings?: Prisma.RatingUncheckedCreateNestedManyWithoutUserInput;
    wishlists?: Prisma.WishlistUncheckedCreateNestedManyWithoutUserInput;
    discussions?: Prisma.DiscussionUncheckedCreateNestedManyWithoutUserInput;
    replies?: Prisma.ReplyUncheckedCreateNestedManyWithoutUserInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutUserInput;
    lessonCompletions?: Prisma.LessonCompletionUncheckedCreateNestedManyWithoutUserInput;
    userXp?: Prisma.UserXpUncheckedCreateNestedOneWithoutUserInput;
    xpHistory?: Prisma.XpHistoryUncheckedCreateNestedManyWithoutUserInput;
    loginStreak?: Prisma.UserLoginStreakUncheckedCreateNestedOneWithoutUserInput;
    coupons?: Prisma.CouponUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutTrainerRequestInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutTrainerRequestInput, Prisma.UserUncheckedCreateWithoutTrainerRequestInput>;
};
export type UserUpsertWithoutTrainerRequestInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutTrainerRequestInput, Prisma.UserUncheckedUpdateWithoutTrainerRequestInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutTrainerRequestInput, Prisma.UserUncheckedCreateWithoutTrainerRequestInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutTrainerRequestInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutTrainerRequestInput, Prisma.UserUncheckedUpdateWithoutTrainerRequestInput>;
};
export type UserUpdateWithoutTrainerRequestInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    courses?: Prisma.CourseUpdateManyWithoutTrainerNestedInput;
    enrollments?: Prisma.EnrollmentUpdateManyWithoutUserNestedInput;
    ratings?: Prisma.RatingUpdateManyWithoutUserNestedInput;
    wishlists?: Prisma.WishlistUpdateManyWithoutUserNestedInput;
    discussions?: Prisma.DiscussionUpdateManyWithoutUserNestedInput;
    replies?: Prisma.ReplyUpdateManyWithoutUserNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutUserNestedInput;
    lessonCompletions?: Prisma.LessonCompletionUpdateManyWithoutUserNestedInput;
    userXp?: Prisma.UserXpUpdateOneWithoutUserNestedInput;
    xpHistory?: Prisma.XpHistoryUpdateManyWithoutUserNestedInput;
    loginStreak?: Prisma.UserLoginStreakUpdateOneWithoutUserNestedInput;
    coupons?: Prisma.CouponUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutTrainerRequestInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    courses?: Prisma.CourseUncheckedUpdateManyWithoutTrainerNestedInput;
    enrollments?: Prisma.EnrollmentUncheckedUpdateManyWithoutUserNestedInput;
    ratings?: Prisma.RatingUncheckedUpdateManyWithoutUserNestedInput;
    wishlists?: Prisma.WishlistUncheckedUpdateManyWithoutUserNestedInput;
    discussions?: Prisma.DiscussionUncheckedUpdateManyWithoutUserNestedInput;
    replies?: Prisma.ReplyUncheckedUpdateManyWithoutUserNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutUserNestedInput;
    lessonCompletions?: Prisma.LessonCompletionUncheckedUpdateManyWithoutUserNestedInput;
    userXp?: Prisma.UserXpUncheckedUpdateOneWithoutUserNestedInput;
    xpHistory?: Prisma.XpHistoryUncheckedUpdateManyWithoutUserNestedInput;
    loginStreak?: Prisma.UserLoginStreakUncheckedUpdateOneWithoutUserNestedInput;
    coupons?: Prisma.CouponUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutDiscussionsInput = {
    name: string;
    email: string;
    password: string;
    role?: $Enums.UserRole;
    avatar?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    courses?: Prisma.CourseCreateNestedManyWithoutTrainerInput;
    enrollments?: Prisma.EnrollmentCreateNestedManyWithoutUserInput;
    ratings?: Prisma.RatingCreateNestedManyWithoutUserInput;
    wishlists?: Prisma.WishlistCreateNestedManyWithoutUserInput;
    replies?: Prisma.ReplyCreateNestedManyWithoutUserInput;
    orders?: Prisma.OrderCreateNestedManyWithoutUserInput;
    trainerRequest?: Prisma.TrainerRequestCreateNestedOneWithoutUserInput;
    lessonCompletions?: Prisma.LessonCompletionCreateNestedManyWithoutUserInput;
    userXp?: Prisma.UserXpCreateNestedOneWithoutUserInput;
    xpHistory?: Prisma.XpHistoryCreateNestedManyWithoutUserInput;
    loginStreak?: Prisma.UserLoginStreakCreateNestedOneWithoutUserInput;
    coupons?: Prisma.CouponCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutDiscussionsInput = {
    id?: number;
    name: string;
    email: string;
    password: string;
    role?: $Enums.UserRole;
    avatar?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    courses?: Prisma.CourseUncheckedCreateNestedManyWithoutTrainerInput;
    enrollments?: Prisma.EnrollmentUncheckedCreateNestedManyWithoutUserInput;
    ratings?: Prisma.RatingUncheckedCreateNestedManyWithoutUserInput;
    wishlists?: Prisma.WishlistUncheckedCreateNestedManyWithoutUserInput;
    replies?: Prisma.ReplyUncheckedCreateNestedManyWithoutUserInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutUserInput;
    trainerRequest?: Prisma.TrainerRequestUncheckedCreateNestedOneWithoutUserInput;
    lessonCompletions?: Prisma.LessonCompletionUncheckedCreateNestedManyWithoutUserInput;
    userXp?: Prisma.UserXpUncheckedCreateNestedOneWithoutUserInput;
    xpHistory?: Prisma.XpHistoryUncheckedCreateNestedManyWithoutUserInput;
    loginStreak?: Prisma.UserLoginStreakUncheckedCreateNestedOneWithoutUserInput;
    coupons?: Prisma.CouponUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutDiscussionsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutDiscussionsInput, Prisma.UserUncheckedCreateWithoutDiscussionsInput>;
};
export type UserUpsertWithoutDiscussionsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutDiscussionsInput, Prisma.UserUncheckedUpdateWithoutDiscussionsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutDiscussionsInput, Prisma.UserUncheckedCreateWithoutDiscussionsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutDiscussionsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutDiscussionsInput, Prisma.UserUncheckedUpdateWithoutDiscussionsInput>;
};
export type UserUpdateWithoutDiscussionsInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    courses?: Prisma.CourseUpdateManyWithoutTrainerNestedInput;
    enrollments?: Prisma.EnrollmentUpdateManyWithoutUserNestedInput;
    ratings?: Prisma.RatingUpdateManyWithoutUserNestedInput;
    wishlists?: Prisma.WishlistUpdateManyWithoutUserNestedInput;
    replies?: Prisma.ReplyUpdateManyWithoutUserNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutUserNestedInput;
    trainerRequest?: Prisma.TrainerRequestUpdateOneWithoutUserNestedInput;
    lessonCompletions?: Prisma.LessonCompletionUpdateManyWithoutUserNestedInput;
    userXp?: Prisma.UserXpUpdateOneWithoutUserNestedInput;
    xpHistory?: Prisma.XpHistoryUpdateManyWithoutUserNestedInput;
    loginStreak?: Prisma.UserLoginStreakUpdateOneWithoutUserNestedInput;
    coupons?: Prisma.CouponUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutDiscussionsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    courses?: Prisma.CourseUncheckedUpdateManyWithoutTrainerNestedInput;
    enrollments?: Prisma.EnrollmentUncheckedUpdateManyWithoutUserNestedInput;
    ratings?: Prisma.RatingUncheckedUpdateManyWithoutUserNestedInput;
    wishlists?: Prisma.WishlistUncheckedUpdateManyWithoutUserNestedInput;
    replies?: Prisma.ReplyUncheckedUpdateManyWithoutUserNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutUserNestedInput;
    trainerRequest?: Prisma.TrainerRequestUncheckedUpdateOneWithoutUserNestedInput;
    lessonCompletions?: Prisma.LessonCompletionUncheckedUpdateManyWithoutUserNestedInput;
    userXp?: Prisma.UserXpUncheckedUpdateOneWithoutUserNestedInput;
    xpHistory?: Prisma.XpHistoryUncheckedUpdateManyWithoutUserNestedInput;
    loginStreak?: Prisma.UserLoginStreakUncheckedUpdateOneWithoutUserNestedInput;
    coupons?: Prisma.CouponUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutRepliesInput = {
    name: string;
    email: string;
    password: string;
    role?: $Enums.UserRole;
    avatar?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    courses?: Prisma.CourseCreateNestedManyWithoutTrainerInput;
    enrollments?: Prisma.EnrollmentCreateNestedManyWithoutUserInput;
    ratings?: Prisma.RatingCreateNestedManyWithoutUserInput;
    wishlists?: Prisma.WishlistCreateNestedManyWithoutUserInput;
    discussions?: Prisma.DiscussionCreateNestedManyWithoutUserInput;
    orders?: Prisma.OrderCreateNestedManyWithoutUserInput;
    trainerRequest?: Prisma.TrainerRequestCreateNestedOneWithoutUserInput;
    lessonCompletions?: Prisma.LessonCompletionCreateNestedManyWithoutUserInput;
    userXp?: Prisma.UserXpCreateNestedOneWithoutUserInput;
    xpHistory?: Prisma.XpHistoryCreateNestedManyWithoutUserInput;
    loginStreak?: Prisma.UserLoginStreakCreateNestedOneWithoutUserInput;
    coupons?: Prisma.CouponCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutRepliesInput = {
    id?: number;
    name: string;
    email: string;
    password: string;
    role?: $Enums.UserRole;
    avatar?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    courses?: Prisma.CourseUncheckedCreateNestedManyWithoutTrainerInput;
    enrollments?: Prisma.EnrollmentUncheckedCreateNestedManyWithoutUserInput;
    ratings?: Prisma.RatingUncheckedCreateNestedManyWithoutUserInput;
    wishlists?: Prisma.WishlistUncheckedCreateNestedManyWithoutUserInput;
    discussions?: Prisma.DiscussionUncheckedCreateNestedManyWithoutUserInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutUserInput;
    trainerRequest?: Prisma.TrainerRequestUncheckedCreateNestedOneWithoutUserInput;
    lessonCompletions?: Prisma.LessonCompletionUncheckedCreateNestedManyWithoutUserInput;
    userXp?: Prisma.UserXpUncheckedCreateNestedOneWithoutUserInput;
    xpHistory?: Prisma.XpHistoryUncheckedCreateNestedManyWithoutUserInput;
    loginStreak?: Prisma.UserLoginStreakUncheckedCreateNestedOneWithoutUserInput;
    coupons?: Prisma.CouponUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutRepliesInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutRepliesInput, Prisma.UserUncheckedCreateWithoutRepliesInput>;
};
export type UserUpsertWithoutRepliesInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutRepliesInput, Prisma.UserUncheckedUpdateWithoutRepliesInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutRepliesInput, Prisma.UserUncheckedCreateWithoutRepliesInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutRepliesInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutRepliesInput, Prisma.UserUncheckedUpdateWithoutRepliesInput>;
};
export type UserUpdateWithoutRepliesInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    courses?: Prisma.CourseUpdateManyWithoutTrainerNestedInput;
    enrollments?: Prisma.EnrollmentUpdateManyWithoutUserNestedInput;
    ratings?: Prisma.RatingUpdateManyWithoutUserNestedInput;
    wishlists?: Prisma.WishlistUpdateManyWithoutUserNestedInput;
    discussions?: Prisma.DiscussionUpdateManyWithoutUserNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutUserNestedInput;
    trainerRequest?: Prisma.TrainerRequestUpdateOneWithoutUserNestedInput;
    lessonCompletions?: Prisma.LessonCompletionUpdateManyWithoutUserNestedInput;
    userXp?: Prisma.UserXpUpdateOneWithoutUserNestedInput;
    xpHistory?: Prisma.XpHistoryUpdateManyWithoutUserNestedInput;
    loginStreak?: Prisma.UserLoginStreakUpdateOneWithoutUserNestedInput;
    coupons?: Prisma.CouponUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutRepliesInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    courses?: Prisma.CourseUncheckedUpdateManyWithoutTrainerNestedInput;
    enrollments?: Prisma.EnrollmentUncheckedUpdateManyWithoutUserNestedInput;
    ratings?: Prisma.RatingUncheckedUpdateManyWithoutUserNestedInput;
    wishlists?: Prisma.WishlistUncheckedUpdateManyWithoutUserNestedInput;
    discussions?: Prisma.DiscussionUncheckedUpdateManyWithoutUserNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutUserNestedInput;
    trainerRequest?: Prisma.TrainerRequestUncheckedUpdateOneWithoutUserNestedInput;
    lessonCompletions?: Prisma.LessonCompletionUncheckedUpdateManyWithoutUserNestedInput;
    userXp?: Prisma.UserXpUncheckedUpdateOneWithoutUserNestedInput;
    xpHistory?: Prisma.XpHistoryUncheckedUpdateManyWithoutUserNestedInput;
    loginStreak?: Prisma.UserLoginStreakUncheckedUpdateOneWithoutUserNestedInput;
    coupons?: Prisma.CouponUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutLessonCompletionsInput = {
    name: string;
    email: string;
    password: string;
    role?: $Enums.UserRole;
    avatar?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    courses?: Prisma.CourseCreateNestedManyWithoutTrainerInput;
    enrollments?: Prisma.EnrollmentCreateNestedManyWithoutUserInput;
    ratings?: Prisma.RatingCreateNestedManyWithoutUserInput;
    wishlists?: Prisma.WishlistCreateNestedManyWithoutUserInput;
    discussions?: Prisma.DiscussionCreateNestedManyWithoutUserInput;
    replies?: Prisma.ReplyCreateNestedManyWithoutUserInput;
    orders?: Prisma.OrderCreateNestedManyWithoutUserInput;
    trainerRequest?: Prisma.TrainerRequestCreateNestedOneWithoutUserInput;
    userXp?: Prisma.UserXpCreateNestedOneWithoutUserInput;
    xpHistory?: Prisma.XpHistoryCreateNestedManyWithoutUserInput;
    loginStreak?: Prisma.UserLoginStreakCreateNestedOneWithoutUserInput;
    coupons?: Prisma.CouponCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutLessonCompletionsInput = {
    id?: number;
    name: string;
    email: string;
    password: string;
    role?: $Enums.UserRole;
    avatar?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    courses?: Prisma.CourseUncheckedCreateNestedManyWithoutTrainerInput;
    enrollments?: Prisma.EnrollmentUncheckedCreateNestedManyWithoutUserInput;
    ratings?: Prisma.RatingUncheckedCreateNestedManyWithoutUserInput;
    wishlists?: Prisma.WishlistUncheckedCreateNestedManyWithoutUserInput;
    discussions?: Prisma.DiscussionUncheckedCreateNestedManyWithoutUserInput;
    replies?: Prisma.ReplyUncheckedCreateNestedManyWithoutUserInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutUserInput;
    trainerRequest?: Prisma.TrainerRequestUncheckedCreateNestedOneWithoutUserInput;
    userXp?: Prisma.UserXpUncheckedCreateNestedOneWithoutUserInput;
    xpHistory?: Prisma.XpHistoryUncheckedCreateNestedManyWithoutUserInput;
    loginStreak?: Prisma.UserLoginStreakUncheckedCreateNestedOneWithoutUserInput;
    coupons?: Prisma.CouponUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutLessonCompletionsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutLessonCompletionsInput, Prisma.UserUncheckedCreateWithoutLessonCompletionsInput>;
};
export type UserUpsertWithoutLessonCompletionsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutLessonCompletionsInput, Prisma.UserUncheckedUpdateWithoutLessonCompletionsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutLessonCompletionsInput, Prisma.UserUncheckedCreateWithoutLessonCompletionsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutLessonCompletionsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutLessonCompletionsInput, Prisma.UserUncheckedUpdateWithoutLessonCompletionsInput>;
};
export type UserUpdateWithoutLessonCompletionsInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    courses?: Prisma.CourseUpdateManyWithoutTrainerNestedInput;
    enrollments?: Prisma.EnrollmentUpdateManyWithoutUserNestedInput;
    ratings?: Prisma.RatingUpdateManyWithoutUserNestedInput;
    wishlists?: Prisma.WishlistUpdateManyWithoutUserNestedInput;
    discussions?: Prisma.DiscussionUpdateManyWithoutUserNestedInput;
    replies?: Prisma.ReplyUpdateManyWithoutUserNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutUserNestedInput;
    trainerRequest?: Prisma.TrainerRequestUpdateOneWithoutUserNestedInput;
    userXp?: Prisma.UserXpUpdateOneWithoutUserNestedInput;
    xpHistory?: Prisma.XpHistoryUpdateManyWithoutUserNestedInput;
    loginStreak?: Prisma.UserLoginStreakUpdateOneWithoutUserNestedInput;
    coupons?: Prisma.CouponUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutLessonCompletionsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    courses?: Prisma.CourseUncheckedUpdateManyWithoutTrainerNestedInput;
    enrollments?: Prisma.EnrollmentUncheckedUpdateManyWithoutUserNestedInput;
    ratings?: Prisma.RatingUncheckedUpdateManyWithoutUserNestedInput;
    wishlists?: Prisma.WishlistUncheckedUpdateManyWithoutUserNestedInput;
    discussions?: Prisma.DiscussionUncheckedUpdateManyWithoutUserNestedInput;
    replies?: Prisma.ReplyUncheckedUpdateManyWithoutUserNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutUserNestedInput;
    trainerRequest?: Prisma.TrainerRequestUncheckedUpdateOneWithoutUserNestedInput;
    userXp?: Prisma.UserXpUncheckedUpdateOneWithoutUserNestedInput;
    xpHistory?: Prisma.XpHistoryUncheckedUpdateManyWithoutUserNestedInput;
    loginStreak?: Prisma.UserLoginStreakUncheckedUpdateOneWithoutUserNestedInput;
    coupons?: Prisma.CouponUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutOrdersInput = {
    name: string;
    email: string;
    password: string;
    role?: $Enums.UserRole;
    avatar?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    courses?: Prisma.CourseCreateNestedManyWithoutTrainerInput;
    enrollments?: Prisma.EnrollmentCreateNestedManyWithoutUserInput;
    ratings?: Prisma.RatingCreateNestedManyWithoutUserInput;
    wishlists?: Prisma.WishlistCreateNestedManyWithoutUserInput;
    discussions?: Prisma.DiscussionCreateNestedManyWithoutUserInput;
    replies?: Prisma.ReplyCreateNestedManyWithoutUserInput;
    trainerRequest?: Prisma.TrainerRequestCreateNestedOneWithoutUserInput;
    lessonCompletions?: Prisma.LessonCompletionCreateNestedManyWithoutUserInput;
    userXp?: Prisma.UserXpCreateNestedOneWithoutUserInput;
    xpHistory?: Prisma.XpHistoryCreateNestedManyWithoutUserInput;
    loginStreak?: Prisma.UserLoginStreakCreateNestedOneWithoutUserInput;
    coupons?: Prisma.CouponCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutOrdersInput = {
    id?: number;
    name: string;
    email: string;
    password: string;
    role?: $Enums.UserRole;
    avatar?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    courses?: Prisma.CourseUncheckedCreateNestedManyWithoutTrainerInput;
    enrollments?: Prisma.EnrollmentUncheckedCreateNestedManyWithoutUserInput;
    ratings?: Prisma.RatingUncheckedCreateNestedManyWithoutUserInput;
    wishlists?: Prisma.WishlistUncheckedCreateNestedManyWithoutUserInput;
    discussions?: Prisma.DiscussionUncheckedCreateNestedManyWithoutUserInput;
    replies?: Prisma.ReplyUncheckedCreateNestedManyWithoutUserInput;
    trainerRequest?: Prisma.TrainerRequestUncheckedCreateNestedOneWithoutUserInput;
    lessonCompletions?: Prisma.LessonCompletionUncheckedCreateNestedManyWithoutUserInput;
    userXp?: Prisma.UserXpUncheckedCreateNestedOneWithoutUserInput;
    xpHistory?: Prisma.XpHistoryUncheckedCreateNestedManyWithoutUserInput;
    loginStreak?: Prisma.UserLoginStreakUncheckedCreateNestedOneWithoutUserInput;
    coupons?: Prisma.CouponUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutOrdersInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutOrdersInput, Prisma.UserUncheckedCreateWithoutOrdersInput>;
};
export type UserUpsertWithoutOrdersInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutOrdersInput, Prisma.UserUncheckedUpdateWithoutOrdersInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutOrdersInput, Prisma.UserUncheckedCreateWithoutOrdersInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutOrdersInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutOrdersInput, Prisma.UserUncheckedUpdateWithoutOrdersInput>;
};
export type UserUpdateWithoutOrdersInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    courses?: Prisma.CourseUpdateManyWithoutTrainerNestedInput;
    enrollments?: Prisma.EnrollmentUpdateManyWithoutUserNestedInput;
    ratings?: Prisma.RatingUpdateManyWithoutUserNestedInput;
    wishlists?: Prisma.WishlistUpdateManyWithoutUserNestedInput;
    discussions?: Prisma.DiscussionUpdateManyWithoutUserNestedInput;
    replies?: Prisma.ReplyUpdateManyWithoutUserNestedInput;
    trainerRequest?: Prisma.TrainerRequestUpdateOneWithoutUserNestedInput;
    lessonCompletions?: Prisma.LessonCompletionUpdateManyWithoutUserNestedInput;
    userXp?: Prisma.UserXpUpdateOneWithoutUserNestedInput;
    xpHistory?: Prisma.XpHistoryUpdateManyWithoutUserNestedInput;
    loginStreak?: Prisma.UserLoginStreakUpdateOneWithoutUserNestedInput;
    coupons?: Prisma.CouponUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutOrdersInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    courses?: Prisma.CourseUncheckedUpdateManyWithoutTrainerNestedInput;
    enrollments?: Prisma.EnrollmentUncheckedUpdateManyWithoutUserNestedInput;
    ratings?: Prisma.RatingUncheckedUpdateManyWithoutUserNestedInput;
    wishlists?: Prisma.WishlistUncheckedUpdateManyWithoutUserNestedInput;
    discussions?: Prisma.DiscussionUncheckedUpdateManyWithoutUserNestedInput;
    replies?: Prisma.ReplyUncheckedUpdateManyWithoutUserNestedInput;
    trainerRequest?: Prisma.TrainerRequestUncheckedUpdateOneWithoutUserNestedInput;
    lessonCompletions?: Prisma.LessonCompletionUncheckedUpdateManyWithoutUserNestedInput;
    userXp?: Prisma.UserXpUncheckedUpdateOneWithoutUserNestedInput;
    xpHistory?: Prisma.XpHistoryUncheckedUpdateManyWithoutUserNestedInput;
    loginStreak?: Prisma.UserLoginStreakUncheckedUpdateOneWithoutUserNestedInput;
    coupons?: Prisma.CouponUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutUserXpInput = {
    name: string;
    email: string;
    password: string;
    role?: $Enums.UserRole;
    avatar?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    courses?: Prisma.CourseCreateNestedManyWithoutTrainerInput;
    enrollments?: Prisma.EnrollmentCreateNestedManyWithoutUserInput;
    ratings?: Prisma.RatingCreateNestedManyWithoutUserInput;
    wishlists?: Prisma.WishlistCreateNestedManyWithoutUserInput;
    discussions?: Prisma.DiscussionCreateNestedManyWithoutUserInput;
    replies?: Prisma.ReplyCreateNestedManyWithoutUserInput;
    orders?: Prisma.OrderCreateNestedManyWithoutUserInput;
    trainerRequest?: Prisma.TrainerRequestCreateNestedOneWithoutUserInput;
    lessonCompletions?: Prisma.LessonCompletionCreateNestedManyWithoutUserInput;
    xpHistory?: Prisma.XpHistoryCreateNestedManyWithoutUserInput;
    loginStreak?: Prisma.UserLoginStreakCreateNestedOneWithoutUserInput;
    coupons?: Prisma.CouponCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutUserXpInput = {
    id?: number;
    name: string;
    email: string;
    password: string;
    role?: $Enums.UserRole;
    avatar?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    courses?: Prisma.CourseUncheckedCreateNestedManyWithoutTrainerInput;
    enrollments?: Prisma.EnrollmentUncheckedCreateNestedManyWithoutUserInput;
    ratings?: Prisma.RatingUncheckedCreateNestedManyWithoutUserInput;
    wishlists?: Prisma.WishlistUncheckedCreateNestedManyWithoutUserInput;
    discussions?: Prisma.DiscussionUncheckedCreateNestedManyWithoutUserInput;
    replies?: Prisma.ReplyUncheckedCreateNestedManyWithoutUserInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutUserInput;
    trainerRequest?: Prisma.TrainerRequestUncheckedCreateNestedOneWithoutUserInput;
    lessonCompletions?: Prisma.LessonCompletionUncheckedCreateNestedManyWithoutUserInput;
    xpHistory?: Prisma.XpHistoryUncheckedCreateNestedManyWithoutUserInput;
    loginStreak?: Prisma.UserLoginStreakUncheckedCreateNestedOneWithoutUserInput;
    coupons?: Prisma.CouponUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutUserXpInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutUserXpInput, Prisma.UserUncheckedCreateWithoutUserXpInput>;
};
export type UserUpsertWithoutUserXpInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutUserXpInput, Prisma.UserUncheckedUpdateWithoutUserXpInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutUserXpInput, Prisma.UserUncheckedCreateWithoutUserXpInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutUserXpInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutUserXpInput, Prisma.UserUncheckedUpdateWithoutUserXpInput>;
};
export type UserUpdateWithoutUserXpInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    courses?: Prisma.CourseUpdateManyWithoutTrainerNestedInput;
    enrollments?: Prisma.EnrollmentUpdateManyWithoutUserNestedInput;
    ratings?: Prisma.RatingUpdateManyWithoutUserNestedInput;
    wishlists?: Prisma.WishlistUpdateManyWithoutUserNestedInput;
    discussions?: Prisma.DiscussionUpdateManyWithoutUserNestedInput;
    replies?: Prisma.ReplyUpdateManyWithoutUserNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutUserNestedInput;
    trainerRequest?: Prisma.TrainerRequestUpdateOneWithoutUserNestedInput;
    lessonCompletions?: Prisma.LessonCompletionUpdateManyWithoutUserNestedInput;
    xpHistory?: Prisma.XpHistoryUpdateManyWithoutUserNestedInput;
    loginStreak?: Prisma.UserLoginStreakUpdateOneWithoutUserNestedInput;
    coupons?: Prisma.CouponUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutUserXpInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    courses?: Prisma.CourseUncheckedUpdateManyWithoutTrainerNestedInput;
    enrollments?: Prisma.EnrollmentUncheckedUpdateManyWithoutUserNestedInput;
    ratings?: Prisma.RatingUncheckedUpdateManyWithoutUserNestedInput;
    wishlists?: Prisma.WishlistUncheckedUpdateManyWithoutUserNestedInput;
    discussions?: Prisma.DiscussionUncheckedUpdateManyWithoutUserNestedInput;
    replies?: Prisma.ReplyUncheckedUpdateManyWithoutUserNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutUserNestedInput;
    trainerRequest?: Prisma.TrainerRequestUncheckedUpdateOneWithoutUserNestedInput;
    lessonCompletions?: Prisma.LessonCompletionUncheckedUpdateManyWithoutUserNestedInput;
    xpHistory?: Prisma.XpHistoryUncheckedUpdateManyWithoutUserNestedInput;
    loginStreak?: Prisma.UserLoginStreakUncheckedUpdateOneWithoutUserNestedInput;
    coupons?: Prisma.CouponUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutXpHistoryInput = {
    name: string;
    email: string;
    password: string;
    role?: $Enums.UserRole;
    avatar?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    courses?: Prisma.CourseCreateNestedManyWithoutTrainerInput;
    enrollments?: Prisma.EnrollmentCreateNestedManyWithoutUserInput;
    ratings?: Prisma.RatingCreateNestedManyWithoutUserInput;
    wishlists?: Prisma.WishlistCreateNestedManyWithoutUserInput;
    discussions?: Prisma.DiscussionCreateNestedManyWithoutUserInput;
    replies?: Prisma.ReplyCreateNestedManyWithoutUserInput;
    orders?: Prisma.OrderCreateNestedManyWithoutUserInput;
    trainerRequest?: Prisma.TrainerRequestCreateNestedOneWithoutUserInput;
    lessonCompletions?: Prisma.LessonCompletionCreateNestedManyWithoutUserInput;
    userXp?: Prisma.UserXpCreateNestedOneWithoutUserInput;
    loginStreak?: Prisma.UserLoginStreakCreateNestedOneWithoutUserInput;
    coupons?: Prisma.CouponCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutXpHistoryInput = {
    id?: number;
    name: string;
    email: string;
    password: string;
    role?: $Enums.UserRole;
    avatar?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    courses?: Prisma.CourseUncheckedCreateNestedManyWithoutTrainerInput;
    enrollments?: Prisma.EnrollmentUncheckedCreateNestedManyWithoutUserInput;
    ratings?: Prisma.RatingUncheckedCreateNestedManyWithoutUserInput;
    wishlists?: Prisma.WishlistUncheckedCreateNestedManyWithoutUserInput;
    discussions?: Prisma.DiscussionUncheckedCreateNestedManyWithoutUserInput;
    replies?: Prisma.ReplyUncheckedCreateNestedManyWithoutUserInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutUserInput;
    trainerRequest?: Prisma.TrainerRequestUncheckedCreateNestedOneWithoutUserInput;
    lessonCompletions?: Prisma.LessonCompletionUncheckedCreateNestedManyWithoutUserInput;
    userXp?: Prisma.UserXpUncheckedCreateNestedOneWithoutUserInput;
    loginStreak?: Prisma.UserLoginStreakUncheckedCreateNestedOneWithoutUserInput;
    coupons?: Prisma.CouponUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutXpHistoryInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutXpHistoryInput, Prisma.UserUncheckedCreateWithoutXpHistoryInput>;
};
export type UserUpsertWithoutXpHistoryInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutXpHistoryInput, Prisma.UserUncheckedUpdateWithoutXpHistoryInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutXpHistoryInput, Prisma.UserUncheckedCreateWithoutXpHistoryInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutXpHistoryInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutXpHistoryInput, Prisma.UserUncheckedUpdateWithoutXpHistoryInput>;
};
export type UserUpdateWithoutXpHistoryInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    courses?: Prisma.CourseUpdateManyWithoutTrainerNestedInput;
    enrollments?: Prisma.EnrollmentUpdateManyWithoutUserNestedInput;
    ratings?: Prisma.RatingUpdateManyWithoutUserNestedInput;
    wishlists?: Prisma.WishlistUpdateManyWithoutUserNestedInput;
    discussions?: Prisma.DiscussionUpdateManyWithoutUserNestedInput;
    replies?: Prisma.ReplyUpdateManyWithoutUserNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutUserNestedInput;
    trainerRequest?: Prisma.TrainerRequestUpdateOneWithoutUserNestedInput;
    lessonCompletions?: Prisma.LessonCompletionUpdateManyWithoutUserNestedInput;
    userXp?: Prisma.UserXpUpdateOneWithoutUserNestedInput;
    loginStreak?: Prisma.UserLoginStreakUpdateOneWithoutUserNestedInput;
    coupons?: Prisma.CouponUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutXpHistoryInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    courses?: Prisma.CourseUncheckedUpdateManyWithoutTrainerNestedInput;
    enrollments?: Prisma.EnrollmentUncheckedUpdateManyWithoutUserNestedInput;
    ratings?: Prisma.RatingUncheckedUpdateManyWithoutUserNestedInput;
    wishlists?: Prisma.WishlistUncheckedUpdateManyWithoutUserNestedInput;
    discussions?: Prisma.DiscussionUncheckedUpdateManyWithoutUserNestedInput;
    replies?: Prisma.ReplyUncheckedUpdateManyWithoutUserNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutUserNestedInput;
    trainerRequest?: Prisma.TrainerRequestUncheckedUpdateOneWithoutUserNestedInput;
    lessonCompletions?: Prisma.LessonCompletionUncheckedUpdateManyWithoutUserNestedInput;
    userXp?: Prisma.UserXpUncheckedUpdateOneWithoutUserNestedInput;
    loginStreak?: Prisma.UserLoginStreakUncheckedUpdateOneWithoutUserNestedInput;
    coupons?: Prisma.CouponUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutLoginStreakInput = {
    name: string;
    email: string;
    password: string;
    role?: $Enums.UserRole;
    avatar?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    courses?: Prisma.CourseCreateNestedManyWithoutTrainerInput;
    enrollments?: Prisma.EnrollmentCreateNestedManyWithoutUserInput;
    ratings?: Prisma.RatingCreateNestedManyWithoutUserInput;
    wishlists?: Prisma.WishlistCreateNestedManyWithoutUserInput;
    discussions?: Prisma.DiscussionCreateNestedManyWithoutUserInput;
    replies?: Prisma.ReplyCreateNestedManyWithoutUserInput;
    orders?: Prisma.OrderCreateNestedManyWithoutUserInput;
    trainerRequest?: Prisma.TrainerRequestCreateNestedOneWithoutUserInput;
    lessonCompletions?: Prisma.LessonCompletionCreateNestedManyWithoutUserInput;
    userXp?: Prisma.UserXpCreateNestedOneWithoutUserInput;
    xpHistory?: Prisma.XpHistoryCreateNestedManyWithoutUserInput;
    coupons?: Prisma.CouponCreateNestedManyWithoutUserInput;
};
export type UserUncheckedCreateWithoutLoginStreakInput = {
    id?: number;
    name: string;
    email: string;
    password: string;
    role?: $Enums.UserRole;
    avatar?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    courses?: Prisma.CourseUncheckedCreateNestedManyWithoutTrainerInput;
    enrollments?: Prisma.EnrollmentUncheckedCreateNestedManyWithoutUserInput;
    ratings?: Prisma.RatingUncheckedCreateNestedManyWithoutUserInput;
    wishlists?: Prisma.WishlistUncheckedCreateNestedManyWithoutUserInput;
    discussions?: Prisma.DiscussionUncheckedCreateNestedManyWithoutUserInput;
    replies?: Prisma.ReplyUncheckedCreateNestedManyWithoutUserInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutUserInput;
    trainerRequest?: Prisma.TrainerRequestUncheckedCreateNestedOneWithoutUserInput;
    lessonCompletions?: Prisma.LessonCompletionUncheckedCreateNestedManyWithoutUserInput;
    userXp?: Prisma.UserXpUncheckedCreateNestedOneWithoutUserInput;
    xpHistory?: Prisma.XpHistoryUncheckedCreateNestedManyWithoutUserInput;
    coupons?: Prisma.CouponUncheckedCreateNestedManyWithoutUserInput;
};
export type UserCreateOrConnectWithoutLoginStreakInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutLoginStreakInput, Prisma.UserUncheckedCreateWithoutLoginStreakInput>;
};
export type UserUpsertWithoutLoginStreakInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutLoginStreakInput, Prisma.UserUncheckedUpdateWithoutLoginStreakInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutLoginStreakInput, Prisma.UserUncheckedCreateWithoutLoginStreakInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutLoginStreakInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutLoginStreakInput, Prisma.UserUncheckedUpdateWithoutLoginStreakInput>;
};
export type UserUpdateWithoutLoginStreakInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    courses?: Prisma.CourseUpdateManyWithoutTrainerNestedInput;
    enrollments?: Prisma.EnrollmentUpdateManyWithoutUserNestedInput;
    ratings?: Prisma.RatingUpdateManyWithoutUserNestedInput;
    wishlists?: Prisma.WishlistUpdateManyWithoutUserNestedInput;
    discussions?: Prisma.DiscussionUpdateManyWithoutUserNestedInput;
    replies?: Prisma.ReplyUpdateManyWithoutUserNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutUserNestedInput;
    trainerRequest?: Prisma.TrainerRequestUpdateOneWithoutUserNestedInput;
    lessonCompletions?: Prisma.LessonCompletionUpdateManyWithoutUserNestedInput;
    userXp?: Prisma.UserXpUpdateOneWithoutUserNestedInput;
    xpHistory?: Prisma.XpHistoryUpdateManyWithoutUserNestedInput;
    coupons?: Prisma.CouponUpdateManyWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutLoginStreakInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    courses?: Prisma.CourseUncheckedUpdateManyWithoutTrainerNestedInput;
    enrollments?: Prisma.EnrollmentUncheckedUpdateManyWithoutUserNestedInput;
    ratings?: Prisma.RatingUncheckedUpdateManyWithoutUserNestedInput;
    wishlists?: Prisma.WishlistUncheckedUpdateManyWithoutUserNestedInput;
    discussions?: Prisma.DiscussionUncheckedUpdateManyWithoutUserNestedInput;
    replies?: Prisma.ReplyUncheckedUpdateManyWithoutUserNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutUserNestedInput;
    trainerRequest?: Prisma.TrainerRequestUncheckedUpdateOneWithoutUserNestedInput;
    lessonCompletions?: Prisma.LessonCompletionUncheckedUpdateManyWithoutUserNestedInput;
    userXp?: Prisma.UserXpUncheckedUpdateOneWithoutUserNestedInput;
    xpHistory?: Prisma.XpHistoryUncheckedUpdateManyWithoutUserNestedInput;
    coupons?: Prisma.CouponUncheckedUpdateManyWithoutUserNestedInput;
};
export type UserCreateWithoutCouponsInput = {
    name: string;
    email: string;
    password: string;
    role?: $Enums.UserRole;
    avatar?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    courses?: Prisma.CourseCreateNestedManyWithoutTrainerInput;
    enrollments?: Prisma.EnrollmentCreateNestedManyWithoutUserInput;
    ratings?: Prisma.RatingCreateNestedManyWithoutUserInput;
    wishlists?: Prisma.WishlistCreateNestedManyWithoutUserInput;
    discussions?: Prisma.DiscussionCreateNestedManyWithoutUserInput;
    replies?: Prisma.ReplyCreateNestedManyWithoutUserInput;
    orders?: Prisma.OrderCreateNestedManyWithoutUserInput;
    trainerRequest?: Prisma.TrainerRequestCreateNestedOneWithoutUserInput;
    lessonCompletions?: Prisma.LessonCompletionCreateNestedManyWithoutUserInput;
    userXp?: Prisma.UserXpCreateNestedOneWithoutUserInput;
    xpHistory?: Prisma.XpHistoryCreateNestedManyWithoutUserInput;
    loginStreak?: Prisma.UserLoginStreakCreateNestedOneWithoutUserInput;
};
export type UserUncheckedCreateWithoutCouponsInput = {
    id?: number;
    name: string;
    email: string;
    password: string;
    role?: $Enums.UserRole;
    avatar?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    courses?: Prisma.CourseUncheckedCreateNestedManyWithoutTrainerInput;
    enrollments?: Prisma.EnrollmentUncheckedCreateNestedManyWithoutUserInput;
    ratings?: Prisma.RatingUncheckedCreateNestedManyWithoutUserInput;
    wishlists?: Prisma.WishlistUncheckedCreateNestedManyWithoutUserInput;
    discussions?: Prisma.DiscussionUncheckedCreateNestedManyWithoutUserInput;
    replies?: Prisma.ReplyUncheckedCreateNestedManyWithoutUserInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutUserInput;
    trainerRequest?: Prisma.TrainerRequestUncheckedCreateNestedOneWithoutUserInput;
    lessonCompletions?: Prisma.LessonCompletionUncheckedCreateNestedManyWithoutUserInput;
    userXp?: Prisma.UserXpUncheckedCreateNestedOneWithoutUserInput;
    xpHistory?: Prisma.XpHistoryUncheckedCreateNestedManyWithoutUserInput;
    loginStreak?: Prisma.UserLoginStreakUncheckedCreateNestedOneWithoutUserInput;
};
export type UserCreateOrConnectWithoutCouponsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutCouponsInput, Prisma.UserUncheckedCreateWithoutCouponsInput>;
};
export type UserUpsertWithoutCouponsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutCouponsInput, Prisma.UserUncheckedUpdateWithoutCouponsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutCouponsInput, Prisma.UserUncheckedCreateWithoutCouponsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutCouponsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutCouponsInput, Prisma.UserUncheckedUpdateWithoutCouponsInput>;
};
export type UserUpdateWithoutCouponsInput = {
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    courses?: Prisma.CourseUpdateManyWithoutTrainerNestedInput;
    enrollments?: Prisma.EnrollmentUpdateManyWithoutUserNestedInput;
    ratings?: Prisma.RatingUpdateManyWithoutUserNestedInput;
    wishlists?: Prisma.WishlistUpdateManyWithoutUserNestedInput;
    discussions?: Prisma.DiscussionUpdateManyWithoutUserNestedInput;
    replies?: Prisma.ReplyUpdateManyWithoutUserNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutUserNestedInput;
    trainerRequest?: Prisma.TrainerRequestUpdateOneWithoutUserNestedInput;
    lessonCompletions?: Prisma.LessonCompletionUpdateManyWithoutUserNestedInput;
    userXp?: Prisma.UserXpUpdateOneWithoutUserNestedInput;
    xpHistory?: Prisma.XpHistoryUpdateManyWithoutUserNestedInput;
    loginStreak?: Prisma.UserLoginStreakUpdateOneWithoutUserNestedInput;
};
export type UserUncheckedUpdateWithoutCouponsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    password?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    avatar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    courses?: Prisma.CourseUncheckedUpdateManyWithoutTrainerNestedInput;
    enrollments?: Prisma.EnrollmentUncheckedUpdateManyWithoutUserNestedInput;
    ratings?: Prisma.RatingUncheckedUpdateManyWithoutUserNestedInput;
    wishlists?: Prisma.WishlistUncheckedUpdateManyWithoutUserNestedInput;
    discussions?: Prisma.DiscussionUncheckedUpdateManyWithoutUserNestedInput;
    replies?: Prisma.ReplyUncheckedUpdateManyWithoutUserNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutUserNestedInput;
    trainerRequest?: Prisma.TrainerRequestUncheckedUpdateOneWithoutUserNestedInput;
    lessonCompletions?: Prisma.LessonCompletionUncheckedUpdateManyWithoutUserNestedInput;
    userXp?: Prisma.UserXpUncheckedUpdateOneWithoutUserNestedInput;
    xpHistory?: Prisma.XpHistoryUncheckedUpdateManyWithoutUserNestedInput;
    loginStreak?: Prisma.UserLoginStreakUncheckedUpdateOneWithoutUserNestedInput;
};
/**
 * Count Type UserCountOutputType
 */
export type UserCountOutputType = {
    courses: number;
    enrollments: number;
    ratings: number;
    wishlists: number;
    discussions: number;
    replies: number;
    orders: number;
    lessonCompletions: number;
    xpHistory: number;
    coupons: number;
};
export type UserCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    courses?: boolean | UserCountOutputTypeCountCoursesArgs;
    enrollments?: boolean | UserCountOutputTypeCountEnrollmentsArgs;
    ratings?: boolean | UserCountOutputTypeCountRatingsArgs;
    wishlists?: boolean | UserCountOutputTypeCountWishlistsArgs;
    discussions?: boolean | UserCountOutputTypeCountDiscussionsArgs;
    replies?: boolean | UserCountOutputTypeCountRepliesArgs;
    orders?: boolean | UserCountOutputTypeCountOrdersArgs;
    lessonCompletions?: boolean | UserCountOutputTypeCountLessonCompletionsArgs;
    xpHistory?: boolean | UserCountOutputTypeCountXpHistoryArgs;
    coupons?: boolean | UserCountOutputTypeCountCouponsArgs;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: Prisma.UserCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountCoursesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CourseWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountEnrollmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EnrollmentWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountRatingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RatingWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountWishlistsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WishlistWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountDiscussionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DiscussionWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountRepliesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReplyWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrderWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountLessonCompletionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LessonCompletionWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountXpHistoryArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.XpHistoryWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountCouponsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CouponWhereInput;
};
export type UserSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    email?: boolean;
    password?: boolean;
    role?: boolean;
    avatar?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    courses?: boolean | Prisma.User$coursesArgs<ExtArgs>;
    enrollments?: boolean | Prisma.User$enrollmentsArgs<ExtArgs>;
    ratings?: boolean | Prisma.User$ratingsArgs<ExtArgs>;
    wishlists?: boolean | Prisma.User$wishlistsArgs<ExtArgs>;
    discussions?: boolean | Prisma.User$discussionsArgs<ExtArgs>;
    replies?: boolean | Prisma.User$repliesArgs<ExtArgs>;
    orders?: boolean | Prisma.User$ordersArgs<ExtArgs>;
    trainerRequest?: boolean | Prisma.User$trainerRequestArgs<ExtArgs>;
    lessonCompletions?: boolean | Prisma.User$lessonCompletionsArgs<ExtArgs>;
    userXp?: boolean | Prisma.User$userXpArgs<ExtArgs>;
    xpHistory?: boolean | Prisma.User$xpHistoryArgs<ExtArgs>;
    loginStreak?: boolean | Prisma.User$loginStreakArgs<ExtArgs>;
    coupons?: boolean | Prisma.User$couponsArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["user"]>;
export type UserSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    email?: boolean;
    password?: boolean;
    role?: boolean;
    avatar?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["user"]>;
export type UserSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    email?: boolean;
    password?: boolean;
    role?: boolean;
    avatar?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["user"]>;
export type UserSelectScalar = {
    id?: boolean;
    name?: boolean;
    email?: boolean;
    password?: boolean;
    role?: boolean;
    avatar?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type UserOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "email" | "password" | "role" | "avatar" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>;
export type UserInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    courses?: boolean | Prisma.User$coursesArgs<ExtArgs>;
    enrollments?: boolean | Prisma.User$enrollmentsArgs<ExtArgs>;
    ratings?: boolean | Prisma.User$ratingsArgs<ExtArgs>;
    wishlists?: boolean | Prisma.User$wishlistsArgs<ExtArgs>;
    discussions?: boolean | Prisma.User$discussionsArgs<ExtArgs>;
    replies?: boolean | Prisma.User$repliesArgs<ExtArgs>;
    orders?: boolean | Prisma.User$ordersArgs<ExtArgs>;
    trainerRequest?: boolean | Prisma.User$trainerRequestArgs<ExtArgs>;
    lessonCompletions?: boolean | Prisma.User$lessonCompletionsArgs<ExtArgs>;
    userXp?: boolean | Prisma.User$userXpArgs<ExtArgs>;
    xpHistory?: boolean | Prisma.User$xpHistoryArgs<ExtArgs>;
    loginStreak?: boolean | Prisma.User$loginStreakArgs<ExtArgs>;
    coupons?: boolean | Prisma.User$couponsArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
};
export type UserIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type UserIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $UserPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "User";
    objects: {
        courses: Prisma.$CoursePayload<ExtArgs>[];
        enrollments: Prisma.$EnrollmentPayload<ExtArgs>[];
        ratings: Prisma.$RatingPayload<ExtArgs>[];
        wishlists: Prisma.$WishlistPayload<ExtArgs>[];
        discussions: Prisma.$DiscussionPayload<ExtArgs>[];
        replies: Prisma.$ReplyPayload<ExtArgs>[];
        orders: Prisma.$OrderPayload<ExtArgs>[];
        trainerRequest: Prisma.$TrainerRequestPayload<ExtArgs> | null;
        lessonCompletions: Prisma.$LessonCompletionPayload<ExtArgs>[];
        userXp: Prisma.$UserXpPayload<ExtArgs> | null;
        xpHistory: Prisma.$XpHistoryPayload<ExtArgs>[];
        loginStreak: Prisma.$UserLoginStreakPayload<ExtArgs> | null;
        coupons: Prisma.$CouponPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: $Enums.UserRole;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["user"]>;
    composites: {};
};
export type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserPayload, S>;
export type UserCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserCountAggregateInputType | true;
};
export interface UserDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['User'];
        meta: {
            name: 'User';
        };
    };
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: Prisma.SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: Prisma.SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     *
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     *
     */
    findMany<T extends UserFindManyArgs>(args?: Prisma.SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     *
     */
    create<T extends UserCreateArgs>(args: Prisma.SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UserCreateManyArgs>(args?: Prisma.SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     *
     */
    delete<T extends UserDeleteArgs>(args: Prisma.SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UserUpdateArgs>(args: Prisma.SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UserUpdateManyArgs>(args: Prisma.SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: Prisma.SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(args?: Prisma.Subset<T, UserCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Prisma.Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>;
    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends UserGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserGroupByArgs['orderBy'];
    } : {
        orderBy?: UserGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the User model
     */
    readonly fields: UserFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for User.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__UserClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    courses<T extends Prisma.User$coursesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$coursesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    enrollments<T extends Prisma.User$enrollmentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$enrollmentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    ratings<T extends Prisma.User$ratingsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$ratingsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RatingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    wishlists<T extends Prisma.User$wishlistsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$wishlistsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WishlistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    discussions<T extends Prisma.User$discussionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$discussionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DiscussionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    replies<T extends Prisma.User$repliesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$repliesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReplyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    orders<T extends Prisma.User$ordersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    trainerRequest<T extends Prisma.User$trainerRequestArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$trainerRequestArgs<ExtArgs>>): Prisma.Prisma__TrainerRequestClient<runtime.Types.Result.GetResult<Prisma.$TrainerRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    lessonCompletions<T extends Prisma.User$lessonCompletionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$lessonCompletionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LessonCompletionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    userXp<T extends Prisma.User$userXpArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$userXpArgs<ExtArgs>>): Prisma.Prisma__UserXpClient<runtime.Types.Result.GetResult<Prisma.$UserXpPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    xpHistory<T extends Prisma.User$xpHistoryArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$xpHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$XpHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    loginStreak<T extends Prisma.User$loginStreakArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$loginStreakArgs<ExtArgs>>): Prisma.Prisma__UserLoginStreakClient<runtime.Types.Result.GetResult<Prisma.$UserLoginStreakPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    coupons<T extends Prisma.User$couponsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$couponsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CouponPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the User model
 */
export interface UserFieldRefs {
    readonly id: Prisma.FieldRef<"User", 'Int'>;
    readonly name: Prisma.FieldRef<"User", 'String'>;
    readonly email: Prisma.FieldRef<"User", 'String'>;
    readonly password: Prisma.FieldRef<"User", 'String'>;
    readonly role: Prisma.FieldRef<"User", 'UserRole'>;
    readonly avatar: Prisma.FieldRef<"User", 'String'>;
    readonly createdAt: Prisma.FieldRef<"User", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"User", 'DateTime'>;
}
/**
 * User findUnique
 */
export type UserFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User findUniqueOrThrow
 */
export type UserFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User findFirst
 */
export type UserFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * User findFirstOrThrow
 */
export type UserFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * User findMany
 */
export type UserFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which Users to fetch.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Users.
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * User create
 */
export type UserCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * The data needed to create a User.
     */
    data: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
};
/**
 * User createMany
 */
export type UserCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * User createManyAndReturn
 */
export type UserCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * The data used to create many Users.
     */
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * User update
 */
export type UserUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * The data needed to update a User.
     */
    data: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
    /**
     * Choose, which User to update.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User updateMany
 */
export type UserUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: Prisma.UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
};
/**
 * User updateManyAndReturn
 */
export type UserUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * The data used to update Users.
     */
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: Prisma.UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
};
/**
 * User upsert
 */
export type UserUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: Prisma.UserWhereUniqueInput;
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
};
/**
 * User delete
 */
export type UserDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter which User to delete.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User deleteMany
 */
export type UserDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: Prisma.UserWhereInput;
    /**
     * Limit how many Users to delete.
     */
    limit?: number;
};
/**
 * User.courses
 */
export type User$coursesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: Prisma.CourseSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Course
     */
    omit?: Prisma.CourseOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CourseInclude<ExtArgs> | null;
    where?: Prisma.CourseWhereInput;
    orderBy?: Prisma.CourseOrderByWithRelationInput | Prisma.CourseOrderByWithRelationInput[];
    cursor?: Prisma.CourseWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CourseScalarFieldEnum | Prisma.CourseScalarFieldEnum[];
};
/**
 * User.enrollments
 */
export type User$enrollmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: Prisma.EnrollmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: Prisma.EnrollmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EnrollmentInclude<ExtArgs> | null;
    where?: Prisma.EnrollmentWhereInput;
    orderBy?: Prisma.EnrollmentOrderByWithRelationInput | Prisma.EnrollmentOrderByWithRelationInput[];
    cursor?: Prisma.EnrollmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EnrollmentScalarFieldEnum | Prisma.EnrollmentScalarFieldEnum[];
};
/**
 * User.ratings
 */
export type User$ratingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Rating
     */
    select?: Prisma.RatingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Rating
     */
    omit?: Prisma.RatingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RatingInclude<ExtArgs> | null;
    where?: Prisma.RatingWhereInput;
    orderBy?: Prisma.RatingOrderByWithRelationInput | Prisma.RatingOrderByWithRelationInput[];
    cursor?: Prisma.RatingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RatingScalarFieldEnum | Prisma.RatingScalarFieldEnum[];
};
/**
 * User.wishlists
 */
export type User$wishlistsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wishlist
     */
    select?: Prisma.WishlistSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Wishlist
     */
    omit?: Prisma.WishlistOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WishlistInclude<ExtArgs> | null;
    where?: Prisma.WishlistWhereInput;
    orderBy?: Prisma.WishlistOrderByWithRelationInput | Prisma.WishlistOrderByWithRelationInput[];
    cursor?: Prisma.WishlistWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WishlistScalarFieldEnum | Prisma.WishlistScalarFieldEnum[];
};
/**
 * User.discussions
 */
export type User$discussionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Discussion
     */
    select?: Prisma.DiscussionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Discussion
     */
    omit?: Prisma.DiscussionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DiscussionInclude<ExtArgs> | null;
    where?: Prisma.DiscussionWhereInput;
    orderBy?: Prisma.DiscussionOrderByWithRelationInput | Prisma.DiscussionOrderByWithRelationInput[];
    cursor?: Prisma.DiscussionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DiscussionScalarFieldEnum | Prisma.DiscussionScalarFieldEnum[];
};
/**
 * User.replies
 */
export type User$repliesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reply
     */
    select?: Prisma.ReplySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Reply
     */
    omit?: Prisma.ReplyOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ReplyInclude<ExtArgs> | null;
    where?: Prisma.ReplyWhereInput;
    orderBy?: Prisma.ReplyOrderByWithRelationInput | Prisma.ReplyOrderByWithRelationInput[];
    cursor?: Prisma.ReplyWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReplyScalarFieldEnum | Prisma.ReplyScalarFieldEnum[];
};
/**
 * User.orders
 */
export type User$ordersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: Prisma.OrderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Order
     */
    omit?: Prisma.OrderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OrderInclude<ExtArgs> | null;
    where?: Prisma.OrderWhereInput;
    orderBy?: Prisma.OrderOrderByWithRelationInput | Prisma.OrderOrderByWithRelationInput[];
    cursor?: Prisma.OrderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OrderScalarFieldEnum | Prisma.OrderScalarFieldEnum[];
};
/**
 * User.trainerRequest
 */
export type User$trainerRequestArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerRequest
     */
    select?: Prisma.TrainerRequestSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the TrainerRequest
     */
    omit?: Prisma.TrainerRequestOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TrainerRequestInclude<ExtArgs> | null;
    where?: Prisma.TrainerRequestWhereInput;
};
/**
 * User.lessonCompletions
 */
export type User$lessonCompletionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LessonCompletion
     */
    select?: Prisma.LessonCompletionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the LessonCompletion
     */
    omit?: Prisma.LessonCompletionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LessonCompletionInclude<ExtArgs> | null;
    where?: Prisma.LessonCompletionWhereInput;
    orderBy?: Prisma.LessonCompletionOrderByWithRelationInput | Prisma.LessonCompletionOrderByWithRelationInput[];
    cursor?: Prisma.LessonCompletionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LessonCompletionScalarFieldEnum | Prisma.LessonCompletionScalarFieldEnum[];
};
/**
 * User.userXp
 */
export type User$userXpArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserXp
     */
    select?: Prisma.UserXpSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserXp
     */
    omit?: Prisma.UserXpOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserXpInclude<ExtArgs> | null;
    where?: Prisma.UserXpWhereInput;
};
/**
 * User.xpHistory
 */
export type User$xpHistoryArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the XpHistory
     */
    select?: Prisma.XpHistorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the XpHistory
     */
    omit?: Prisma.XpHistoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.XpHistoryInclude<ExtArgs> | null;
    where?: Prisma.XpHistoryWhereInput;
    orderBy?: Prisma.XpHistoryOrderByWithRelationInput | Prisma.XpHistoryOrderByWithRelationInput[];
    cursor?: Prisma.XpHistoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.XpHistoryScalarFieldEnum | Prisma.XpHistoryScalarFieldEnum[];
};
/**
 * User.loginStreak
 */
export type User$loginStreakArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLoginStreak
     */
    select?: Prisma.UserLoginStreakSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserLoginStreak
     */
    omit?: Prisma.UserLoginStreakOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserLoginStreakInclude<ExtArgs> | null;
    where?: Prisma.UserLoginStreakWhereInput;
};
/**
 * User.coupons
 */
export type User$couponsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Coupon
     */
    select?: Prisma.CouponSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Coupon
     */
    omit?: Prisma.CouponOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CouponInclude<ExtArgs> | null;
    where?: Prisma.CouponWhereInput;
    orderBy?: Prisma.CouponOrderByWithRelationInput | Prisma.CouponOrderByWithRelationInput[];
    cursor?: Prisma.CouponWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CouponScalarFieldEnum | Prisma.CouponScalarFieldEnum[];
};
/**
 * User without action
 */
export type UserDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
};
//# sourceMappingURL=User.d.ts.map