import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model ProductDiet
 *
 */
export type ProductDietModel = runtime.Types.Result.DefaultSelection<Prisma.$ProductDietPayload>;
export type AggregateProductDiet = {
    _count: ProductDietCountAggregateOutputType | null;
    _min: ProductDietMinAggregateOutputType | null;
    _max: ProductDietMaxAggregateOutputType | null;
};
export type ProductDietMinAggregateOutputType = {
    productId: string | null;
    dietId: string | null;
};
export type ProductDietMaxAggregateOutputType = {
    productId: string | null;
    dietId: string | null;
};
export type ProductDietCountAggregateOutputType = {
    productId: number;
    dietId: number;
    _all: number;
};
export type ProductDietMinAggregateInputType = {
    productId?: true;
    dietId?: true;
};
export type ProductDietMaxAggregateInputType = {
    productId?: true;
    dietId?: true;
};
export type ProductDietCountAggregateInputType = {
    productId?: true;
    dietId?: true;
    _all?: true;
};
export type ProductDietAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ProductDiet to aggregate.
     */
    where?: Prisma.ProductDietWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ProductDiets to fetch.
     */
    orderBy?: Prisma.ProductDietOrderByWithRelationInput | Prisma.ProductDietOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.ProductDietWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ProductDiets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ProductDiets.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned ProductDiets
    **/
    _count?: true | ProductDietCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: ProductDietMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: ProductDietMaxAggregateInputType;
};
export type GetProductDietAggregateType<T extends ProductDietAggregateArgs> = {
    [P in keyof T & keyof AggregateProductDiet]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProductDiet[P]> : Prisma.GetScalarType<T[P], AggregateProductDiet[P]>;
};
export type ProductDietGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProductDietWhereInput;
    orderBy?: Prisma.ProductDietOrderByWithAggregationInput | Prisma.ProductDietOrderByWithAggregationInput[];
    by: Prisma.ProductDietScalarFieldEnum[] | Prisma.ProductDietScalarFieldEnum;
    having?: Prisma.ProductDietScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProductDietCountAggregateInputType | true;
    _min?: ProductDietMinAggregateInputType;
    _max?: ProductDietMaxAggregateInputType;
};
export type ProductDietGroupByOutputType = {
    productId: string;
    dietId: string;
    _count: ProductDietCountAggregateOutputType | null;
    _min: ProductDietMinAggregateOutputType | null;
    _max: ProductDietMaxAggregateOutputType | null;
};
type GetProductDietGroupByPayload<T extends ProductDietGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProductDietGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProductDietGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProductDietGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProductDietGroupByOutputType[P]>;
}>>;
export type ProductDietWhereInput = {
    AND?: Prisma.ProductDietWhereInput | Prisma.ProductDietWhereInput[];
    OR?: Prisma.ProductDietWhereInput[];
    NOT?: Prisma.ProductDietWhereInput | Prisma.ProductDietWhereInput[];
    productId?: Prisma.StringFilter<"ProductDiet"> | string;
    dietId?: Prisma.StringFilter<"ProductDiet"> | string;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    diet?: Prisma.XOR<Prisma.DietScalarRelationFilter, Prisma.DietWhereInput>;
};
export type ProductDietOrderByWithRelationInput = {
    productId?: Prisma.SortOrder;
    dietId?: Prisma.SortOrder;
    product?: Prisma.ProductOrderByWithRelationInput;
    diet?: Prisma.DietOrderByWithRelationInput;
};
export type ProductDietWhereUniqueInput = Prisma.AtLeast<{
    productId_dietId?: Prisma.ProductDietProductIdDietIdCompoundUniqueInput;
    AND?: Prisma.ProductDietWhereInput | Prisma.ProductDietWhereInput[];
    OR?: Prisma.ProductDietWhereInput[];
    NOT?: Prisma.ProductDietWhereInput | Prisma.ProductDietWhereInput[];
    productId?: Prisma.StringFilter<"ProductDiet"> | string;
    dietId?: Prisma.StringFilter<"ProductDiet"> | string;
    product?: Prisma.XOR<Prisma.ProductScalarRelationFilter, Prisma.ProductWhereInput>;
    diet?: Prisma.XOR<Prisma.DietScalarRelationFilter, Prisma.DietWhereInput>;
}, "productId_dietId">;
export type ProductDietOrderByWithAggregationInput = {
    productId?: Prisma.SortOrder;
    dietId?: Prisma.SortOrder;
    _count?: Prisma.ProductDietCountOrderByAggregateInput;
    _max?: Prisma.ProductDietMaxOrderByAggregateInput;
    _min?: Prisma.ProductDietMinOrderByAggregateInput;
};
export type ProductDietScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProductDietScalarWhereWithAggregatesInput | Prisma.ProductDietScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProductDietScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProductDietScalarWhereWithAggregatesInput | Prisma.ProductDietScalarWhereWithAggregatesInput[];
    productId?: Prisma.StringWithAggregatesFilter<"ProductDiet"> | string;
    dietId?: Prisma.StringWithAggregatesFilter<"ProductDiet"> | string;
};
export type ProductDietCreateInput = {
    product: Prisma.ProductCreateNestedOneWithoutDietsInput;
    diet: Prisma.DietCreateNestedOneWithoutProductsInput;
};
export type ProductDietUncheckedCreateInput = {
    productId: string;
    dietId: string;
};
export type ProductDietUpdateInput = {
    product?: Prisma.ProductUpdateOneRequiredWithoutDietsNestedInput;
    diet?: Prisma.DietUpdateOneRequiredWithoutProductsNestedInput;
};
export type ProductDietUncheckedUpdateInput = {
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    dietId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProductDietCreateManyInput = {
    productId: string;
    dietId: string;
};
export type ProductDietUpdateManyMutationInput = {};
export type ProductDietUncheckedUpdateManyInput = {
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
    dietId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProductDietListRelationFilter = {
    every?: Prisma.ProductDietWhereInput;
    some?: Prisma.ProductDietWhereInput;
    none?: Prisma.ProductDietWhereInput;
};
export type ProductDietOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ProductDietProductIdDietIdCompoundUniqueInput = {
    productId: string;
    dietId: string;
};
export type ProductDietCountOrderByAggregateInput = {
    productId?: Prisma.SortOrder;
    dietId?: Prisma.SortOrder;
};
export type ProductDietMaxOrderByAggregateInput = {
    productId?: Prisma.SortOrder;
    dietId?: Prisma.SortOrder;
};
export type ProductDietMinOrderByAggregateInput = {
    productId?: Prisma.SortOrder;
    dietId?: Prisma.SortOrder;
};
export type ProductDietCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.ProductDietCreateWithoutProductInput, Prisma.ProductDietUncheckedCreateWithoutProductInput> | Prisma.ProductDietCreateWithoutProductInput[] | Prisma.ProductDietUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductDietCreateOrConnectWithoutProductInput | Prisma.ProductDietCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.ProductDietCreateManyProductInputEnvelope;
    connect?: Prisma.ProductDietWhereUniqueInput | Prisma.ProductDietWhereUniqueInput[];
};
export type ProductDietUncheckedCreateNestedManyWithoutProductInput = {
    create?: Prisma.XOR<Prisma.ProductDietCreateWithoutProductInput, Prisma.ProductDietUncheckedCreateWithoutProductInput> | Prisma.ProductDietCreateWithoutProductInput[] | Prisma.ProductDietUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductDietCreateOrConnectWithoutProductInput | Prisma.ProductDietCreateOrConnectWithoutProductInput[];
    createMany?: Prisma.ProductDietCreateManyProductInputEnvelope;
    connect?: Prisma.ProductDietWhereUniqueInput | Prisma.ProductDietWhereUniqueInput[];
};
export type ProductDietUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.ProductDietCreateWithoutProductInput, Prisma.ProductDietUncheckedCreateWithoutProductInput> | Prisma.ProductDietCreateWithoutProductInput[] | Prisma.ProductDietUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductDietCreateOrConnectWithoutProductInput | Prisma.ProductDietCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.ProductDietUpsertWithWhereUniqueWithoutProductInput | Prisma.ProductDietUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.ProductDietCreateManyProductInputEnvelope;
    set?: Prisma.ProductDietWhereUniqueInput | Prisma.ProductDietWhereUniqueInput[];
    disconnect?: Prisma.ProductDietWhereUniqueInput | Prisma.ProductDietWhereUniqueInput[];
    delete?: Prisma.ProductDietWhereUniqueInput | Prisma.ProductDietWhereUniqueInput[];
    connect?: Prisma.ProductDietWhereUniqueInput | Prisma.ProductDietWhereUniqueInput[];
    update?: Prisma.ProductDietUpdateWithWhereUniqueWithoutProductInput | Prisma.ProductDietUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.ProductDietUpdateManyWithWhereWithoutProductInput | Prisma.ProductDietUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.ProductDietScalarWhereInput | Prisma.ProductDietScalarWhereInput[];
};
export type ProductDietUncheckedUpdateManyWithoutProductNestedInput = {
    create?: Prisma.XOR<Prisma.ProductDietCreateWithoutProductInput, Prisma.ProductDietUncheckedCreateWithoutProductInput> | Prisma.ProductDietCreateWithoutProductInput[] | Prisma.ProductDietUncheckedCreateWithoutProductInput[];
    connectOrCreate?: Prisma.ProductDietCreateOrConnectWithoutProductInput | Prisma.ProductDietCreateOrConnectWithoutProductInput[];
    upsert?: Prisma.ProductDietUpsertWithWhereUniqueWithoutProductInput | Prisma.ProductDietUpsertWithWhereUniqueWithoutProductInput[];
    createMany?: Prisma.ProductDietCreateManyProductInputEnvelope;
    set?: Prisma.ProductDietWhereUniqueInput | Prisma.ProductDietWhereUniqueInput[];
    disconnect?: Prisma.ProductDietWhereUniqueInput | Prisma.ProductDietWhereUniqueInput[];
    delete?: Prisma.ProductDietWhereUniqueInput | Prisma.ProductDietWhereUniqueInput[];
    connect?: Prisma.ProductDietWhereUniqueInput | Prisma.ProductDietWhereUniqueInput[];
    update?: Prisma.ProductDietUpdateWithWhereUniqueWithoutProductInput | Prisma.ProductDietUpdateWithWhereUniqueWithoutProductInput[];
    updateMany?: Prisma.ProductDietUpdateManyWithWhereWithoutProductInput | Prisma.ProductDietUpdateManyWithWhereWithoutProductInput[];
    deleteMany?: Prisma.ProductDietScalarWhereInput | Prisma.ProductDietScalarWhereInput[];
};
export type ProductDietCreateNestedManyWithoutDietInput = {
    create?: Prisma.XOR<Prisma.ProductDietCreateWithoutDietInput, Prisma.ProductDietUncheckedCreateWithoutDietInput> | Prisma.ProductDietCreateWithoutDietInput[] | Prisma.ProductDietUncheckedCreateWithoutDietInput[];
    connectOrCreate?: Prisma.ProductDietCreateOrConnectWithoutDietInput | Prisma.ProductDietCreateOrConnectWithoutDietInput[];
    createMany?: Prisma.ProductDietCreateManyDietInputEnvelope;
    connect?: Prisma.ProductDietWhereUniqueInput | Prisma.ProductDietWhereUniqueInput[];
};
export type ProductDietUncheckedCreateNestedManyWithoutDietInput = {
    create?: Prisma.XOR<Prisma.ProductDietCreateWithoutDietInput, Prisma.ProductDietUncheckedCreateWithoutDietInput> | Prisma.ProductDietCreateWithoutDietInput[] | Prisma.ProductDietUncheckedCreateWithoutDietInput[];
    connectOrCreate?: Prisma.ProductDietCreateOrConnectWithoutDietInput | Prisma.ProductDietCreateOrConnectWithoutDietInput[];
    createMany?: Prisma.ProductDietCreateManyDietInputEnvelope;
    connect?: Prisma.ProductDietWhereUniqueInput | Prisma.ProductDietWhereUniqueInput[];
};
export type ProductDietUpdateManyWithoutDietNestedInput = {
    create?: Prisma.XOR<Prisma.ProductDietCreateWithoutDietInput, Prisma.ProductDietUncheckedCreateWithoutDietInput> | Prisma.ProductDietCreateWithoutDietInput[] | Prisma.ProductDietUncheckedCreateWithoutDietInput[];
    connectOrCreate?: Prisma.ProductDietCreateOrConnectWithoutDietInput | Prisma.ProductDietCreateOrConnectWithoutDietInput[];
    upsert?: Prisma.ProductDietUpsertWithWhereUniqueWithoutDietInput | Prisma.ProductDietUpsertWithWhereUniqueWithoutDietInput[];
    createMany?: Prisma.ProductDietCreateManyDietInputEnvelope;
    set?: Prisma.ProductDietWhereUniqueInput | Prisma.ProductDietWhereUniqueInput[];
    disconnect?: Prisma.ProductDietWhereUniqueInput | Prisma.ProductDietWhereUniqueInput[];
    delete?: Prisma.ProductDietWhereUniqueInput | Prisma.ProductDietWhereUniqueInput[];
    connect?: Prisma.ProductDietWhereUniqueInput | Prisma.ProductDietWhereUniqueInput[];
    update?: Prisma.ProductDietUpdateWithWhereUniqueWithoutDietInput | Prisma.ProductDietUpdateWithWhereUniqueWithoutDietInput[];
    updateMany?: Prisma.ProductDietUpdateManyWithWhereWithoutDietInput | Prisma.ProductDietUpdateManyWithWhereWithoutDietInput[];
    deleteMany?: Prisma.ProductDietScalarWhereInput | Prisma.ProductDietScalarWhereInput[];
};
export type ProductDietUncheckedUpdateManyWithoutDietNestedInput = {
    create?: Prisma.XOR<Prisma.ProductDietCreateWithoutDietInput, Prisma.ProductDietUncheckedCreateWithoutDietInput> | Prisma.ProductDietCreateWithoutDietInput[] | Prisma.ProductDietUncheckedCreateWithoutDietInput[];
    connectOrCreate?: Prisma.ProductDietCreateOrConnectWithoutDietInput | Prisma.ProductDietCreateOrConnectWithoutDietInput[];
    upsert?: Prisma.ProductDietUpsertWithWhereUniqueWithoutDietInput | Prisma.ProductDietUpsertWithWhereUniqueWithoutDietInput[];
    createMany?: Prisma.ProductDietCreateManyDietInputEnvelope;
    set?: Prisma.ProductDietWhereUniqueInput | Prisma.ProductDietWhereUniqueInput[];
    disconnect?: Prisma.ProductDietWhereUniqueInput | Prisma.ProductDietWhereUniqueInput[];
    delete?: Prisma.ProductDietWhereUniqueInput | Prisma.ProductDietWhereUniqueInput[];
    connect?: Prisma.ProductDietWhereUniqueInput | Prisma.ProductDietWhereUniqueInput[];
    update?: Prisma.ProductDietUpdateWithWhereUniqueWithoutDietInput | Prisma.ProductDietUpdateWithWhereUniqueWithoutDietInput[];
    updateMany?: Prisma.ProductDietUpdateManyWithWhereWithoutDietInput | Prisma.ProductDietUpdateManyWithWhereWithoutDietInput[];
    deleteMany?: Prisma.ProductDietScalarWhereInput | Prisma.ProductDietScalarWhereInput[];
};
export type ProductDietCreateWithoutProductInput = {
    diet: Prisma.DietCreateNestedOneWithoutProductsInput;
};
export type ProductDietUncheckedCreateWithoutProductInput = {
    dietId: string;
};
export type ProductDietCreateOrConnectWithoutProductInput = {
    where: Prisma.ProductDietWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductDietCreateWithoutProductInput, Prisma.ProductDietUncheckedCreateWithoutProductInput>;
};
export type ProductDietCreateManyProductInputEnvelope = {
    data: Prisma.ProductDietCreateManyProductInput | Prisma.ProductDietCreateManyProductInput[];
    skipDuplicates?: boolean;
};
export type ProductDietUpsertWithWhereUniqueWithoutProductInput = {
    where: Prisma.ProductDietWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductDietUpdateWithoutProductInput, Prisma.ProductDietUncheckedUpdateWithoutProductInput>;
    create: Prisma.XOR<Prisma.ProductDietCreateWithoutProductInput, Prisma.ProductDietUncheckedCreateWithoutProductInput>;
};
export type ProductDietUpdateWithWhereUniqueWithoutProductInput = {
    where: Prisma.ProductDietWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductDietUpdateWithoutProductInput, Prisma.ProductDietUncheckedUpdateWithoutProductInput>;
};
export type ProductDietUpdateManyWithWhereWithoutProductInput = {
    where: Prisma.ProductDietScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductDietUpdateManyMutationInput, Prisma.ProductDietUncheckedUpdateManyWithoutProductInput>;
};
export type ProductDietScalarWhereInput = {
    AND?: Prisma.ProductDietScalarWhereInput | Prisma.ProductDietScalarWhereInput[];
    OR?: Prisma.ProductDietScalarWhereInput[];
    NOT?: Prisma.ProductDietScalarWhereInput | Prisma.ProductDietScalarWhereInput[];
    productId?: Prisma.StringFilter<"ProductDiet"> | string;
    dietId?: Prisma.StringFilter<"ProductDiet"> | string;
};
export type ProductDietCreateWithoutDietInput = {
    product: Prisma.ProductCreateNestedOneWithoutDietsInput;
};
export type ProductDietUncheckedCreateWithoutDietInput = {
    productId: string;
};
export type ProductDietCreateOrConnectWithoutDietInput = {
    where: Prisma.ProductDietWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProductDietCreateWithoutDietInput, Prisma.ProductDietUncheckedCreateWithoutDietInput>;
};
export type ProductDietCreateManyDietInputEnvelope = {
    data: Prisma.ProductDietCreateManyDietInput | Prisma.ProductDietCreateManyDietInput[];
    skipDuplicates?: boolean;
};
export type ProductDietUpsertWithWhereUniqueWithoutDietInput = {
    where: Prisma.ProductDietWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProductDietUpdateWithoutDietInput, Prisma.ProductDietUncheckedUpdateWithoutDietInput>;
    create: Prisma.XOR<Prisma.ProductDietCreateWithoutDietInput, Prisma.ProductDietUncheckedCreateWithoutDietInput>;
};
export type ProductDietUpdateWithWhereUniqueWithoutDietInput = {
    where: Prisma.ProductDietWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProductDietUpdateWithoutDietInput, Prisma.ProductDietUncheckedUpdateWithoutDietInput>;
};
export type ProductDietUpdateManyWithWhereWithoutDietInput = {
    where: Prisma.ProductDietScalarWhereInput;
    data: Prisma.XOR<Prisma.ProductDietUpdateManyMutationInput, Prisma.ProductDietUncheckedUpdateManyWithoutDietInput>;
};
export type ProductDietCreateManyProductInput = {
    dietId: string;
};
export type ProductDietUpdateWithoutProductInput = {
    diet?: Prisma.DietUpdateOneRequiredWithoutProductsNestedInput;
};
export type ProductDietUncheckedUpdateWithoutProductInput = {
    dietId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProductDietUncheckedUpdateManyWithoutProductInput = {
    dietId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProductDietCreateManyDietInput = {
    productId: string;
};
export type ProductDietUpdateWithoutDietInput = {
    product?: Prisma.ProductUpdateOneRequiredWithoutDietsNestedInput;
};
export type ProductDietUncheckedUpdateWithoutDietInput = {
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProductDietUncheckedUpdateManyWithoutDietInput = {
    productId?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ProductDietSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    productId?: boolean;
    dietId?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    diet?: boolean | Prisma.DietDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productDiet"]>;
export type ProductDietSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    productId?: boolean;
    dietId?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    diet?: boolean | Prisma.DietDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productDiet"]>;
export type ProductDietSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    productId?: boolean;
    dietId?: boolean;
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    diet?: boolean | Prisma.DietDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["productDiet"]>;
export type ProductDietSelectScalar = {
    productId?: boolean;
    dietId?: boolean;
};
export type ProductDietOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"productId" | "dietId", ExtArgs["result"]["productDiet"]>;
export type ProductDietInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    diet?: boolean | Prisma.DietDefaultArgs<ExtArgs>;
};
export type ProductDietIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    diet?: boolean | Prisma.DietDefaultArgs<ExtArgs>;
};
export type ProductDietIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    product?: boolean | Prisma.ProductDefaultArgs<ExtArgs>;
    diet?: boolean | Prisma.DietDefaultArgs<ExtArgs>;
};
export type $ProductDietPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ProductDiet";
    objects: {
        product: Prisma.$ProductPayload<ExtArgs>;
        diet: Prisma.$DietPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        productId: string;
        dietId: string;
    }, ExtArgs["result"]["productDiet"]>;
    composites: {};
};
export type ProductDietGetPayload<S extends boolean | null | undefined | ProductDietDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProductDietPayload, S>;
export type ProductDietCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProductDietFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProductDietCountAggregateInputType | true;
};
export interface ProductDietDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ProductDiet'];
        meta: {
            name: 'ProductDiet';
        };
    };
    /**
     * Find zero or one ProductDiet that matches the filter.
     * @param {ProductDietFindUniqueArgs} args - Arguments to find a ProductDiet
     * @example
     * // Get one ProductDiet
     * const productDiet = await prisma.productDiet.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductDietFindUniqueArgs>(args: Prisma.SelectSubset<T, ProductDietFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProductDietClient<runtime.Types.Result.GetResult<Prisma.$ProductDietPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one ProductDiet that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductDietFindUniqueOrThrowArgs} args - Arguments to find a ProductDiet
     * @example
     * // Get one ProductDiet
     * const productDiet = await prisma.productDiet.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductDietFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProductDietFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductDietClient<runtime.Types.Result.GetResult<Prisma.$ProductDietPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ProductDiet that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductDietFindFirstArgs} args - Arguments to find a ProductDiet
     * @example
     * // Get one ProductDiet
     * const productDiet = await prisma.productDiet.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductDietFindFirstArgs>(args?: Prisma.SelectSubset<T, ProductDietFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProductDietClient<runtime.Types.Result.GetResult<Prisma.$ProductDietPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ProductDiet that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductDietFindFirstOrThrowArgs} args - Arguments to find a ProductDiet
     * @example
     * // Get one ProductDiet
     * const productDiet = await prisma.productDiet.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductDietFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProductDietFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProductDietClient<runtime.Types.Result.GetResult<Prisma.$ProductDietPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more ProductDiets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductDietFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductDiets
     * const productDiets = await prisma.productDiet.findMany()
     *
     * // Get first 10 ProductDiets
     * const productDiets = await prisma.productDiet.findMany({ take: 10 })
     *
     * // Only select the `productId`
     * const productDietWithProductIdOnly = await prisma.productDiet.findMany({ select: { productId: true } })
     *
     */
    findMany<T extends ProductDietFindManyArgs>(args?: Prisma.SelectSubset<T, ProductDietFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductDietPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a ProductDiet.
     * @param {ProductDietCreateArgs} args - Arguments to create a ProductDiet.
     * @example
     * // Create one ProductDiet
     * const ProductDiet = await prisma.productDiet.create({
     *   data: {
     *     // ... data to create a ProductDiet
     *   }
     * })
     *
     */
    create<T extends ProductDietCreateArgs>(args: Prisma.SelectSubset<T, ProductDietCreateArgs<ExtArgs>>): Prisma.Prisma__ProductDietClient<runtime.Types.Result.GetResult<Prisma.$ProductDietPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many ProductDiets.
     * @param {ProductDietCreateManyArgs} args - Arguments to create many ProductDiets.
     * @example
     * // Create many ProductDiets
     * const productDiet = await prisma.productDiet.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ProductDietCreateManyArgs>(args?: Prisma.SelectSubset<T, ProductDietCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many ProductDiets and returns the data saved in the database.
     * @param {ProductDietCreateManyAndReturnArgs} args - Arguments to create many ProductDiets.
     * @example
     * // Create many ProductDiets
     * const productDiet = await prisma.productDiet.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many ProductDiets and only return the `productId`
     * const productDietWithProductIdOnly = await prisma.productDiet.createManyAndReturn({
     *   select: { productId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ProductDietCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProductDietCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductDietPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a ProductDiet.
     * @param {ProductDietDeleteArgs} args - Arguments to delete one ProductDiet.
     * @example
     * // Delete one ProductDiet
     * const ProductDiet = await prisma.productDiet.delete({
     *   where: {
     *     // ... filter to delete one ProductDiet
     *   }
     * })
     *
     */
    delete<T extends ProductDietDeleteArgs>(args: Prisma.SelectSubset<T, ProductDietDeleteArgs<ExtArgs>>): Prisma.Prisma__ProductDietClient<runtime.Types.Result.GetResult<Prisma.$ProductDietPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one ProductDiet.
     * @param {ProductDietUpdateArgs} args - Arguments to update one ProductDiet.
     * @example
     * // Update one ProductDiet
     * const productDiet = await prisma.productDiet.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ProductDietUpdateArgs>(args: Prisma.SelectSubset<T, ProductDietUpdateArgs<ExtArgs>>): Prisma.Prisma__ProductDietClient<runtime.Types.Result.GetResult<Prisma.$ProductDietPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more ProductDiets.
     * @param {ProductDietDeleteManyArgs} args - Arguments to filter ProductDiets to delete.
     * @example
     * // Delete a few ProductDiets
     * const { count } = await prisma.productDiet.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ProductDietDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProductDietDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ProductDiets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductDietUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductDiets
     * const productDiet = await prisma.productDiet.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ProductDietUpdateManyArgs>(args: Prisma.SelectSubset<T, ProductDietUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ProductDiets and returns the data updated in the database.
     * @param {ProductDietUpdateManyAndReturnArgs} args - Arguments to update many ProductDiets.
     * @example
     * // Update many ProductDiets
     * const productDiet = await prisma.productDiet.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more ProductDiets and only return the `productId`
     * const productDietWithProductIdOnly = await prisma.productDiet.updateManyAndReturn({
     *   select: { productId: true },
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
    updateManyAndReturn<T extends ProductDietUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProductDietUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProductDietPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one ProductDiet.
     * @param {ProductDietUpsertArgs} args - Arguments to update or create a ProductDiet.
     * @example
     * // Update or create a ProductDiet
     * const productDiet = await prisma.productDiet.upsert({
     *   create: {
     *     // ... data to create a ProductDiet
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductDiet we want to update
     *   }
     * })
     */
    upsert<T extends ProductDietUpsertArgs>(args: Prisma.SelectSubset<T, ProductDietUpsertArgs<ExtArgs>>): Prisma.Prisma__ProductDietClient<runtime.Types.Result.GetResult<Prisma.$ProductDietPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of ProductDiets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductDietCountArgs} args - Arguments to filter ProductDiets to count.
     * @example
     * // Count the number of ProductDiets
     * const count = await prisma.productDiet.count({
     *   where: {
     *     // ... the filter for the ProductDiets we want to count
     *   }
     * })
    **/
    count<T extends ProductDietCountArgs>(args?: Prisma.Subset<T, ProductDietCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProductDietCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a ProductDiet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductDietAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProductDietAggregateArgs>(args: Prisma.Subset<T, ProductDietAggregateArgs>): Prisma.PrismaPromise<GetProductDietAggregateType<T>>;
    /**
     * Group by ProductDiet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductDietGroupByArgs} args - Group by arguments.
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
    groupBy<T extends ProductDietGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProductDietGroupByArgs['orderBy'];
    } : {
        orderBy?: ProductDietGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProductDietGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductDietGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the ProductDiet model
     */
    readonly fields: ProductDietFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for ProductDiet.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__ProductDietClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    product<T extends Prisma.ProductDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProductDefaultArgs<ExtArgs>>): Prisma.Prisma__ProductClient<runtime.Types.Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    diet<T extends Prisma.DietDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.DietDefaultArgs<ExtArgs>>): Prisma.Prisma__DietClient<runtime.Types.Result.GetResult<Prisma.$DietPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the ProductDiet model
 */
export interface ProductDietFieldRefs {
    readonly productId: Prisma.FieldRef<"ProductDiet", 'String'>;
    readonly dietId: Prisma.FieldRef<"ProductDiet", 'String'>;
}
/**
 * ProductDiet findUnique
 */
export type ProductDietFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDiet
     */
    select?: Prisma.ProductDietSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductDiet
     */
    omit?: Prisma.ProductDietOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductDietInclude<ExtArgs> | null;
    /**
     * Filter, which ProductDiet to fetch.
     */
    where: Prisma.ProductDietWhereUniqueInput;
};
/**
 * ProductDiet findUniqueOrThrow
 */
export type ProductDietFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDiet
     */
    select?: Prisma.ProductDietSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductDiet
     */
    omit?: Prisma.ProductDietOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductDietInclude<ExtArgs> | null;
    /**
     * Filter, which ProductDiet to fetch.
     */
    where: Prisma.ProductDietWhereUniqueInput;
};
/**
 * ProductDiet findFirst
 */
export type ProductDietFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDiet
     */
    select?: Prisma.ProductDietSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductDiet
     */
    omit?: Prisma.ProductDietOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductDietInclude<ExtArgs> | null;
    /**
     * Filter, which ProductDiet to fetch.
     */
    where?: Prisma.ProductDietWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ProductDiets to fetch.
     */
    orderBy?: Prisma.ProductDietOrderByWithRelationInput | Prisma.ProductDietOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ProductDiets.
     */
    cursor?: Prisma.ProductDietWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ProductDiets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ProductDiets.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ProductDiets.
     */
    distinct?: Prisma.ProductDietScalarFieldEnum | Prisma.ProductDietScalarFieldEnum[];
};
/**
 * ProductDiet findFirstOrThrow
 */
export type ProductDietFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDiet
     */
    select?: Prisma.ProductDietSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductDiet
     */
    omit?: Prisma.ProductDietOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductDietInclude<ExtArgs> | null;
    /**
     * Filter, which ProductDiet to fetch.
     */
    where?: Prisma.ProductDietWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ProductDiets to fetch.
     */
    orderBy?: Prisma.ProductDietOrderByWithRelationInput | Prisma.ProductDietOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ProductDiets.
     */
    cursor?: Prisma.ProductDietWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ProductDiets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ProductDiets.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ProductDiets.
     */
    distinct?: Prisma.ProductDietScalarFieldEnum | Prisma.ProductDietScalarFieldEnum[];
};
/**
 * ProductDiet findMany
 */
export type ProductDietFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDiet
     */
    select?: Prisma.ProductDietSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductDiet
     */
    omit?: Prisma.ProductDietOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductDietInclude<ExtArgs> | null;
    /**
     * Filter, which ProductDiets to fetch.
     */
    where?: Prisma.ProductDietWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ProductDiets to fetch.
     */
    orderBy?: Prisma.ProductDietOrderByWithRelationInput | Prisma.ProductDietOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing ProductDiets.
     */
    cursor?: Prisma.ProductDietWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ProductDiets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ProductDiets.
     */
    skip?: number;
    distinct?: Prisma.ProductDietScalarFieldEnum | Prisma.ProductDietScalarFieldEnum[];
};
/**
 * ProductDiet create
 */
export type ProductDietCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDiet
     */
    select?: Prisma.ProductDietSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductDiet
     */
    omit?: Prisma.ProductDietOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductDietInclude<ExtArgs> | null;
    /**
     * The data needed to create a ProductDiet.
     */
    data: Prisma.XOR<Prisma.ProductDietCreateInput, Prisma.ProductDietUncheckedCreateInput>;
};
/**
 * ProductDiet createMany
 */
