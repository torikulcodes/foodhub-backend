import {
  IQueryConfig,
  IQueryParams,
  IQueryResult,
  PrismaCountArgs,
  PrismaFindManyArgs,
  PrismaModelDelegate,
  PrismaNumberFilter,
  PrismaStringFilter,
  PrismaWhereConditions,
} from "../type/queryBuilder.js";

// T = Model Type
export class QueryBuilder<
  T,
  TWhereInput = Record<string, unknown>,
  TInclude = Record<string, unknown>,
  TSelect = Record<string, boolean>,
> {
  private query: PrismaFindManyArgs;
  private countQuery: PrismaCountArgs;
  private page: number = 1;
  private limit: number = 20;
  private skip: number = 0;
  private sortBy: string = "createdAt";
  private sortOrder: "asc" | "desc" = "desc";
  private selectFields: Record<string, boolean> | undefined;

  constructor(
    private model: PrismaModelDelegate,
    private queryParams: IQueryParams,
    private config: IQueryConfig = {},
  ) {
    this.query = {
      where: {},
      include: {},
      orderBy: {},
      skip: 0,
      take: 10,
    };

    this.countQuery = {
      where: {},
    };
  }

  search(): this {
    const { searchTerm } = this.queryParams;
    const { searchableFields } = this.config;
    if (searchTerm && searchableFields && searchableFields.length > 0) {
      const searchConditions: Record<string, unknown>[] = [];

      searchableFields.forEach((field) => {
        if (field.includes(".")) {
          const parts = field.split(".");

          if (parts.length === 2) {
            const [relation, nestedField] = parts;

            const stringFilter: PrismaStringFilter = {
              contains: searchTerm,
              mode: "insensitive" as const,
            };

            if (relation && nestedField) {
              searchConditions.push({
                [relation]: {
                  [nestedField]: stringFilter,
                },
              });
            }
            return;
          } else if (parts.length === 3) {
            const [relation, nestedRelation, nestedField] = parts;

            const stringFilter: PrismaStringFilter = {
              contains: searchTerm,
              mode: "insensitive" as const,
            };

            if (relation && nestedRelation && nestedField) {
              searchConditions.push({
                [relation]: {
                  some: {
                    [nestedRelation]: {
                      [nestedField]: stringFilter,
                    },
                  },
                },
              });
            }
            return;
          }
        }

        const lower = field.toLowerCase();
        if (lower.includes("date") || lower.includes("time")) {
          const parsed = Date.parse(searchTerm);
          if (!isNaN(parsed)) {
            searchConditions.push({ [field]: new Date(parsed) });
          }
          return;
        }

        if (!isNaN(Number(searchTerm))) {
          searchConditions.push({ [field]: Number(searchTerm) });
          return;
        }

        const stringFilter: PrismaStringFilter = {
          contains: searchTerm,
          mode: "insensitive" as const,
        };

        searchConditions.push({ [field]: stringFilter });
      });

      const whereConditions = this.query.where as PrismaWhereConditions;
      whereConditions.OR = searchConditions;

      const countWhereConditions = this.countQuery
        .where as PrismaWhereConditions;
      countWhereConditions.OR = searchConditions;
    }

    return this;
  }

  select(select: TSelect): this {
    this.query.select = select as any;
    this.selectFields = select as Record<string, boolean>;
    delete this.query.include;
    return this;
  }

  // /doctors?searchTerm=john&page=1&sortBy=name&specialty=cardiology&appointmentFee[lt]=100 => {}
  // { specialty: 'cardiology', appointmentFee: { lt: '100' } }
  filter(): this {
    const { filterableFields } = this.config;
    const excludedField = [
      "searchTerm",
      "page",
      "limit",
      "sortBy",
      "sortOrder",
      "fields",
      "include",
    ];

    const filterParams: Record<string, unknown> = {};

    // Filter queryParams for allowed fields
    Object.keys(this.queryParams).forEach((key) => {
      if (!excludedField.includes(key)) {
        filterParams[key] = this.queryParams[key];
      }
    });

    const queryWhere = this.query.where as Record<string, unknown>;
    const countQueryWhere = this.countQuery.where as Record<string, unknown>;

    Object.keys(filterParams).forEach((key) => {
      const value = filterParams[key];

      if (value === undefined || value === "" || value === null) return;

      const isAllowedField =
        !filterableFields ||
        filterableFields.length === 0 ||
        filterableFields.includes(key);

      if (!isAllowedField) return;

      // Handle nested relations (user.name, doctor.specialty.title)
      if (key.includes(".")) {
        const parts = key.split(".");
        const levels = parts.length;

        if (levels < 2 || levels > 3) return; // Only 2 or 3 level supported

        const [relation, nestedRelationOrField, nestedField] = parts;

        // Level 2: relation.nestedField
        if (levels === 2 && relation && nestedRelationOrField) {
          if (!queryWhere[relation]) queryWhere[relation] = {};
          if (!countQueryWhere[relation]) countQueryWhere[relation] = {};

          const queryRelation = queryWhere[relation] as Record<string, unknown>;
          const countRelation = countQueryWhere[relation] as Record<
            string,
            unknown
          >;

          queryRelation[nestedRelationOrField] = this.parseFilterValue(value);
          countRelation[nestedRelationOrField] = this.parseFilterValue(value);
          return;
        }

        // Level 3: relation.some.nestedRelation.nestedField
        if (levels === 3 && relation && nestedRelationOrField && nestedField) {
          if (!queryWhere[relation]) queryWhere[relation] = { some: {} };
          if (!countQueryWhere[relation])
            countQueryWhere[relation] = { some: {} };

          const queryRelation = queryWhere[relation] as Record<string, unknown>;
          const countRelation = countQueryWhere[relation] as Record<
            string,
            unknown
          >;

          if (!queryRelation.some) queryRelation.some = {};
          if (!countRelation.some) countRelation.some = {};

          const querySome = queryRelation.some as Record<string, unknown>;
          const countSome = countRelation.some as Record<string, unknown>;

          if (!querySome[nestedRelationOrField])
            querySome[nestedRelationOrField] = {};
          if (!countSome[nestedRelationOrField])
            countSome[nestedRelationOrField] = {};

          const queryNested = querySome[nestedRelationOrField] as Record<
            string,
            unknown
          >;
          const countNested = countSome[nestedRelationOrField] as Record<
            string,
            unknown
          >;

          queryNested[nestedField] = this.parseFilterValue(value);
          countNested[nestedField] = this.parseFilterValue(value);
          return;
        }
      }

      // Range filter parsing (lt, gt, etc)
      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        queryWhere[key] = this.parseRangeFilter(
          value as Record<string, string | number>,
        );
        countQueryWhere[key] = this.parseRangeFilter(
          value as Record<string, string | number>,
        );
        return;
      }

      // Direct value parsing
      queryWhere[key] = this.parseFilterValue(value);
      countQueryWhere[key] = this.parseFilterValue(value);
    });

    return this;
  }

  paginate(): this {
    const page = Number(this.queryParams.page) || 1;
    const limit = Number(this.queryParams.limit) || this.limit;

    this.page = page;
    this.limit = limit;
    this.skip = (page - 1) * limit;

    this.query.skip = this.skip;
    this.query.take = this.limit;

    return this;
  }

  sort(): this {
    const sortBy = this.queryParams.sortBy || "createdAt";
    const sortOrder = this.queryParams.sortOrder === "asc" ? "asc" : "desc";

    this.sortBy = sortBy;
    this.sortOrder = sortOrder;

    // /doctors?sortBy=user.name&sortOrder=asc => orderBy: { user: { name: 'asc' } }

    if (sortBy.includes(".")) {
      const parts = sortBy.split(".");

      if (parts.length === 2) {
        const [relation, nestedField] = parts;

        if (relation && nestedField) {
          this.query.orderBy = {
            [relation]: {
              [nestedField]: sortOrder,
            },
          };
        }
      } else if (parts.length === 3) {
        const [relation, nestedRelation, nestedField] = parts;

        if (relation && nestedRelation && nestedField) {
          this.query.orderBy = {
            [relation]: {
              [nestedRelation]: {
                [nestedField]: sortOrder,
              },
            },
          };
        }
      } else {
        this.query.orderBy = {
          [sortBy]: sortOrder,
        };
      }
    } else {
      this.query.orderBy = {
        [sortBy]: sortOrder,
      };
    }
    return this;
  }

  fields(): this {
    const fieldsParam = this.queryParams.fields;
    // /doctors?fields=id,name,user => select: { id: true, name: true, user: { select: { name: true } } }

    //no nested field selection for now, only direct fields
    if (fieldsParam && typeof fieldsParam === "string") {
      const fieldsArray = fieldsParam?.split(",").map((field) => field.trim());
      this.selectFields = {};

      fieldsArray?.forEach((field) => {
        if (this.selectFields) {
          this.selectFields[field] = true;
        }
      });

      this.query.select = this.selectFields as Record<
        string,
        boolean | Record<string, unknown>
      >;

      delete this.query.include;
    }
    return this;
  }

  include(relation: TInclude): this {
    if (this.selectFields) {
      return this;
    }

    //if fields method is, include method will be ignored to prevent conflict between select and include
    this.query.include = {
      ...(this.query.include as Record<string, unknown>),
      ...(relation as Record<string, unknown>),
    };

    return this;
  }

  dynamicInclude(
    includeConfig: Record<string, unknown>,
    defaultInclude?: string[],
  ): this {
    if (this.selectFields) {
      return this;
    }

    const result: Record<string, unknown> = {};

    defaultInclude?.forEach((field) => {
      if (includeConfig[field]) {
        result[field] = includeConfig[field];
      }
    });

    const includeParam = this.queryParams.include as string | undefined;

    if (includeParam && typeof includeParam === "string") {
      const requestedRelations = includeParam
        .split(",")
        .map((relation) => relation.trim());

      requestedRelations.forEach((relation) => {
        if (includeConfig[relation]) {
          result[relation] = includeConfig[relation];
        }
      });
    }

    this.query.include = {
      ...(this.query.include as Record<string, unknown>),
      ...result,
    };

    return this;
  }

  where(condition: TWhereInput): this {
    this.query.where = this.deepMerge(
      this.query.where as Record<string, unknown>,
      condition as Record<string, unknown>,
    );

    this.countQuery.where = this.deepMerge(
      this.countQuery.where as Record<string, unknown>,
      condition as Record<string, unknown>,
    );

    return this;
  }

  async execute(): Promise<IQueryResult<T>> {
    const [total, data] = await Promise.all([
      this.model.count(
        this.countQuery as Parameters<typeof this.model.count>[0],
      ),
      this.model.findMany(
        this.query as Parameters<typeof this.model.findMany>[0],
      ),
    ]);

    const totalPages = Math.ceil(total / this.limit);

    return {
      data: data as T[],
      meta: {
        page: this.page,
        limit: this.limit,
        total,
        totalPages,
      },
    };
  }

  async count(): Promise<number> {
    return await this.model.count(
      this.countQuery as Parameters<typeof this.model.count>[0],
    );
  }

  getQuery(): PrismaFindManyArgs {
    return this.query;
  }

  private deepMerge(
    target: Record<string, unknown>,
    source: Record<string, unknown>,
  ): Record<string, unknown> {
    const result = { ...target };

    for (const key in source) {
      if (
        source[key] &&
        typeof source[key] === "object" &&
        !Array.isArray(source[key])
      ) {
        if (
          result[key] &&
          typeof result[key] === "object" &&
          !Array.isArray(result[key])
        ) {
          result[key] = this.deepMerge(
            result[key] as Record<string, unknown>,
            source[key] as Record<string, unknown>,
          );
        } else {
          result[key] = source[key];
        }
      } else {
        result[key] = source[key];
      }
    }
    return result;
  }

  private parseFilterValue(value: unknown): unknown {
    if (value === "true") {
      return true;
    }
    if (value === "false") {
      return false;
    }

    if (typeof value === "string" && !isNaN(Number(value)) && value != "") {
      return Number(value);
    }

    if (Array.isArray(value)) {
      return { in: value.map((item) => this.parseFilterValue(item)) };
    }

    return value;
  }

  private parseRangeFilter(
    value: Record<string, string | number>,
  ): PrismaNumberFilter | PrismaStringFilter | Record<string, unknown> {
    const rangeQuery: Record<string, string | number | (string | number)[]> =
      {};

    Object.keys(value).forEach((operator) => {
      const operatorValue = value[operator];

      const parsedValue: string | number =
        typeof operatorValue === "string" && !isNaN(Number(operatorValue))
          ? Number(operatorValue)
          : (operatorValue as string | number);

      switch (operator) {
        case "lt":
        case "lte":
        case "gt":
        case "gte":
        case "equals":
        case "not":
        case "contains":
        case "startsWith":
        case "endsWith":
          rangeQuery[operator] = parsedValue;
          break;

        case "in":
        case "notIn":
          if (Array.isArray(operatorValue)) {
            rangeQuery[operator] = operatorValue;
          } else {
            rangeQuery[operator] = [parsedValue];
          }
          break;
        default:
          break;
      }
    });

    return Object.keys(rangeQuery).length > 0 ? rangeQuery : value;
  }
}
