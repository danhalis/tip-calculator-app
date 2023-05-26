import React from "react";
import { Button } from "@mui/material";

interface Props {
  children: any;
}

function TipSelectionButton({ children }: Props) {
  return (
    <Button>{children}</Button>
  );
}

export default TipSelectionButton