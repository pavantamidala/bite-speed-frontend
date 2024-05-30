import { useCallback } from "react";
import "../../styles/TextNodeInput.css";
import { TextField, Typography } from "@mui/material";
export const TextNodeInput = ({ value, onInputChangeTextNode }) => {
  const onChange = useCallback(
    (evt) => {
      console.log(evt.target.value);
      onInputChangeTextNode(evt.target.value);
    },
    [onInputChangeTextNode]
  );
  return (
    <div className="TextNodeInputWrapper">
      <Typography variant={"caption"}> Text</Typography>
      <TextField
        id="outlined-multiline-static"
        label=""
        multiline
        value={value}
        onChange={onChange}
        rows={2}
        fullWidth
        defaultValue="Default Value"
      />
    </div>
  );
};
