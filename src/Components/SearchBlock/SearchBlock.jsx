import { useState } from "react";
import { useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import debounce from "../../helpers/debounce";
import style from "./SearchBlock.module.scss";

export default function SearchBlock({ data, setterFunc, slice }) {
    const searchHandlerDebounced = useCallback(
        debounce(searchHandler, 950), []
    );
    const searchInputRef = useRef();
    const allData = useSelector((store) => store[slice].value);
    const [ message, setMessage ] = useState("");

    function searchHandler() {

        setterFunc(
            data.filter((item) => {
                if (
                    item.title.includes(searchInputRef.current.value) ||
                    item.description.includes(searchInputRef.current.value)
                ) {
                    return true;
                }
                return false;
            })
        );
        if (data.length === 0) {
            setMessage("No matches!");
            setterFunc(allData);
        }
        if (!searchInputRef.current.value) {
            setMessage("");
        }
    }

    return (
        <div className={style.searchBlockWrapper}>
            <input
                type="text"
                placeholder={data ? `Search (${data?.length} items)` : "Search"}
                name="search"
                ref={searchInputRef}
                onChange={searchHandlerDebounced}
            />
            {message && <div className={style.messageBlock}>{message}</div>}
        </div>
    );
}
