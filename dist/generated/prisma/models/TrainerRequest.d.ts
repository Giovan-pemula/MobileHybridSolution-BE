import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model TrainerRequest
 *
 */
export type TrainerRequestModel = runtime.Types.Result.DefaultSelection<Prisma.$TrainerRequestPayload>;
export type AggregateTrainerRequest = {
    _count: TrainerRequestCountAggregateOutputType | null;
    _avg: TrainerRequestAvgAggregateOutputType | null;
    _sum: TrainerRequestSumAggregateOutputType | null;
    _min: TrainerRequestMinAggregateOutputType | null;
    _max: TrainerRequestMaxAggregateOutputType | null;
};
export type TrainerRequestAvgAggregateOutputType = {
    id: number | null;
    userId: number | null;
};
export type TrainerRequestSumAggregateOutputType = {
    id: number | null;
    userId: number | null;
};
export type TrainerRequestMinAggregateOutputType = {
    id: number | null;
    userId: number | null;
    cvUrl: string | null;
    bio: string | null;
    experience: string | null;
    status: $Enums.TrainerRequestStatus | null;
    createdAt: Date | null;
};
export type TrainerRequestMaxAggregateOutputType = {
    id: number | null;
    userId: number | null;
    cvUrl: string | null;
    bio: string | null;
    experience: string | null;
    status: $Enums.TrainerRequestStatus | null;
    createdAt: Date | null;
};
export type TrainerRequestCountAggregateOutputType = {
    id: number;
    userId: number;
    cvUrl: number;
    bio: number;
    experience: number;
    status: number;
    createdAt: number;
    _all: number;
};
export type TrainerRequestAvgAggregateInputType = {
    id?: true;
    userId?: true;
};
export type TrainerRequestSumAggregateInputType = {
    id?: true;
    userId?: true;
};
export type TrainerRequestMinAggregateInputType = {
    id?: true;
    userId?: true;
    cvUrl?: true;
    bio?: true;
    experience?: true;
    status?: true;
    createdAt?: true;
};
export type TrainerRequestMaxAggregateInputType = {
    id?: true;
    userId?: true;
    cvUrl?: true;
    bio?: true;
    experience?: true;
    status?: true;
    createdAt?: true;
};
export type TrainerRequestCountAggregateInputType = {
    id?: true;
    userId?: true;
    cvUrl?: true;
    bio?: true;
    experience?: true;
    status?: true;
    createdAt?: true;
    _all?: true;
};
export type TrainerRequestAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which TrainerRequest to aggregate.
     */
    where?: Prisma.TrainerRequestWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of TrainerRequests to fetch.
     */
    orderBy?: Prisma.TrainerRequestOrderByWithRelationInput | Prisma.TrainerRequestOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.TrainerRequestWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` TrainerRequests from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` TrainerRequests.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned TrainerRequests
    **/
    _count?: true | TrainerRequestCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: TrainerRequestAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: TrainerRequestSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: TrainerRequestMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: TrainerRequestMaxAggregateInputType;
};
export type GetTrainerRequestAggregateType<T extends TrainerRequestAggregateArgs> = {
    [P in keyof T & keyof AggregateTrainerRequest]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTrainerRequest[P]> : Prisma.GetScalarType<T[P], AggregateTrainerRequest[P]>;
};
export type TrainerRequestGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TrainerRequestWhereInput;
    orderBy?: Prisma.TrainerRequestOrderByWithAggregationInput | Prisma.TrainerRequestOrderByWithAggregationInput[];
    by: Prisma.TrainerRequestScalarFieldEnum[] | Prisma.TrainerRequestScalarFieldEnum;
    having?: Prisma.TrainerRequestScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TrainerRequestCountAggregateInputType | true;
    _avg?: TrainerRequestAvgAggregateInputType;
    _sum?: TrainerRequestSumAggregateInputType;
    _min?: TrainerRequestMinAggregateInputType;
    _max?: TrainerRequestMaxAggregateInputType;
};
export type TrainerRequestGroupByOutputType = {
    id: number;
    userId: number;
    cvUrl: string;
    bio: string;
    experience: string;
    status: $Enums.TrainerRequestStatus;
    createdAt: Date;
    _count: TrainerRequestCountAggregateOutputType | null;
    _avg: TrainerRequestAvgAggregateOutputType | null;
    _sum: TrainerRequestSumAggregateOutputType | null;
    _min: TrainerRequestMinAggregateOutputType | null;
    _max: TrainerRequestMaxAggregateOutputType | null;
};
export type GetTrainerRequestGroupByPayload<T extends TrainerRequestGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TrainerRequestGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TrainerRequestGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TrainerRequestGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TrainerRequestGroupByOutputType[P]>;
}>>;
export type TrainerRequestWhereInput = {
    AND?: Prisma.TrainerRequestWhereInput | Prisma.TrainerRequestWhereInput[];
    OR?: Prisma.TrainerRequestWhereInput[];
    NOT?: Prisma.TrainerRequestWhereInput | Prisma.TrainerRequestWhereInput[];
    id?: Prisma.IntFilter<"TrainerRequest"> | number;
    userId?: Prisma.IntFilter<"TrainerRequest"> | number;
    cvUrl?: Prisma.StringFilter<"TrainerRequest"> | string;
    bio?: Prisma.StringFilter<"TrainerRequest"> | string;
    experience?: Prisma.StringFilter<"TrainerRequest"> | string;
    status?: Prisma.EnumTrainerRequestStatusFilter<"TrainerRequest"> | $Enums.TrainerRequestStatus;
    createdAt?: Prisma.DateTimeFilter<"TrainerRequest"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type TrainerRequestOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    cvUrl?: Prisma.SortOrder;
    bio?: Prisma.SortOrder;
    experience?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type TrainerRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    userId?: number;
    AND?: Prisma.TrainerRequestWhereInput | Prisma.TrainerRequestWhereInput[];
    OR?: Prisma.TrainerRequestWhereInput[];
    NOT?: Prisma.TrainerRequestWhereInput | Prisma.TrainerRequestWhereInput[];
    cvUrl?: Prisma.StringFilter<"TrainerRequest"> | string;
    bio?: Prisma.StringFilter<"TrainerRequest"> | string;
    experience?: Prisma.StringFilter<"TrainerRequest"> | string;
    status?: Prisma.EnumTrainerRequestStatusFilter<"TrainerRequest"> | $Enums.TrainerRequestStatus;
    createdAt?: Prisma.DateTimeFilter<"TrainerRequest"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "userId">;
export type TrainerRequestOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    cvUrl?: Prisma.SortOrder;
    bio?: Prisma.SortOrder;
    experience?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.TrainerRequestCountOrderByAggregateInput;
    _avg?: Prisma.TrainerRequestAvgOrderByAggregateInput;
    _max?: Prisma.TrainerRequestMaxOrderByAggregateInput;
    _min?: Prisma.TrainerRequestMinOrderByAggregateInput;
    _sum?: Prisma.TrainerRequestSumOrderByAggregateInput;
};
export type TrainerRequestScalarWhereWithAggregatesInput = {
    AND?: Prisma.TrainerRequestScalarWhereWithAggregatesInput | Prisma.TrainerRequestScalarWhereWithAggregatesInput[];
    OR?: Prisma.TrainerRequestScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TrainerRequestScalarWhereWithAggregatesInput | Prisma.TrainerRequestScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"TrainerRequest"> | number;
    userId?: Prisma.IntWithAggregatesFilter<"TrainerRequest"> | number;
    cvUrl?: Prisma.StringWithAggregatesFilter<"TrainerRequest"> | string;
    bio?: Prisma.StringWithAggregatesFilter<"TrainerRequest"> | string;
    experience?: Prisma.StringWithAggregatesFilter<"TrainerRequest"> | string;
    status?: Prisma.EnumTrainerRequestStatusWithAggregatesFilter<"TrainerRequest"> | $Enums.TrainerRequestStatus;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"TrainerRequest"> | Date | string;
};
export type TrainerRequestCreateInput = {
    cvUrl: string;
    bio: string;
    experience: string;
    status?: $Enums.TrainerRequestStatus;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutTrainerRequestInput;
};
export type TrainerRequestUncheckedCreateInput = {
    id?: number;
    userId: number;
    cvUrl: string;
    bio: string;
    experience: string;
    status?: $Enums.TrainerRequestStatus;
    createdAt?: Date | string;
};
export type TrainerRequestUpdateInput = {
    cvUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    bio?: Prisma.StringFieldUpdateOperationsInput | string;
    experience?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumTrainerRequestStatusFieldUpdateOperationsInput | $Enums.TrainerRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutTrainerRequestNestedInput;
};
export type TrainerRequestUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    cvUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    bio?: Prisma.StringFieldUpdateOperationsInput | string;
    experience?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumTrainerRequestStatusFieldUpdateOperationsInput | $Enums.TrainerRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TrainerRequestCreateManyInput = {
    id?: number;
    userId: number;
    cvUrl: string;
    bio: string;
    experience: string;
    status?: $Enums.TrainerRequestStatus;
    createdAt?: Date | string;
};
export type TrainerRequestUpdateManyMutationInput = {
    cvUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    bio?: Prisma.StringFieldUpdateOperationsInput | string;
    experience?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumTrainerRequestStatusFieldUpdateOperationsInput | $Enums.TrainerRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TrainerRequestUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.IntFieldUpdateOperationsInput | number;
    cvUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    bio?: Prisma.StringFieldUpdateOperationsInput | string;
    experience?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumTrainerRequestStatusFieldUpdateOperationsInput | $Enums.TrainerRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TrainerRequestNullableScalarRelationFilter = {
    is?: Prisma.TrainerRequestWhereInput | null;
    isNot?: Prisma.TrainerRequestWhereInput | null;
};
export type TrainerRequestCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    cvUrl?: Prisma.SortOrder;
    bio?: Prisma.SortOrder;
    experience?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TrainerRequestAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type TrainerRequestMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    cvUrl?: Prisma.SortOrder;
    bio?: Prisma.SortOrder;
    experience?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TrainerRequestMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    cvUrl?: Prisma.SortOrder;
    bio?: Prisma.SortOrder;
    experience?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TrainerRequestSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
};
export type TrainerRequestCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.TrainerRequestCreateWithoutUserInput, Prisma.TrainerRequestUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.TrainerRequestCreateOrConnectWithoutUserInput;
    connect?: Prisma.TrainerRequestWhereUniqueInput;
};
export type TrainerRequestUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.TrainerRequestCreateWithoutUserInput, Prisma.TrainerRequestUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.TrainerRequestCreateOrConnectWithoutUserInput;
    connect?: Prisma.TrainerRequestWhereUniqueInput;
};
export type TrainerRequestUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.TrainerRequestCreateWithoutUserInput, Prisma.TrainerRequestUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.TrainerRequestCreateOrConnectWithoutUserInput;
    upsert?: Prisma.TrainerRequestUpsertWithoutUserInput;
    disconnect?: Prisma.TrainerRequestWhereInput | boolean;
    delete?: Prisma.TrainerRequestWhereInput | boolean;
    connect?: Prisma.TrainerRequestWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TrainerRequestUpdateToOneWithWhereWithoutUserInput, Prisma.TrainerRequestUpdateWithoutUserInput>, Prisma.TrainerRequestUncheckedUpdateWithoutUserInput>;
};
export type TrainerRequestUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.TrainerRequestCreateWithoutUserInput, Prisma.TrainerRequestUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.TrainerRequestCreateOrConnectWithoutUserInput;
    upsert?: Prisma.TrainerRequestUpsertWithoutUserInput;
    disconnect?: Prisma.TrainerRequestWhereInput | boolean;
    delete?: Prisma.TrainerRequestWhereInput | boolean;
    connect?: Prisma.TrainerRequestWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TrainerRequestUpdateToOneWithWhereWithoutUserInput, Prisma.TrainerRequestUpdateWithoutUserInput>, Prisma.TrainerRequestUncheckedUpdateWithoutUserInput>;
};
export type EnumTrainerRequestStatusFieldUpdateOperationsInput = {
    set?: $Enums.TrainerRequestStatus;
};
export type TrainerRequestCreateWithoutUserInput = {
    cvUrl: string;
    bio: string;
    experience: string;
    status?: $Enums.TrainerRequestStatus;
    createdAt?: Date | string;
};
export type TrainerRequestUncheckedCreateWithoutUserInput = {
    id?: number;
    cvUrl: string;
    bio: string;
    experience: string;
    status?: $Enums.TrainerRequestStatus;
    createdAt?: Date | string;
};
export type TrainerRequestCreateOrConnectWithoutUserInput = {
    where: Prisma.TrainerRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.TrainerRequestCreateWithoutUserInput, Prisma.TrainerRequestUncheckedCreateWithoutUserInput>;
};
export type TrainerRequestUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.TrainerRequestUpdateWithoutUserInput, Prisma.TrainerRequestUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.TrainerRequestCreateWithoutUserInput, Prisma.TrainerRequestUncheckedCreateWithoutUserInput>;
    where?: Prisma.TrainerRequestWhereInput;
};
export type TrainerRequestUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.TrainerRequestWhereInput;
    data: Prisma.XOR<Prisma.TrainerRequestUpdateWithoutUserInput, Prisma.TrainerRequestUncheckedUpdateWithoutUserInput>;
};
export type TrainerRequestUpdateWithoutUserInput = {
    cvUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    bio?: Prisma.StringFieldUpdateOperationsInput | string;
    experience?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumTrainerRequestStatusFieldUpdateOperationsInput | $Enums.TrainerRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TrainerRequestUncheckedUpdateWithoutUserInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    cvUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    bio?: Prisma.StringFieldUpdateOperationsInput | string;
    experience?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumTrainerRequestStatusFieldUpdateOperationsInput | $Enums.TrainerRequestStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TrainerRequestSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    cvUrl?: boolean;
    bio?: boolean;
    experience?: boolean;
    status?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["trainerRequest"]>;
export type TrainerRequestSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    cvUrl?: boolean;
    bio?: boolean;
    experience?: boolean;
    status?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["trainerRequest"]>;
export type TrainerRequestSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    cvUrl?: boolean;
    bio?: boolean;
    experience?: boolean;
    status?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["trainerRequest"]>;
export type TrainerRequestSelectScalar = {
    id?: boolean;
    userId?: boolean;
    cvUrl?: boolean;
    bio?: boolean;
    experience?: boolean;
    status?: boolean;
    createdAt?: boolean;
};
export type TrainerRequestOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "cvUrl" | "bio" | "experience" | "status" | "createdAt", ExtArgs["result"]["trainerRequest"]>;
export type TrainerRequestInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type TrainerRequestIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type TrainerRequestIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $TrainerRequestPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "TrainerRequest";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        userId: number;
        cvUrl: string;
        bio: string;
        experience: string;
        status: $Enums.TrainerRequestStatus;
        createdAt: Date;
    }, ExtArgs["result"]["trainerRequest"]>;
    composites: {};
};
export type TrainerRequestGetPayload<S extends boolean | null | undefined | TrainerRequestDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TrainerRequestPayload, S>;
export type TrainerRequestCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TrainerRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TrainerRequestCountAggregateInputType | true;
};
export interface TrainerRequestDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['TrainerRequest'];
        meta: {
            name: 'TrainerRequest';
        };
    };
    /**
     * Find zero or one TrainerRequest that matches the filter.
     * @param {TrainerRequestFindUniqueArgs} args - Arguments to find a TrainerRequest
     * @example
     * // Get one TrainerRequest
     * const trainerRequest = await prisma.trainerRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TrainerRequestFindUniqueArgs>(args: Prisma.SelectSubset<T, TrainerRequestFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TrainerRequestClient<runtime.Types.Result.GetResult<Prisma.$TrainerRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one TrainerRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TrainerRequestFindUniqueOrThrowArgs} args - Arguments to find a TrainerRequest
     * @example
     * // Get one TrainerRequest
     * const trainerRequest = await prisma.trainerRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TrainerRequestFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TrainerRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TrainerRequestClient<runtime.Types.Result.GetResult<Prisma.$TrainerRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first TrainerRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainerRequestFindFirstArgs} args - Arguments to find a TrainerRequest
     * @example
     * // Get one TrainerRequest
     * const trainerRequest = await prisma.trainerRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TrainerRequestFindFirstArgs>(args?: Prisma.SelectSubset<T, TrainerRequestFindFirstArgs<ExtArgs>>): Prisma.Prisma__TrainerRequestClient<runtime.Types.Result.GetResult<Prisma.$TrainerRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first TrainerRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainerRequestFindFirstOrThrowArgs} args - Arguments to find a TrainerRequest
     * @example
     * // Get one TrainerRequest
     * const trainerRequest = await prisma.trainerRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TrainerRequestFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TrainerRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TrainerRequestClient<runtime.Types.Result.GetResult<Prisma.$TrainerRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more TrainerRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainerRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TrainerRequests
     * const trainerRequests = await prisma.trainerRequest.findMany()
     *
     * // Get first 10 TrainerRequests
     * const trainerRequests = await prisma.trainerRequest.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const trainerRequestWithIdOnly = await prisma.trainerRequest.findMany({ select: { id: true } })
     *
     */
    findMany<T extends TrainerRequestFindManyArgs>(args?: Prisma.SelectSubset<T, TrainerRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TrainerRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a TrainerRequest.
     * @param {TrainerRequestCreateArgs} args - Arguments to create a TrainerRequest.
     * @example
     * // Create one TrainerRequest
     * const TrainerRequest = await prisma.trainerRequest.create({
     *   data: {
     *     // ... data to create a TrainerRequest
     *   }
     * })
     *
     */
    create<T extends TrainerRequestCreateArgs>(args: Prisma.SelectSubset<T, TrainerRequestCreateArgs<ExtArgs>>): Prisma.Prisma__TrainerRequestClient<runtime.Types.Result.GetResult<Prisma.$TrainerRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many TrainerRequests.
     * @param {TrainerRequestCreateManyArgs} args - Arguments to create many TrainerRequests.
     * @example
     * // Create many TrainerRequests
     * const trainerRequest = await prisma.trainerRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends TrainerRequestCreateManyArgs>(args?: Prisma.SelectSubset<T, TrainerRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many TrainerRequests and returns the data saved in the database.
     * @param {TrainerRequestCreateManyAndReturnArgs} args - Arguments to create many TrainerRequests.
     * @example
     * // Create many TrainerRequests
     * const trainerRequest = await prisma.trainerRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many TrainerRequests and only return the `id`
     * const trainerRequestWithIdOnly = await prisma.trainerRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends TrainerRequestCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, TrainerRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TrainerRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a TrainerRequest.
     * @param {TrainerRequestDeleteArgs} args - Arguments to delete one TrainerRequest.
     * @example
     * // Delete one TrainerRequest
     * const TrainerRequest = await prisma.trainerRequest.delete({
     *   where: {
     *     // ... filter to delete one TrainerRequest
     *   }
     * })
     *
     */
    delete<T extends TrainerRequestDeleteArgs>(args: Prisma.SelectSubset<T, TrainerRequestDeleteArgs<ExtArgs>>): Prisma.Prisma__TrainerRequestClient<runtime.Types.Result.GetResult<Prisma.$TrainerRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one TrainerRequest.
     * @param {TrainerRequestUpdateArgs} args - Arguments to update one TrainerRequest.
     * @example
     * // Update one TrainerRequest
     * const trainerRequest = await prisma.trainerRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends TrainerRequestUpdateArgs>(args: Prisma.SelectSubset<T, TrainerRequestUpdateArgs<ExtArgs>>): Prisma.Prisma__TrainerRequestClient<runtime.Types.Result.GetResult<Prisma.$TrainerRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more TrainerRequests.
     * @param {TrainerRequestDeleteManyArgs} args - Arguments to filter TrainerRequests to delete.
     * @example
     * // Delete a few TrainerRequests
     * const { count } = await prisma.trainerRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends TrainerRequestDeleteManyArgs>(args?: Prisma.SelectSubset<T, TrainerRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more TrainerRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainerRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TrainerRequests
     * const trainerRequest = await prisma.trainerRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends TrainerRequestUpdateManyArgs>(args: Prisma.SelectSubset<T, TrainerRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more TrainerRequests and returns the data updated in the database.
     * @param {TrainerRequestUpdateManyAndReturnArgs} args - Arguments to update many TrainerRequests.
     * @example
     * // Update many TrainerRequests
     * const trainerRequest = await prisma.trainerRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more TrainerRequests and only return the `id`
     * const trainerRequestWithIdOnly = await prisma.trainerRequest.updateManyAndReturn({
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
    updateManyAndReturn<T extends TrainerRequestUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, TrainerRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TrainerRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one TrainerRequest.
     * @param {TrainerRequestUpsertArgs} args - Arguments to update or create a TrainerRequest.
     * @example
     * // Update or create a TrainerRequest
     * const trainerRequest = await prisma.trainerRequest.upsert({
     *   create: {
     *     // ... data to create a TrainerRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TrainerRequest we want to update
     *   }
     * })
     */
    upsert<T extends TrainerRequestUpsertArgs>(args: Prisma.SelectSubset<T, TrainerRequestUpsertArgs<ExtArgs>>): Prisma.Prisma__TrainerRequestClient<runtime.Types.Result.GetResult<Prisma.$TrainerRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of TrainerRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainerRequestCountArgs} args - Arguments to filter TrainerRequests to count.
     * @example
     * // Count the number of TrainerRequests
     * const count = await prisma.trainerRequest.count({
     *   where: {
     *     // ... the filter for the TrainerRequests we want to count
     *   }
     * })
    **/
    count<T extends TrainerRequestCountArgs>(args?: Prisma.Subset<T, TrainerRequestCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TrainerRequestCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a TrainerRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainerRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TrainerRequestAggregateArgs>(args: Prisma.Subset<T, TrainerRequestAggregateArgs>): Prisma.PrismaPromise<GetTrainerRequestAggregateType<T>>;
    /**
     * Group by TrainerRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrainerRequestGroupByArgs} args - Group by arguments.
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
    groupBy<T extends TrainerRequestGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TrainerRequestGroupByArgs['orderBy'];
    } : {
        orderBy?: TrainerRequestGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TrainerRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTrainerRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the TrainerRequest model
     */
    readonly fields: TrainerRequestFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for TrainerRequest.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__TrainerRequestClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the TrainerRequest model
 */
export interface TrainerRequestFieldRefs {
    readonly id: Prisma.FieldRef<"TrainerRequest", 'Int'>;
    readonly userId: Prisma.FieldRef<"TrainerRequest", 'Int'>;
    readonly cvUrl: Prisma.FieldRef<"TrainerRequest", 'String'>;
    readonly bio: Prisma.FieldRef<"TrainerRequest", 'String'>;
    readonly experience: Prisma.FieldRef<"TrainerRequest", 'String'>;
    readonly status: Prisma.FieldRef<"TrainerRequest", 'TrainerRequestStatus'>;
    readonly createdAt: Prisma.FieldRef<"TrainerRequest", 'DateTime'>;
}
/**
 * TrainerRequest findUnique
 */
export type TrainerRequestFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which TrainerRequest to fetch.
     */
    where: Prisma.TrainerRequestWhereUniqueInput;
};
/**
 * TrainerRequest findUniqueOrThrow
 */
export type TrainerRequestFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which TrainerRequest to fetch.
     */
    where: Prisma.TrainerRequestWhereUniqueInput;
};
/**
 * TrainerRequest findFirst
 */
export type TrainerRequestFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which TrainerRequest to fetch.
     */
    where?: Prisma.TrainerRequestWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of TrainerRequests to fetch.
     */
    orderBy?: Prisma.TrainerRequestOrderByWithRelationInput | Prisma.TrainerRequestOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for TrainerRequests.
     */
    cursor?: Prisma.TrainerRequestWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` TrainerRequests from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` TrainerRequests.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of TrainerRequests.
     */
    distinct?: Prisma.TrainerRequestScalarFieldEnum | Prisma.TrainerRequestScalarFieldEnum[];
};
/**
 * TrainerRequest findFirstOrThrow
 */
export type TrainerRequestFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which TrainerRequest to fetch.
     */
    where?: Prisma.TrainerRequestWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of TrainerRequests to fetch.
     */
    orderBy?: Prisma.TrainerRequestOrderByWithRelationInput | Prisma.TrainerRequestOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for TrainerRequests.
     */
    cursor?: Prisma.TrainerRequestWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` TrainerRequests from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` TrainerRequests.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of TrainerRequests.
     */
    distinct?: Prisma.TrainerRequestScalarFieldEnum | Prisma.TrainerRequestScalarFieldEnum[];
};
/**
 * TrainerRequest findMany
 */
export type TrainerRequestFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which TrainerRequests to fetch.
     */
    where?: Prisma.TrainerRequestWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of TrainerRequests to fetch.
     */
    orderBy?: Prisma.TrainerRequestOrderByWithRelationInput | Prisma.TrainerRequestOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing TrainerRequests.
     */
    cursor?: Prisma.TrainerRequestWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` TrainerRequests from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` TrainerRequests.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of TrainerRequests.
     */
    distinct?: Prisma.TrainerRequestScalarFieldEnum | Prisma.TrainerRequestScalarFieldEnum[];
};
/**
 * TrainerRequest create
 */
export type TrainerRequestCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a TrainerRequest.
     */
    data: Prisma.XOR<Prisma.TrainerRequestCreateInput, Prisma.TrainerRequestUncheckedCreateInput>;
};
/**
 * TrainerRequest createMany
 */
