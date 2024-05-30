import "../App.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, IconButton, Typography } from "@mui/material";
import { DraggableMessageNode, MessageInput } from "./CustomNodes/Message";
import { makeUppserCaseFirstLetter } from "../static";
export const SideBar = ({
  activeNodeDetails,
  onInputChangeTextNode,
  textNodeValue,
  deselectNode,
}) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
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

      {activeNodeDetails.type === "message" ? (
        <MessageInput
          onInputChangeTextNode={onInputChangeTextNode}
          value={textNodeValue}
        ></MessageInput>
      ) : (
        <DraggableMessageNode dragStart={onDragStart}></DraggableMessageNode>
      )}
    </aside>
  );
};
