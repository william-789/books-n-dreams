import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {baseImageLink} from "../../util/axiosBooks";
import React, {useState} from "react";
import {set} from "react-hook-form";


export default function SllideShow(props) {
    const [idx, setIdx] = useState(0);
    const [move, setMove] = useState(null);

    const handleTouchStart = (e) => {
        setMove({
            startX: e.touches[0].clientX,
            startY: e.touches[0].clientY,
        });
    };

    const handleTouchMove = (e) => {
        setMove({
            ...move,
            endX: e.touches[0].clientX,
            endY: e.touches[0].clientY,
        });
    };

    const handleTouchEnd = () => {
        const {startX, startY, endX, endY} = move

        if (startX && startY && endX && endY) {
            const deltaX = endX - startX;
            const deltaY = endY - startY;

            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    previousPhoto()
                } else {
                    nextPhoto()
                }
            }
        }

        // Reset values
        setMove(null);
    };

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
        <div className={"photos"}
             onTouchStart={handleTouchStart}
             onTouchMove={handleTouchMove}
             onTouchEnd={handleTouchEnd}>

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