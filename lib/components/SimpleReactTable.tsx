import { useEffect, useState } from "react";
import './styles.css'
import {CiSearch} from "react-icons/ci";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa6";
interface ITableHeader<T extends object> {
    label: React.ReactNode;
    key: keyof T;
    processor?: (obj: T[keyof T]) => React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLTableCellElement>;
    hidden?: boolean;
}

type ITableElementClass<T extends object> = {
    [key in keyof T | "sNo"]?: string;
};

type ITableDataClickListeners<T extends object> = {
    [key in keyof T]?: (
        e: React.MouseEvent<HTMLTableCellElement, MouseEvent>,
        data: T
    ) => void;
};

type ITableDataProperties<T extends object> = {
    [key in keyof T]?: React.DetailedHTMLProps<
        React.TdHTMLAttributes<HTMLTableCellElement>,
        HTMLTableCellElement
    >;
};

interface ITableFilterOptions<T extends object> {
    by?: keyof T;
    label?: string;
    valueExtractor?: (obj: T[keyof T]) => string | number | readonly string[];
    onFilterChange?: (val: string) => void;
    defaultValue?: string | number | readonly string[];
}

interface ITableSearchOptions {
    placeholder?: string;
    searchBehaviour?: "button" | "type";
    onKeywordChange?: (keywords: string[]) => void;
}

interface ITableSortOptions<T extends object> {
    enabled: boolean;
    sorter: (a: T, b: T) => number;
}

type ITableCustomFilter<T extends object> = (obj: T) => boolean;

interface SimpleReactTableProps<T extends object> {
    className?: string;
    autoSerial?: boolean;
    autoCheckBox?: boolean;
    enableFilters?: boolean;
    enableSearch?: boolean;
    clearSearch?: boolean;
    isLoading?: boolean;
    loadingComponent?: React.ReactNode;
    data: T[];
    headers?: ITableHeader<T>[];
    filterOptions?: ITableFilterOptions<T>;
    searchOptions?: ITableSearchOptions;
    sortingOptions?: ITableSortOptions<T>;
    tableDataClasses?: ITableElementClass<T>;
    tableHeaderClasses?: ITableElementClass<T>;
    tableDataProperties?: ITableDataProperties<T>;
    tableDataClickListeners?: ITableDataClickListeners<T>;
    customFilters?: ITableCustomFilter<T>[];
    customRowClasses?: ((row: T) => string) | string;
    customRowTitles?: ((row: T) => string) | string;
    customRowClickHandlers?: (
        event?: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
        row?: T
    ) => void;
    onObjectChecked?: (obj: T, checked: boolean) => void;
    onAllCheckedChange?: (
        checked: boolean,
        start: number,
        offset: number
    ) => void;
}

interface PaginationProps {
    start: number;
    offset: number;
}