export type TrainerRequestCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many TrainerRequests.
     */
    data: Prisma.TrainerRequestCreateManyInput | Prisma.TrainerRequestCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * TrainerRequest createManyAndReturn
 */
export type TrainerRequestCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerRequest
     */
    select?: Prisma.TrainerRequestSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the TrainerRequest
     */
    omit?: Prisma.TrainerRequestOmit<ExtArgs> | null;
    /**
     * The data used to create many TrainerRequests.
     */
    data: Prisma.TrainerRequestCreateManyInput | Prisma.TrainerRequestCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TrainerRequestIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * TrainerRequest update
 */
export type TrainerRequestUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a TrainerRequest.
     */
    data: Prisma.XOR<Prisma.TrainerRequestUpdateInput, Prisma.TrainerRequestUncheckedUpdateInput>;
    /**
     * Choose, which TrainerRequest to update.
     */
    where: Prisma.TrainerRequestWhereUniqueInput;
};
/**
 * TrainerRequest updateMany
 */
export type TrainerRequestUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update TrainerRequests.
     */
    data: Prisma.XOR<Prisma.TrainerRequestUpdateManyMutationInput, Prisma.TrainerRequestUncheckedUpdateManyInput>;
    /**
     * Filter which TrainerRequests to update
     */
    where?: Prisma.TrainerRequestWhereInput;
    /**
     * Limit how many TrainerRequests to update.
     */
    limit?: number;
};
/**
 * TrainerRequest updateManyAndReturn
 */
