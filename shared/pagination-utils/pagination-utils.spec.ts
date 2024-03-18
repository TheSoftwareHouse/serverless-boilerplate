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

  it("returns valid pagination", () => {
    const result = makePaginationResult(data, 10, 4, 2);
    assert.deepEqual(result, {
      meta: {
        page: 2,
        limit: 4,
        total: 10,
        totalPages: 3,
      },
      data,
    });
  });

  it("returns valid pagination if limit is 0", () => {
    const result = makePaginationResult(data, 10, 0, 2);
    assert.deepEqual(result, {
      meta: {
        page: 2,
        limit: 0,
        total: 10,
        totalPages: null,
      },
      data,
    });
  });

  it("returns first page if passed 0 page", () => {
    const result = makePaginationResult(data, 10, 5, 2);
    assert.deepEqual(result, {
      meta: {
        page: 2,
        limit: 5,
        total: 10,
        totalPages: 2,
      },
      data,
    });
  });
});
