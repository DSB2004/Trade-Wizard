import React, { useEffect, useState } from "react";
import { generateMonthArray } from "../../util/common/generator";
import HeaderGraph from "../../layouts/graph-with-header/header-graph";

export default function Graphs({ data }) {
  const [open, setOpen] = useState(null);
  const [close, setClose] = useState(null);
  const [high, setHigh] = useState(null);
  const [low, setLow] = useState(null);
  const labelArray = generateMonthArray();
  useEffect(() => {
    if (data) {
      setOpen({ dataArray: data.o, labelArray: labelArray });
      setClose({ dataArray: data.c, labelArray: labelArray });
      setHigh({ dataArray: data.h, labelArray: labelArray });
      setLow({ dataArray: data.l, labelArray: labelArray });
      console.log(data);
    }
  }, [data]);
  return (
    <>
      <HeaderGraph text="Open Price" data={open} />
      <HeaderGraph text="Close Price" data={close} />
      <HeaderGraph text="High Price" data={high} />
      <HeaderGraph text="Low Price" data={low} />
    </>
  );
}
