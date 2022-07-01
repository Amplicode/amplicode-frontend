import {decrement, increment, reset, selectCount, setValue} from "./counterSlice";
import {Button, Statistic} from "antd";
import {useAppDispatch, useAppSelector} from "../../../core/store/store";

export function Counter() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  return (
    <>
      <div>
        <Statistic title='Counter' value={count} />
      </div>
      <div>
        <Button onClick={() => dispatch(increment())}>
          +
        </Button>
        <Button onClick={() => dispatch(decrement())}>
          -
        </Button>
        <Button onClick={() => dispatch(reset())}>
          Reset
        </Button>
      </div>
    </>
  );
}