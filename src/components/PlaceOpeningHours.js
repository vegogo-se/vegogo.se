import React, { useState } from "react";
import { isPlaceOpenedNow } from "../helpers";

/**
 * Return opening hours output.
 *
 * @param object attributes
 */
export function PlaceOpeningHours({ googlePlaceInfo }) {
  const isOpenedNow = isPlaceOpenedNow(googlePlaceInfo);
  const openedTexts = {
    OPENED: <p>Open now</p>,
    CLOSED: <p>Opening hours</p>,
  };
  const isOpenedNowText = openedTexts[isOpenedNow];
  const [showOpenHours, setShowOpenHours] = useState(false);

  // Bail if no opening_hours.
  if (!googlePlaceInfo?.opening_hours) {
    return null;
  }

  return (
    <div className="text-sm mt-6">
      <button
        className="flex w-full text-left font-semibold"
        onClick={() => {
          setShowOpenHours(!showOpenHours);
        }}
      >
        <div className="flex-1">{isOpenedNowText}</div>
        <span className="flex-none">+</span>
      </button>

      <div className={`${showOpenHours ? "block mt-2" : "hidden"}`}>
        {googlePlaceInfo?.opening_hours?.weekday_text && (
          <ul>
            {googlePlaceInfo?.opening_hours?.weekday_text.map((val, idx) => {
              const classNames =
                idx === new Date().getDay() - 1 ||
                (new Date().getDay() === 0 && idx === 6)
                  ? "font-bold"
                  : "text-gray-600";
              return (
                <li key={val} className={classNames}>
                  {val}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
