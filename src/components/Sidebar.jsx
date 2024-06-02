import "../App.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, IconButton, Typography } from "@mui/material";
import { makeUppserCaseFirstLetter } from "../static";
import { Divider } from "@mui/material";
export const SideBar = ({ activeNodeDetails, deselectNode, children }) => {
  const back = () => {
    deselectNode();
  };
  return (
    <aside>
      {!activeNodeDetails.type ? (
        <Typography sx={{ padding: 2 }} variant={"caption"}>
          You can drag these nodes to the pane on the left.
        </Typography>
      ) : (
        ""
      )}
      {activeNodeDetails.type ? (
        <>
          <Divider sx={{ marginTop: 1 }}></Divider>
          <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
            <IconButton onClick={back} size="medium">
              <ArrowBackIcon fontSize="medium"></ArrowBackIcon>
            </IconButton>
            <Typography width={"100%"} align="center" variant="h6">
              {makeUppserCaseFirstLetter(activeNodeDetails.type)}
            </Typography>
          </Box>
          <Divider></Divider>
        </>
      ) : (
        ""
      )}
      <br />
      <Box sx={{ padding: 2 }}>{children}</Box>
    </aside>
  );
};
