import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {baseImageLink} from "../../util/axiosBooks";
import React, {useState} from "react";
import {set} from "react-hook-form";


export default function SllideShow(props) {
    const [idx, setIdx] = useState(0);

    function nextPhoto() {
        if (idx === props.photos.length - 1) {
            setIdx(0)
        } else {
            setIdx(idx + 1)
        }
    }

    function previousPhoto() {
        if (idx === 0) {
            setIdx(props.photos.length - 1)
        } else {
            setIdx(idx - 1)
        }
    }

    function getXValuesFromArray(array, startIndex, count) {
        const length = array.length;
        const wrappedIndex = (startIndex % length + length) % length;

        const result = [];
        for (let i = 0; i < count; i++) {
            result.push(array[(wrappedIndex + i) % length]);
        }

        return result;
    }

    return <div className={"SlideShow"}>
        <div className={"photos"}>

            <div className={"icon"} onClick={previousPhoto}>
                <FontAwesomeIcon icon={faChevronLeft} className={"icon left"}/>
            </div>

            <div className={"photoList"}>
                {getXValuesFromArray(props.photos, idx, props.size).map(p => <img src={baseImageLink + p} className={"image"}/>)}
            </div>

            <div className={"icon"} onClick={nextPhoto}>
                <FontAwesomeIcon icon={faChevronRight} className={"icon right"}/>
            </div>

        </div>
    </div>
}