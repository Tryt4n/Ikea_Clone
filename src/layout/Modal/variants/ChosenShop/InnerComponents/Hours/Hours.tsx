// Import react dependencies
import React from "react";

/**
 * Hours is a React component that renders a list of hours for a shop.
 * Each item in the list includes a day and the corresponding hours.
 *
 * @param {Record<string, string>} props.hoursObject - The hours of the shop.
 *
 * @example
 * <Hours hoursObject={hoursObject} />
 */
export function Hours({ hoursObject }: { hoursObject: Record<string, string> }) {
  return (
    <dl className="chosen-shop__hours-list">
      {/* Object.entries() returns an array of a given object's own enumerable string-keyed property [key, value] pairs. */}
      {Object.entries(hoursObject).map(([day, hours]) => (
        <React.Fragment key={day}>
          <dt>{day}</dt>
          <dd>{hours}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}
