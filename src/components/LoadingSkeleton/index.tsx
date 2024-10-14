import { Skeleton } from "@mui/material";
import React from "react";

export default function LoadingSkeleton({
  numberOfColumns,
  heightOfColumn
}: {
  numberOfColumns: number;
  heightOfColumn:number
}) {
  return (
    <div>
      {new Array(numberOfColumns)!.fill("").map((columnIndex,i) => {
        return <div key={i} style={{marginTop:'10px'}}><Skeleton  height={heightOfColumn} /></div>;
      })}
    </div>
  );
}
