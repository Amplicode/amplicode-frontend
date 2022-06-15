import React, {Component} from "react";
import { Dayjs } from "dayjs";
import {PickerProps, PickerTimeProps} from "antd/es/date-picker/generatePicker";
import "antd/es/date-picker/style/css";
import { DatePicker } from "./DatePicker";

export interface TimePickerProps
  extends Omit<PickerTimeProps<Dayjs>, "picker"> {}

export const TimePicker = React.forwardRef<Component<PickerProps<Dayjs>>, TimePickerProps>(
  (props, ref) => {
    return <DatePicker {...props} picker="time" mode={undefined} ref={ref} />;
  }
);

TimePicker.displayName = "TimePicker";