export type ProductDietCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductDiets.
     */
    data: Prisma.ProductDietCreateManyInput | Prisma.ProductDietCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * ProductDiet createManyAndReturn
 */
export type ProductDietCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDiet
     */
    select?: Prisma.ProductDietSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductDiet
     */
    omit?: Prisma.ProductDietOmit<ExtArgs> | null;
    /**
     * The data used to create many ProductDiets.
     */
    data: Prisma.ProductDietCreateManyInput | Prisma.ProductDietCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductDietIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * ProductDiet update
 */
export type ProductDietUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDiet
     */
    select?: Prisma.ProductDietSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductDiet
     */
    omit?: Prisma.ProductDietOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductDietInclude<ExtArgs> | null;
    /**
     * The data needed to update a ProductDiet.
     */
    data: Prisma.XOR<Prisma.ProductDietUpdateInput, Prisma.ProductDietUncheckedUpdateInput>;
    /**
     * Choose, which ProductDiet to update.
     */
    where: Prisma.ProductDietWhereUniqueInput;
};
/**
 * ProductDiet updateMany
 */
export type ProductDietUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductDiets.
     */
    data: Prisma.XOR<Prisma.ProductDietUpdateManyMutationInput, Prisma.ProductDietUncheckedUpdateManyInput>;
    /**
     * Filter which ProductDiets to update
     */
    where?: Prisma.ProductDietWhereInput;
    /**
     * Limit how many ProductDiets to update.
     */
    limit?: number;
};
/**
 * ProductDiet updateManyAndReturn
 */
