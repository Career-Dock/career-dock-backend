"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(searchableFields) {
        var _a;
        const searchTerm = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.searchTerm;
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map((field) => ({
                    [field]: { $regex: searchTerm, $options: 'i' },
                })),
            });
        }
        return this;
    }
    filter(multiValueFields) {
        const queryObj = Object.assign({}, this.query); // Copy the query object
        // Filtering
        const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
        excludeFields.forEach((el) => delete queryObj[el]);
        // Dynamically handle multi-value fields
        if (multiValueFields) {
            multiValueFields.forEach((field) => {
                if (queryObj[field]) {
                    const values = queryObj[field].split('.').map((value) => value.trim());
                    queryObj[field] = { $in: values };
                }
            });
        }
        // Handle date range filtering for 'appliedDate'
        if (queryObj.dateRange) {
            const { dateRange } = queryObj;
            const today = new Date();
            let startDate;
            let endDate;
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
                        if (!isNaN(start.getTime()))
                            startDate = start;
                        if (!isNaN(end.getTime()))
                            endDate = end;
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
        this.modelQuery = this.modelQuery.find(queryObj);
        return this;
    }
    sort() {
        var _a, _b, _c;
        const sort = ((_c = (_b = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.sort) === null || _b === void 0 ? void 0 : _b.split(',')) === null || _c === void 0 ? void 0 : _c.join(' ')) ||
            '-createdAt';
        this.modelQuery = this.modelQuery.sort(sort);
        return this;
    }
    paginate() {
        var _a, _b;
        const page = Number((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.page) || 1;
        const limit = Number((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.limit) || 10;
        const skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }
    fields() {
        var _a, _b, _c;
        const fields = ((_c = (_b = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.fields) === null || _b === void 0 ? void 0 : _b.split(',')) === null || _c === void 0 ? void 0 : _c.join(' ')) || '-__v';
        this.modelQuery = this.modelQuery.select(fields);
        return this;
    }
}
exports.default = QueryBuilder;
