import { Button, Typography } from "@mui/material";

export const Header = ({ save }) => {
  return (
    <div
      className="overall-wrapper"
      style={{ background: "lightgray", height: "7vh" }}
    >
      <Typography
        sx={{ display: "flex", alignItems: "center", marginLeft: "10px" }}
        align="left"
        variant={"h5"}
      >
        Bite Speed
      </Typography>
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Button
          onClick={save}
          sx={{ height: "fit-content" }}
          variant="outlined"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};
