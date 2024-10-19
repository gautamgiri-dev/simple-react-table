import React, { useEffect, useState } from "react";
import "./styles.css";
import { IconArrowLeft, IconArrowRight, IconSearch } from "./icons/icons.tsx";
import { twMerge } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";

export type ITableHeader<T extends object> = {
  [key in keyof T]?: {
    label: React.ReactNode;
    renderer?: (obj: T[key]) => React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLTableCellElement>;
    hidden?: boolean;
  };
};

export type ICustomHeader<T extends object> = {
  label: React.ReactNode;
  renderer: (obj: T) => React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLTableCellElement>;
  hidden?: boolean;
  className?: string;
};

export type ITableElementClass<T extends object> = {
  [key in keyof T | "sNo"]?: string;
};

export type ITableDataClickListeners<T extends object> = {
  [key in keyof T]?: (
    e: React.MouseEvent<HTMLTableCellElement, MouseEvent>,
    data: T,
  ) => void;
};

export type ITableDataProperties<T extends object> = {
  [key in keyof T]?: React.DetailedHTMLProps<
    React.TdHTMLAttributes<HTMLTableCellElement>,
    HTMLTableCellElement
  >;
};

export interface ITableFilterOptions<T extends object> {
  by: keyof T;
  label: string;
  valueExtractor?: (obj: T[keyof T]) => string | number | readonly string[];
  onFilterChange?: (val: string) => void;
  defaultValue?: string | number | readonly string[];
  className?: string;
}

export interface ITableSearchOptions {
  placeholder?: string;
  searchBehaviour?: "button" | "type";
  onKeywordChange?: (keywords: string[]) => void;
  classNames?: {
    icon?: string;
    input?: string;
    button?: string;
  };
}

export interface ITableSortOptions<T extends object> {
  enabled: boolean;
  sorter: (a: T, b: T) => number;
}

export type ITableCustomFilter<T extends object> = (obj: T) => boolean;

export interface PaginationProps {
  totalLength: number;
  start: number;
  offset: number;
  onNext?: (paginator: PaginationProps) => void;
  onPrev?: (paginator: PaginationProps) => void;
  onOffsetChange?: (paginator: PaginationProps) => void;
}

export interface ICustomClasses<T extends object> {
  thead?: string;
  td?: ITableElementClass<T> | string;
  th?: ITableElementClass<T> | string;
  tr?: ((row: T) => string) | string;
  noRecords?: string;
  loadingRow?: string;
  checkBox?: string;
  filter?: string;
  serial?: string;
  paginator?: {
    wrapper?: string;
    selectWrapper?: string;
    select?: string;
    navigationWrapper?: string;
    navButton?: string;
    prevButton?: string;
    navigationTextWrapper?: string;
    text?: string;
    startText?: string;
    endText?: string;
    totalText?: string;
    nextButton?: string;
  };
}

type TailwindColor =
  | "slate"
  | "gray"
  | "zinc"
  | "neutral"
  | "stone"
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose"
  | string;

