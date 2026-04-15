import { IQueryConfig, IQueryParams, IQueryResult, PrismaFindManyArgs, PrismaModelDelegate } from "../type/queryBuilder";
export declare class QueryBuilder<T, TWhereInput = Record<string, unknown>, TInclude = Record<string, unknown>, TSelect = Record<string, boolean>> {
    private model;
    private queryParams;
    private config;
    private query;
    private countQuery;
    private page;
    private limit;
    private skip;
    private sortBy;
    private sortOrder;
    private selectFields;
    constructor(model: PrismaModelDelegate, queryParams: IQueryParams, config?: IQueryConfig);
    search(): this;
    select(select: TSelect): this;
    filter(): this;
    paginate(): this;
    sort(): this;
    fields(): this;
    include(relation: TInclude): this;
    dynamicInclude(includeConfig: Record<string, unknown>, defaultInclude?: string[]): this;
    where(condition: TWhereInput): this;
    execute(): Promise<IQueryResult<T>>;
    count(): Promise<number>;
    getQuery(): PrismaFindManyArgs;
    private deepMerge;
    private parseFilterValue;
    private parseRangeFilter;
}
//# sourceMappingURL=queryBuilder.d.ts.map