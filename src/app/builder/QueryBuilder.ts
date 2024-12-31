import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
    public modelQuery: Query<T[], T>;
    public query: Record<string, unknown>;

    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        this.modelQuery = modelQuery;
        this.query = query;
    }

    search(searchableFields: string[]) {
        const searchTerm = this?.query?.searchTerm;
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map(
                    (field) =>
                        ({
                            [field]: { $regex: searchTerm, $options: 'i' },
                        }) as FilterQuery<T>,
                ),
            });
        }

        return this;
    }

    filter(multiValueFields: string[] | null) {
        const queryObj = { ...this.query }; // Copy the query object

        // Filtering
        const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
        excludeFields.forEach((el) => delete queryObj[el]);
        // Dynamically handle multi-value fields
        if (multiValueFields) {
            multiValueFields.forEach((field) => {
                if (queryObj[field]) {
                    const values = (queryObj[field] as string).split('.').map((value) => value.trim());
                    queryObj[field] = { $in: values };
                }
            });
        }
        // Handle date range filtering for 'appliedDate'
        if (queryObj.dateRange) {
            const { dateRange } = queryObj;
            const today = new Date();
            let startDate: Date | undefined;
            let endDate: Date | undefined;

            switch (dateRange) {
                case 'today':
                    startDate = new Date(today.setHours(0, 0, 0, 0));
                    endDate = new Date(today.setHours(23, 59, 59, 999));
                    break;
                case 'yesterday':
                    startDate = new Date(today.setDate(today.getDate() - 1));
                    startDate.setHours(0, 0, 0, 0);
                    endDate = new Date(today.setHours(23, 59, 59, 999));
                    break;
                case 'last7days':
                    startDate = new Date(today.setDate(today.getDate() - 7));
                    startDate.setHours(0, 0, 0, 0);
                    endDate = new Date();
                    break;
                case 'last30days':
                    startDate = new Date(today.setDate(today.getDate() - 30));
                    startDate.setHours(0, 0, 0, 0);
                    endDate = new Date();
                    break;
                case 'thisMonth':
                    startDate = new Date(today.getFullYear(), today.getMonth(), 1);
                    endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
                    break;
                case 'lastMonth':
                    startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
                    endDate = new Date(today.getFullYear(), today.getMonth(), 0);
                    break;
                default:
                    if (typeof dateRange === 'string') {
                        const [start, end] = dateRange.split(',').map((date) => new Date(date.trim()));
                        if (!isNaN(start.getTime())) startDate = start;
                        if (!isNaN(end.getTime())) endDate = end;
                    }
                    break;
            }

            if (startDate && endDate) {
                queryObj.appliedDate = {
                    $gte: startDate.toISOString(),
                    $lte: endDate.toISOString(),
                };
            }

            delete queryObj.dateRange; // Remove dateRange after processing
        }

        this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
        return this;
    }

    sort() {
        const sort =
            (this?.query?.sort as string)?.split(',')?.join(' ') ||
            '-createdAt';
        this.modelQuery = this.modelQuery.sort(sort as string);

        return this;
    }

    paginate() {
        const page = Number(this?.query?.page) || 1;
        const limit = Number(this?.query?.limit) || 10;
        const skip = (page - 1) * limit;

        this.modelQuery = this.modelQuery.skip(skip).limit(limit);

        return this;
    }

    fields() {
        const fields =
            (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';

        this.modelQuery = this.modelQuery.select(fields);
        return this;
    }
}

export default QueryBuilder;
