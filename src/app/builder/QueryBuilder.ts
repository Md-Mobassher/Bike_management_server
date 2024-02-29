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
    // Filter By Id
    this.addIdFilter(queryObj);

    // Filter by Price
    this.addPriceFilter(queryObj);

    // Filter by Release Date
    this.addReleaseDateFilter(queryObj);

    // Filter by Brand
    this.addBrandFilter(queryObj);

    // Filter by Model
    this.addModelFilter(queryObj);

    // Filter by color
    this.addColorFilter(queryObj);

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }

  private addIdFilter(queryObj: Record<string, unknown>) {
    if (this?.query?.bikeId !== undefined) {
      queryObj['bikeId'] = this.query.bikeId;
    }
  }

  private addPriceFilter(queryObj: Record<string, unknown>) {
    const minPrice = this?.query?.minPrice;
    const maxPrice = this?.query?.maxPrice;

    if (
      minPrice !== undefined &&
      maxPrice !== undefined &&
      minPrice !== '' &&
      maxPrice !== ''
    ) {
      const numericMinPrice = Number(minPrice);
      const numericMaxPrice = Number(maxPrice);

      if (!isNaN(numericMinPrice) && !isNaN(numericMaxPrice)) {
        queryObj['price'] = {
          $gte: numericMinPrice,
          $lte: numericMaxPrice,
        };
      } else if (!isNaN(numericMinPrice)) {
        queryObj['price'] = { $gte: numericMinPrice };
      } else if (!isNaN(numericMaxPrice)) {
        queryObj['price'] = { $lte: numericMaxPrice };
      }
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

  private addColorFilter(queryObj: Record<string, unknown>) {
    if (this.query.color !== undefined) {
      queryObj['color'] = { $regex: this.query.color, $options: 'i' };
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
    const limit = Number(this?.query?.limit) || 9;
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
