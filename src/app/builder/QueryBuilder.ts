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

  filter() {
    const queryObj: Record<string, unknown> = { ...this.query }; // copy

    // Filtering
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

    excludeFields.forEach((el) => delete queryObj[el]);

    // Filter by Price
    this.addPriceFilter(queryObj);

    // Filter by Release Date
    this.addReleaseDateFilter(queryObj);

    // Filter by Brand
    this.addBrandFilter(queryObj);

    // Filter by Model
    this.addModelFilter(queryObj);

    // Add other filter parameters as needed

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }

  private addPriceFilter(queryObj: Record<string, unknown>) {
    const minPrice = Number(this?.query?.minPrice);
    const maxPrice = Number(this?.query?.maxPrice);

    if (!isNaN(minPrice) && !isNaN(maxPrice)) {
      queryObj['price'] = {
        $gte: minPrice,
        $lte: maxPrice,
      };
    } else if (!isNaN(minPrice)) {
      queryObj['price'] = { $gte: minPrice };
    } else if (!isNaN(maxPrice)) {
      queryObj['price'] = { $lte: maxPrice };
    }
  }

  private addReleaseDateFilter(queryObj: Record<string, unknown>) {
    if (this?.query?.releaseDate !== undefined) {
      queryObj['releaseDate'] = this.query.releaseDate;
    }
  }

  private addBrandFilter(queryObj: Record<string, unknown>) {
    if (this.query.brand !== undefined) {
      queryObj['brand'] = { $regex: this.query.brand, $options: 'i' };
    }
  }

  private addModelFilter(queryObj: Record<string, unknown>) {
    if (this.query.model !== undefined) {
      queryObj['model'] = { $regex: this.query.model, $options: 'i' };
    }
  }

  // Add methods for other filter parameters

  sort() {
    const sort =
      (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';
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

  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(totalQueries);
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const totalPage = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPage,
    };
  }
}

export default QueryBuilder;