export interface SimpleReactTableProps<T extends object> {
  theme?: TailwindColor;
  className?: string;
  autoSerial?: boolean;
  autoCheckBox?: boolean;
  clearSearch?: boolean;
  isLoading?: boolean;
  loadingComponent?: React.ReactNode;
  data: T[];
  headers: ITableHeader<T>;
  customHeaders?: ICustomHeader<T>[];
  primaryFilterOptions?: ITableFilterOptions<T>;
  searchOptions?: ITableSearchOptions;
  sortingOptions?: ITableSortOptions<T>;
  customClasses?: ICustomClasses<T>;
  tableDataProperties?: ITableDataProperties<T>;
  tableDataClickListeners?: ITableDataClickListeners<T>;
  customFilters?: ITableCustomFilter<T>[];
  customRowTitles?: ((row: T) => string) | string;
  customRowClickHandlers?: (
    event?: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    row?: T,
  ) => void;
  onObjectChecked?: (obj: T, checked: boolean) => void;
  onAllCheckedChange?: (
    checked: boolean,
    start: number,
    offset: number,
  ) => void;
  customPaginator?: PaginationProps;
}

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function SimpleReactTable<T extends object>({
  theme = "blue",
  ...props
}: SimpleReactTableProps<T>) {
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedBoxes, setCheckedBoxes] = useState<T[]>([]);

  const [pagination, setPagination] = useState<PaginationProps>(
    props.customPaginator ?? {
      totalLength: props.data.length,
      start: 0,
      offset: 10,
    },
  );

  const [defaultFilterOptions, setDefaultFilterOptions] = useState<
    T[keyof T][]
  >([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  function processData(key: keyof T, entry: T, header: ITableHeader<T>) {
    if (header[key]?.renderer) return header[key]?.renderer?.(entry[key]);
    else return entry[key] as string;
  }

  function handleObjectSelection(
    e: React.ChangeEvent<HTMLInputElement>,
    obj: T,
  ) {
    if (!checkedBoxes.includes(obj))
      setCheckedBoxes((prevEntries) => [...prevEntries, obj]);
    if (checkedBoxes.includes(obj)) {
      setCheckedAll(false);
      setCheckedBoxes((prevEntries) => prevEntries.filter((x) => x !== obj));
    }

    props.onObjectChecked?.(obj, e.target.checked);
  }

  function handleAllSelected(e: React.ChangeEvent<HTMLInputElement>) {
    setCheckedAll(e.target.checked);
    setCheckedBoxes(e.target.checked ? props.data : []);
    props.onAllCheckedChange?.(
      e.target.checked,
      pagination.start,
      pagination.offset,
    );
  }

  function handleKeywordFilter(
    event: React.ChangeEvent<HTMLInputElement>,
  ): void {
    const rawKeywords = event.target.value;
    setSearchKeyword(rawKeywords);

    // Add debounce for performance increase (later)
    // if (typingTimeout) {
    //   clearTimeout(typingTimeout);
    // }

    // typingTimeout = setTimeout(() => {
    //   console.log("User to pause typing");
    // }, 500);
    // props.onFilterChange?.(tableDataOptions);

    if (props.searchOptions?.searchBehaviour === "type")
      props.searchOptions?.onKeywordChange?.(
        rawKeywords
          .split(",")
          .map((x) => x.trim())
          .filter((x) => !!x),
      );
  }

  function handleOnSearchClicked(keywords = searchKeyword) {
    if (props.searchOptions?.searchBehaviour !== "type")
      props.searchOptions?.onKeywordChange?.(
        keywords
          .split(",")
          .map((x) => x.trim())
          .filter((x) => !!x),
      );
  }

  function calculateDefaultFilterOptions() {
    if (props.primaryFilterOptions && !defaultFilterOptions.length) {
      const labelledArray = props.data
        .map((x) => x[props.primaryFilterOptions!.by!])
        .map((x) => getOptionLabel(x));

      const dfo = props.data
        .map((x) => x[props.primaryFilterOptions!.by!])
        .filter(
          (val, idx) => labelledArray.indexOf(getOptionLabel(val)) === idx,
        );

      setDefaultFilterOptions(dfo);
    }
  }

  function getOptionLabel(obj: T[keyof T]) {
    const filterHeader = props.headers?.[props.primaryFilterOptions!.by!];

    if (filterHeader) {
      if (filterHeader.renderer) return filterHeader.renderer?.(obj);
    }
    return obj as string;
  }

  function getElementOrDefaultClass(
    key: keyof ITableElementClass<T>,
    value?: ITableElementClass<T> | string,
  ) {
    if (!value) return undefined;
    if (typeof value === "string") return value as string;
    else return value[key];
  }

  useEffect(() => {
    calculateDefaultFilterOptions();
  }, []);

  useEffect(() => {
    setSearchKeyword("");
  }, [props.clearSearch]);

  useEffect(() => {
    setCheckedAll(false);
    setCheckedBoxes([]);

    props.onAllCheckedChange?.(false, pagination.start, pagination.offset);
  }, [pagination]);

  useEffect(() => {
    setPagination((prev) => ({ ...prev, start: 0 }));
    calculateDefaultFilterOptions();
  }, [props.data]);

  return (
    <div
      className={cn(
        "w-full pr-8 px-2 overflow-auto duration-300 ease-in",
        props.className,
      )}
    >
      <div className="flex py-2 gap-1">
        {props.primaryFilterOptions && (
          <div
            className={cn(
              `relative text-${theme}-600 text-sm`,
              props.primaryFilterOptions.className,
            )}
          >
            <select
              id="filter"
              className={cn(
                `py-2 pr-8 rounded-md max-w-[20ch] border border-${theme}-300`,
                props.customClasses?.filter,
              )}
              onChange={(e) =>
                props?.primaryFilterOptions?.onFilterChange?.(e.target.value)
              }
              value={props?.primaryFilterOptions?.defaultValue?.toString()}
            >
              <option value={-1}>{props.primaryFilterOptions?.label}</option>
              {defaultFilterOptions.map((x, idx) => (
                <option
                  value={props.primaryFilterOptions?.valueExtractor?.(x) || idx}
                  key={idx}
                >
                  {getOptionLabel(x)}
                </option>
              ))}
            </select>
          </div>
        )}
        {props.searchOptions && (
          <div className="relative flex-1 flex gap-1">
            <div
              className={cn(
                `absolute top-1/2 -translate-y-1/2 left-3 text-${theme}-400 pointer-events-none hidden`,
                props.searchOptions.classNames?.icon,
              )}
            >
              <IconSearch />
            </div>
            <label htmlFor="keyword-filter" className="sr-only">
              Search using keywords
            </label>
            <input
              onChange={handleKeywordFilter}
              type="search"
              id="keyword-filter"
              placeholder={
                props.searchOptions?.placeholder ||
                "Enter keywords to search in table (use comma to separate multiple terms if required)"
              }
              className={cn(
                `flex-grow w-0 pl-10 text-sm py-2 px-2 rounded-md border border-${theme}-300 focus:outline-none outline-none`,
                props.searchOptions.classNames?.input,
              )}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleOnSearchClicked();
              }}
              value={searchKeyword}
            />
            {props.searchOptions.searchBehaviour !== "type" && (
              <button
                onClick={() => handleOnSearchClicked()}
                className={cn(
                  `px-4 py-2 text-sm font-semibold text-white bg-${theme}-600 rounded-md hover:bg-${theme}-600 active:bg-${theme}-800`,
                  props.searchOptions.classNames?.button,
                )}
              >
                Search
              </button>
            )}
          </div>
        )}
      </div>
      <table className="w-full text-left" aria-label="Data Table">
        <thead
          className={cn(
            `text-${theme}-600 bg-${theme}-100 uppercase`,
            props.customClasses?.thead,
          )}
        >
          <tr>
            {props.autoCheckBox && (
              <th
                scope="col"
                className="px-6 py-3 text-center flex gap-1 items-center justify-center"
              >
                <input
                  id="select-all-checkbox"
                  type="checkbox"
                  className={cn(
                    `w-4 h-4 accent-${theme}-600 bg-${theme}-100 border-${theme}-300 rounded`,
                    props.customClasses?.checkBox,
                  )}
                  checked={checkedAll}
                  onChange={handleAllSelected}
                />
              </th>
            )}
            {props.autoSerial && (
              <th
                scope="col"
                className={cn(
                  "px-6 py-3",
                  getElementOrDefaultClass("sNo", props?.customClasses?.th) ||
                    "",
                )}
              >
                S. No.
              </th>
            )}
            {props.headers &&
              Object.keys(props.headers)
                .map((x) => x as keyof T)
                .filter((key) => !props.headers?.[key]?.hidden)
                .map((x, idx) => (
                  <th
                    scope="col"
                    className={cn(
                      "px-4 py-3 whitespace-nowrap select-none",
                      props.headers?.[x]?.onClick ? "cursor-pointer" : "",
                    )}
                    key={idx}
                    onClick={props.headers?.[x]?.onClick}
                  >
                    <div
                      className={cn(
                        "",
                        getElementOrDefaultClass(x, props.customClasses?.th),
                      )}
                    >
                      {props.headers?.[x]?.label}
                    </div>
                  </th>
                ))}
            {props.customHeaders?.length &&
              props.customHeaders
                .filter((customHeader) => !customHeader.hidden)
                .map((x, idx) => (
                  <th
                    scope="col"
                    className={cn(
                      "px-4 py-3 whitespace-nowrap select-none",
                      x.onClick ? "cursor-pointer" : "",
                    )}
                    key={idx}
                    onClick={x?.onClick}
                  >
                    <div className={cn("", x.className)}>{x.label}</div>
                  </th>
                ))}
          </tr>
        </thead>

        <tbody className="[&>tr]:border-b">
          {props.isLoading && (
            <tr
              className={cn(
                `text-center w-full text-${theme}-400 text-lg py-2`,
                props.customClasses?.loadingRow,
              )}
            >
              <td className="py-8" colSpan={100}>
                {props.loadingComponent ? (
                  <div className="absolute left-1/2 top-1/2">
                    {props.loadingComponent}
                  </div>
                ) : (
                  "Loading..."
                )}
              </td>
            </tr>
          )}

          {!props.data.length && !props.isLoading && (
            <tr
              className={cn(
                `text-center w-full text-${theme}-400`,
                props.customClasses?.noRecords,
              )}
            >
              <td className="px-4 py-2 text-lg" colSpan={100}>
                No records found
              </td>
            </tr>
          )}

          {(props.sortingOptions && props.sortingOptions.enabled
            ? props.data.sort(props.sortingOptions.sorter)
            : props.customFilters
              ? props.customFilters.reduce((a, b) => a.filter(b), props.data)
              : props.data
          )
            .slice(pagination.start, pagination.start + pagination.offset)
            .map((row, idx) => {
              return (
                <tr
                  onClick={(e) => props.customRowClickHandlers?.(e, row)}
                  className={cn(
                    (typeof props.customClasses?.tr == "string"
                      ? props.customClasses?.tr
                      : props.customClasses?.tr?.(row)) || "",
                  )}
                  key={idx}
                  title={
                    (typeof props.customRowTitles == "string"
                      ? props.customRowTitles
                      : props.customRowTitles?.(row)) || undefined
                  }
                >
                  {props.autoCheckBox && (
                    <td className="text-center">
                      <input
                        type="checkbox"
                        className={cn(
                          `w-4 h-4 accent-${theme}-600 bg-${theme}-100 border-${theme}-300 rounded`,
                          props.customClasses?.checkBox,
                        )}
                        checked={checkedAll || checkedBoxes.includes(row)}
                        onChange={(e) => handleObjectSelection(e, row)}
                      />
                    </td>
                  )}
                  {props.autoSerial && (
                    <td
                      className={cn("px-4 py-2", props.customClasses?.serial)}
                    >
                      {pagination.start + idx + 1}
                    </td>
                  )}
                  {props.headers &&
                    Object.keys(props.headers)
                      .map((key) => key as keyof T)
                      .filter((key) => !props.headers?.[key]?.hidden)
                      .map((y, idy) => (
                        <td
                          {...(props.tableDataProperties
                            ? props.tableDataProperties[y]
                            : {})}
                          onClick={(e) =>
                            props.tableDataClickListeners?.[y]?.(e, row)
                          }
                          className={cn(
                            "px-4 py-2",
                            getElementOrDefaultClass(
                              y,
                              props.customClasses?.td,
                            ),
                          )}
                          key={idy}
                        >
                          {processData(y, row, props.headers)}
                        </td>
                      ))}

                  {props.customHeaders?.length &&
                    props.customHeaders
                      .filter((customHeader) => !customHeader.hidden)
                      .map((y, idy) => (
                        <td className={cn("px-4 py-2")} key={idy}>
                          {y.renderer(row)}
                        </td>
                      ))}
                </tr>
              );
            })}
        </tbody>
      </table>
      <div
        className={cn(
          "mt-10 flex justify-between",
          props.customClasses?.paginator?.wrapper,
        )}
      >
        <div
          className={cn(props.customClasses?.paginator?.selectWrapper)}
          aria-label="User table navigation & pagination controls"
        >
          <label htmlFor="record-per-page" className="text-sm">
            Showing
            <select
              id="record-per-page"
              className={cn(
                `mx-1 border px-1 py-1 rounded outline-none text-${theme}-600 font-medium hover:border-${theme}-600 focus:ring-1 focus:ring-${theme}-600/50 hover:shadow duration-300 ease-in-out`,
                props.customClasses?.paginator?.select,
              )}
              onChange={(e) => {
                const newPaginator = {
                  ...pagination,
                  start: 0,
                  offset: parseInt(e.target.value),
                };
                props.customPaginator?.onOffsetChange?.(newPaginator);
                setPagination(newPaginator);
              }}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value={pagination.totalLength}>All</option>
            </select>
            per page
          </label>
        </div>
        <div
          className={cn(
            "inline-flex select-none",
            props.customClasses?.paginator?.navigationWrapper,
          )}
        >
          <button
            className={cn(
              `flex items-center gap-1 justify-center px-4 py-2 text-sm text-${theme}-600 bg-${theme}-700/20 hover:bg-${theme}-700/30 disabled:hover:bg-gray-300 disabled:bg-gray-300 rounded-l`,
              props.customClasses?.paginator?.navButton,
              props.customClasses?.paginator?.prevButton,
            )}
            onClick={() => {
              const newPaginator = {
                ...pagination,
                start: pagination.start - pagination.offset,
              };
              props.customPaginator?.onPrev?.(newPaginator);
              setPagination(newPaginator);
            }}
            disabled={pagination.start <= 0}
          >
            <IconArrowLeft />
            Prev
          </button>
          <div
            className={cn(
              `flex items-center text-sm px-2 bg-${theme}-600/20 border-x text-black`,
              props.customClasses?.paginator?.navigationTextWrapper,
            )}
          >
            <span className="text-gray-6">
              Showing{" "}
              <span
                className={cn(
                  `font-semibold text-${theme}-600`,
                  props.customClasses?.paginator?.text,
                  props.customClasses?.paginator?.startText,
                )}
              >
                {(props.sortingOptions && props.sortingOptions.enabled
                  ? props.data.sort(props.sortingOptions.sorter)
                  : props.customFilters
                    ? props.customFilters.reduce(
                        (a, b) => a.filter(b),
                        props.data,
                      )
                    : props.data
                ).length
                  ? pagination.start + 1
                  : 0}
              </span>{" "}
              to{" "}
              <span
                className={cn(
                  `font-semibold text-${theme}-600`,
                  props.customClasses?.paginator?.text,
                  props.customClasses?.paginator?.endText,
                )}
              >
                {Math.min(
                  pagination.start + pagination.offset,
                  (props.sortingOptions && props.sortingOptions.enabled
                    ? props.data.sort(props.sortingOptions.sorter)
                    : props.customFilters
                      ? props.customFilters.reduce(
                          (a, b) => a.filter(b),
                          props.data,
                        )
                      : props.data
                  ).length,
                )}
              </span>{" "}
              of{" "}
              <span
                className={cn(
                  `font-semibold text-${theme}-600`,
                  props.customClasses?.paginator?.text,
                  props.customClasses?.paginator?.totalText,
                )}
              >
                {
                  (props.sortingOptions && props.sortingOptions.enabled
                    ? props.data.sort(props.sortingOptions.sorter)
                    : props.customFilters
                      ? props.customFilters.reduce(
                          (a, b) => a.filter(b),
                          props.data,
                        )
                      : { length: pagination.totalLength }
                  ).length
                }
              </span>{" "}
              Entries
            </span>
          </div>
          <button
            onClick={() => {
              const newPaginator = {
                ...pagination,
                start: pagination.start + pagination.offset,
              };
              props.customPaginator?.onNext?.(newPaginator);
              setPagination(newPaginator);
            }}
            className={cn(
              `flex items-center gap-1 justify-center px-4 py-2 text-sm text-${theme}-600 bg-${theme}-700/20 hover:bg-${theme}-700/30 disabled:hover:bg-gray-300 disabled:bg-gray-300 rounded-r`,
              props.customClasses?.paginator?.navButton,
              props.customClasses?.paginator?.nextButton,
            )}
            disabled={
              pagination.start + pagination.offset >=
              (props.sortingOptions && props.sortingOptions.enabled
                ? props.data.sort(props.sortingOptions.sorter)
                : props.customFilters
                  ? props.customFilters.reduce(
                      (a, b) => a.filter(b),
                      props.data,
                    )
                  : { length: pagination.totalLength }
              ).length
            }
          >
            Next
            <IconArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
