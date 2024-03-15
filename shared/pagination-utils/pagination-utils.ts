import { Repository } from "typeorm";
import { AppError } from "../errors/app.error";

export interface PaginationResult {
  meta: {
    page?: number;
    limit?: number;
    total: number;
    totalPages: number | null;
  };
  data: any;
}

export function calculateSkipFindOption(page: string, limit: string) {
  return (Number(page) - 1) * Number(limit);
}

export function isFilterAvailable(filter: any, repository: Repository<any>): boolean {
  const availableFilters = repository.metadata.columns.map((column) => column.propertyName);

  if (Object.keys(filter).some((key) => availableFilters.includes(key))) {
    return true;
  }
  throw new AppError("Invalid query string");
}

export function makePaginationResult(data: any, total: number, limit?: string, page?: string): PaginationResult {
  return {
    meta: {
      page: Number(page) || 1,
      limit: Number(limit),
      total,
      totalPages: limit ? Math.ceil(total / Math.max(Number(limit), 1)) : null,
    },
    data,
  };
}

export function normalizePage(page: number) {
  return Math.max(page - 1, 0);
}