export type TrainerRequestUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TrainerRequest
     */
    select?: Prisma.TrainerRequestSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the TrainerRequest
     */
    omit?: Prisma.TrainerRequestOmit<ExtArgs> | null;
    /**
     * The data used to update TrainerRequests.
     */
    data: Prisma.XOR<Prisma.TrainerRequestUpdateManyMutationInput, Prisma.TrainerRequestUncheckedUpdateManyInput>;
    /**
     * Filter which TrainerRequests to update
     */
    where?: Prisma.TrainerRequestWhereInput;
    /**
     * Limit how many TrainerRequests to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.TrainerRequestIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * TrainerRequest upsert
 */
export type TrainerRequestUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the TrainerRequest to update in case it exists.
     */
    where: Prisma.TrainerRequestWhereUniqueInput;
    /**
     * In case the TrainerRequest found by the `where` argument doesn't exist, create a new TrainerRequest with this data.
     */
    create: Prisma.XOR<Prisma.TrainerRequestCreateInput, Prisma.TrainerRequestUncheckedCreateInput>;
    /**
     * In case the TrainerRequest was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.TrainerRequestUpdateInput, Prisma.TrainerRequestUncheckedUpdateInput>;
};
/**
 * TrainerRequest delete
 */
export type TrainerRequestDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which TrainerRequest to delete.
     */
    where: Prisma.TrainerRequestWhereUniqueInput;
};
/**
 * TrainerRequest deleteMany
 */
export type TrainerRequestDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which TrainerRequests to delete
     */
    where?: Prisma.TrainerRequestWhereInput;
    /**
     * Limit how many TrainerRequests to delete.
     */
    limit?: number;
};
/**
 * TrainerRequest without action
 */
export type TrainerRequestDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
//# sourceMappingURL=TrainerRequest.d.ts.map