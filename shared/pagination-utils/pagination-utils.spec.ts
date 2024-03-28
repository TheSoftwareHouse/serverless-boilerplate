import assert from "assert";
import { makePaginationResult } from "./pagination-utils";

describe("pagination-utils", () => {
  const data = [
    {
      id: "155bed9b-54d9-4605-b2cb-c4b19618d28b",
      firstName: "John",
      lastName: "Doe",
      email: "john@doe.com",
    },
    {
      id: "85e8ec60-1cc6-471a-9894-06a03560731c",
      firstName: "John2",
      lastName: "Doe2",
      email: "john2@doe.com",
    },
  ];

  const queryFilters = { order: { firstName: "ASC" }, where: { lastName: "Doe" } };

  it("returns valid pagination", () => {
    const result = makePaginationResult(data, 10, { take: 4, skip: 2, ...queryFilters }, "john");
    assert.deepEqual(result, {
      meta: {
        pagination: {
          page: 2,
          limit: 4,
          total: 10,
          totalPages: 3,
        },
        filter: queryFilters.where,
        sort: queryFilters.order,
        search: "john",
      },
      data,
    });
  });

  it("returns valid pagination if limit is 0", () => {
    const result = makePaginationResult(data, 10, { take: 0, skip: 2, ...queryFilters }, "john");
    assert.deepEqual(result, {
      meta: {
        pagination: {
          page: 2,
          limit: 0,
          total: 10,
          totalPages: null,
        },
        filter: queryFilters.where,
        sort: queryFilters.order,
        search: "john",
      },
      data,
    });
  });

  it("returns first page if passed 0 page", () => {
    const result = makePaginationResult(data, 10, { take: 5, skip: 2, ...queryFilters }, "john");
    assert.deepEqual(result, {
      meta: {
        pagination: {
          page: 2,
          limit: 5,
          total: 10,
          totalPages: 2,
        },
        filter: queryFilters.where,
        sort: queryFilters.order,
        search: "john",
      },
      data,
    });
  });
});