export function SimpleReactTable<T extends object>(
    props: SimpleReactTableProps<T>
) {
    const [checkedAll, setCheckedAll] = useState(false);
    const [checkedBoxes, setCheckedBoxes] = useState<T[]>([]);

    const [pagination, setPagination] = useState<PaginationProps>({
        start: 0,
        offset: 10,
    });

    const [defaultFilterOptions, setDefaultFilterOptions] = useState<
        T[keyof T][]
    >([]);
    const [searchKeyword, setSearchKeyword] = useState("");

    function processStyle(
        key: keyof T,
        style?: ITableElementClass<T>,
        defaultStyle?: string
    ) {
        let df = defaultStyle || "";
        if (style?.[key]) df = `${df} ${style[key]}`;

        return df;
    }

    function processData(entry: T, header: ITableHeader<T>) {
        if (header.processor) return header.processor(entry[header.key]);
        else return entry[header.key] as string;
    }

    function handleObjectSelection(
        e: React.ChangeEvent<HTMLInputElement>,
        obj: T
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
            pagination.offset
        );
    }

    function handleKeywordFilter(
        event: React.ChangeEvent<HTMLInputElement>
    ): void {
        if (!event.target.value) handleOnSearchClicked("");

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
                    .filter((x) => !!x)
            );
    }

    function handleOnSearchClicked(keywords = searchKeyword) {
        if (props.searchOptions?.searchBehaviour !== "type")
            props.searchOptions?.onKeywordChange?.(
                keywords
                    .split(",")
                    .map((x) => x.trim())
                    .filter((x) => !!x)
            );
    }

    function calculateDefaultFilterOptions() {
        if (
            props.enableFilters &&
            props.filterOptions &&
            !defaultFilterOptions.length
        ) {
            const labelledArray = props.data
                .map((x) => x[props.filterOptions!.by!])
                .map((x) => getOptionLabel(x));

            const dfo = props.data
                .map((x) => x[props.filterOptions!.by!])
                .filter(
                    (val, idx) => labelledArray.indexOf(getOptionLabel(val)) === idx
                );

            setDefaultFilterOptions(dfo);
        }
    }

    function getOptionLabel(obj: T[keyof T]) {
        const filterHeader = props.headers?.find(
            (x) => x.key === props.filterOptions?.by
        );

        if (filterHeader) {
            if (filterHeader.processor) return filterHeader.processor?.(obj);
        }
        return obj as string;
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
            className={
                "w-full pr-8 px-2 overflow-auto duration-300 ease-in" +
                (props.className || "")
            }
        >
            <div className="flex py-2 gap-1">
                {props.enableFilters && props.filterOptions && (
                    <div className="relative text-medium-blue text-sm">
                        <select
                            id="filter"
                            className="py-2 pr-8 rounded-md max-w-[20ch]"
                            onChange={(e) =>
                                props?.filterOptions?.onFilterChange?.(e.target.value)
                            }
                            value={props?.filterOptions?.defaultValue?.toString()}
                        >
                            <option value={-1}>{props.filterOptions?.label}</option>
                            {defaultFilterOptions.map((x, idx) => (
                                <option
                                    value={props.filterOptions?.valueExtractor?.(x) || idx}
                                    key={idx}
                                >
                                    {getOptionLabel(x)}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 -rotate-90 pointer-events-none">
                            <CiSearch />
                        </div>
                    </div>
                )}
                {props.enableSearch && props.searchOptions && (
                    <div className="relative flex-1 flex gap-1">
                        <div className="absolute top-1/2 -translate-y-1/2 left-3 text-blue-400 pointer-events-none">
                            <CiSearch size={24} />
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
                            className={
                                "flex-grow w-0 pl-10 text-sm py-2 px-2 rounded-md border border-blue-300 focus:outline-none outline-none" +
                                (props.searchOptions?.searchBehaviour === "type"
                                    ? "rounded-l-none"
                                    : "rounded-none")
                            }
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleOnSearchClicked();
                            }}
                            value={searchKeyword}
                        />
                        {props.searchOptions.searchBehaviour !== "type" && (
                            <button
                                onClick={() => handleOnSearchClicked()}
                                className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-600 active:bg-blue-800"
                            >
                                Search
                            </button>
                        )}
                    </div>
                )}
            </div>
            <table className="w-full text-left" aria-label="Data Table">
                <thead className="text-blue-600 bg-blue-100 uppercase">
                <tr>
                    {props.autoCheckBox && (
                        <th
                            scope="col"
                            className="px-6 py-3 text-center flex gap-1 items-center justify-center"
                        >
                            <input
                                id="select-all-checkbox"
                                type="checkbox"
                                className="w-4 h-4 accent-blue-600 bg-blue-100 border-blue-300 rounded"
                                checked={checkedAll}
                                onChange={handleAllSelected}
                            />
                        </th>
                    )}
                    {props.autoSerial && (
                        <th
                            scope="col"
                            className={"px-6 py-3 " + (props.tableHeaderClasses?.sNo || "")}
                        >
                            S. No.
                        </th>
                    )}
                    {props.headers &&
                        props.headers
                            .filter((x) => !x.hidden)
                            .map((x, idx) => (
                                <th
                                    scope="col"
                                    className={
                                        "px-4 py-3 whitespace-nowrap select-none " +
                                        (x.onClick ? "cursor-pointer" : "")
                                    }
                                    key={idx}
                                    onClick={x.onClick}
                                >
                                    <div
                                        className={processStyle(
                                            x.key,
                                            props.tableHeaderClasses,
                                            ""
                                        )}
                                    >
                                        {x.label}
                                    </div>
                                </th>
                            ))}
                </tr>
                </thead>

                <tbody className="[&>tr]:border-b">
                {props.isLoading && (
                    <tr className="text-center w-full text-blue-400 text-lg py-2">
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
                    <tr className="text-center w-full text-blue-400">
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
                    .map((x, idx) => {
                        return (
                            <tr
                                onClick={(e) => props.customRowClickHandlers?.(e, x)}
                                className={
                                    "" +
                                    ((typeof props.customRowClasses == "string"
                                        ? props.customRowClasses
                                        : props.customRowClasses?.(x)) || "")
                                }
                                key={idx}
                                title={
                                    (typeof props.customRowTitles == "string"
                                        ? props.customRowTitles
                                        : props.customRowTitles?.(x)) || undefined
                                }
                            >
                                {props.autoCheckBox && (
                                    <td className="text-center">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 accent-blue-600 bg-blue-100 border-blue-300 rounded"
                                            checked={checkedAll || checkedBoxes.includes(x)}
                                            onChange={(e) => handleObjectSelection(e, x)}
                                        />
                                    </td>
                                )}
                                {props.autoSerial && (
                                    <td className="px-4 py-2 text-center">
                                        {pagination.start + idx + 1}
                                    </td>
                                )}
                                {props.headers
                                    ?.filter((x) => !x.hidden)
                                    .map((y, idy) => (
                                        <td
                                            {...(props.tableDataProperties
                                                ? props.tableDataProperties[y.key]
                                                : {})}
                                            onClick={(e) =>
                                                props.tableDataClickListeners?.[y.key]?.(e, x)
                                            }
                                            className={processStyle(
                                                y.key,
                                                props.tableDataClasses,
                                                "px-4 py-2"
                                            )}
                                            key={idy}
                                        >
                                            {processData(x, y)}
                                        </td>
                                    ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="mt-10 flex justify-between">
                <div aria-label="User table navigation & pagination controls">
                    <label htmlFor="record-per-page" className="text-sm">
                        Showing
                        <select
                            id="record-per-page"
                            className="mx-1 border px-1 py-1 rounded outline-none text-blue-600 font-medium hover:border-blue-600 focus:ring-1 focus:ring-blue-600/50 hover:shadow duration-300 ease-in-out"
                            onChange={(e) => {
                                setPagination(() => ({
                                    start: 0,
                                    offset: parseInt(e.target.value),
                                }));
                            }}
                        >
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value={props.data.length}>All</option>
                        </select>
                        per page
                    </label>
                </div>
                <div className="inline-flex select-none">
                    <button
                        className="flex items-center gap-1 justify-center px-4 py-2 text-sm text-blue-600 bg-blue-700/20 hover:bg-blue-700/30 disabled:hover:bg-gray-300 disabled:bg-gray-300 rounded-l"
                        onClick={() =>
                            setPagination((prev) => ({
                                ...prev,
                                start: prev.start - prev.offset,
                            }))
                        }
                        disabled={pagination.start <= 0}
                    >
                        <FaArrowLeft />
                        Prev
                    </button>
                    <div className="flex items-center text-sm px-2 bg-blue-600/20 border-x text-black">
            <span className="text-gray-6">
              Showing{" "}
                <span className="font-semibold text-blue-600">
                {(props.sortingOptions && props.sortingOptions.enabled
                        ? props.data.sort(props.sortingOptions.sorter)
                        : props.customFilters
                            ? props.customFilters.reduce(
                                (a, b) => a.filter(b),
                                props.data
                            )
                            : props.data
                ).length
                    ? pagination.start + 1
                    : 0}
              </span>{" "}
                to{" "}
                <span className="font-semibold text-blue-600">
                {Math.min(
                    pagination.start + pagination.offset,
                    (props.sortingOptions && props.sortingOptions.enabled
                            ? props.data.sort(props.sortingOptions.sorter)
                            : props.customFilters
                                ? props.customFilters.reduce(
                                    (a, b) => a.filter(b),
                                    props.data
                                )
                                : props.data
                    ).length
                )}
              </span>{" "}
                of{" "}
                <span className="font-semibold text-blue-600">
                {
                    (props.sortingOptions && props.sortingOptions.enabled
                            ? props.data.sort(props.sortingOptions.sorter)
                            : props.customFilters
                                ? props.customFilters.reduce(
                                    (a, b) => a.filter(b),
                                    props.data
                                )
                                : props.data
                    ).length
                }
              </span>{" "}
                Entries
            </span>
                    </div>
                    <button
                        onClick={() =>
                            setPagination((prev) => ({
                                ...prev,
                                start: prev.start + prev.offset,
                            }))
                        }
                        className="flex items-center gap-1 justify-center px-4 py-2 text-sm text-blue-600 bg-blue-700/20 hover:bg-blue-700/30 disabled:hover:bg-gray-300 disabled:bg-gray-300 rounded-r"
                        disabled={
                            pagination.start + pagination.offset >=
                            (props.sortingOptions && props.sortingOptions.enabled
                                    ? props.data.sort(props.sortingOptions.sorter)
                                    : props.customFilters
                                        ? props.customFilters.reduce((a, b) => a.filter(b), props.data)
                                        : props.data
                            ).length
                        }
                    >
                        Next
                        <FaArrowRight />
                    </button>
                </div>
            </div>
        </div>
    );
}
