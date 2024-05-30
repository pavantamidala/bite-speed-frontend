import "../App.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, IconButton, Typography } from "@mui/material";
import { makeUppserCaseFirstLetter } from "../static";
export const SideBar = ({ activeNodeDetails, deselectNode, children }) => {
  const back = () => {
    deselectNode();
  };
  return (
    <aside>
      {!activeNodeDetails.type ? (
        <div className="description">
          You can drag these nodes to the pane on the left.
        </div>
      ) : (
        ""
      )}
      {activeNodeDetails.type ? (
        <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
          <IconButton onClick={back} size="medium">
            <ArrowBackIcon fontSize="medium"></ArrowBackIcon>
          </IconButton>
          <Typography width={"100%"} align="center" variant="h6">
            {makeUppserCaseFirstLetter(activeNodeDetails.type)}
          </Typography>
        </Box>
      ) : (
        ""
      )}
      {children}
    </aside>
  );
};