export type ProductDietUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDiet
     */
    select?: Prisma.ProductDietSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductDiet
     */
    omit?: Prisma.ProductDietOmit<ExtArgs> | null;
    /**
     * The data used to update ProductDiets.
     */
    data: Prisma.XOR<Prisma.ProductDietUpdateManyMutationInput, Prisma.ProductDietUncheckedUpdateManyInput>;
    /**
     * Filter which ProductDiets to update
     */
    where?: Prisma.ProductDietWhereInput;
    /**
     * Limit how many ProductDiets to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductDietIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * ProductDiet upsert
 */
export type ProductDietUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDiet
     */
    select?: Prisma.ProductDietSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductDiet
     */
    omit?: Prisma.ProductDietOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductDietInclude<ExtArgs> | null;
    /**
     * The filter to search for the ProductDiet to update in case it exists.
     */
    where: Prisma.ProductDietWhereUniqueInput;
    /**
     * In case the ProductDiet found by the `where` argument doesn't exist, create a new ProductDiet with this data.
     */
    create: Prisma.XOR<Prisma.ProductDietCreateInput, Prisma.ProductDietUncheckedCreateInput>;
    /**
     * In case the ProductDiet was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.ProductDietUpdateInput, Prisma.ProductDietUncheckedUpdateInput>;
};
/**
 * ProductDiet delete
 */
export type ProductDietDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDiet
     */
    select?: Prisma.ProductDietSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductDiet
     */
    omit?: Prisma.ProductDietOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductDietInclude<ExtArgs> | null;
    /**
     * Filter which ProductDiet to delete.
     */
    where: Prisma.ProductDietWhereUniqueInput;
};
/**
 * ProductDiet deleteMany
 */
export type ProductDietDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ProductDiets to delete
     */
    where?: Prisma.ProductDietWhereInput;
    /**
     * Limit how many ProductDiets to delete.
     */
    limit?: number;
};
/**
 * ProductDiet without action
 */
export type ProductDietDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDiet
     */
    select?: Prisma.ProductDietSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ProductDiet
     */
    omit?: Prisma.ProductDietOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ProductDietInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=ProductDiet.d.ts.map