import { IQueryParams } from '@setup/interfaces';

export class QueryBuilder {
    private queryParams: IQueryParams = {};

    constructor(entity: string) {
        this.queryParams.columns = '*';
        this.queryParams.entity = entity;
    }
    setColumns(columns: string): QueryBuilder {
        this.queryParams.columns = columns;
        return this;
    }

    setJoin(join: string): QueryBuilder {
        this.queryParams.join = join;
        return this;
    }

    setCondition(condition: string): QueryBuilder {
        this.queryParams.condition = condition;
        return this;
    }

    setLimit(limit: string | number): QueryBuilder {
        this.queryParams.limit = limit;
        return this;
    }

    setGroupBy(groupBy: number): QueryBuilder {
        this.queryParams.groupBy = groupBy;
        return this;
    }

    setOrderBy(orderBy: string): QueryBuilder {
        this.queryParams.orderBy = orderBy;
        return this;
    }

    build(): string {
        if (!this.queryParams.entity) {
            throw new Error('Entity (table) must be specified.');
        }

        const { columns, entity, join, condition, limit, groupBy, orderBy } = this.queryParams;

        return `SELECT ${columns} FROM ${entity} ${join || ''} ${condition ? `WHERE ${condition}` : ''} ${groupBy || ''} ${orderBy || ''} ${limit || ''}`;
    }
}
