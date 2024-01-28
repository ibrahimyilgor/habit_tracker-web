import * as React from "react";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";

export default function OverviewDateRangePicker() {
  const [value, onChange] = React.useState([new Date(), new Date()]);

  return (
    <div>
      <DateRangePicker onChange={onChange} value={value} />
    </div>
  );
}
