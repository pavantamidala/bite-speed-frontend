import { IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";

export const TextNode = ({ dragStart }) => {
  const NODE_TYPE = "message";
  return (
    <div
      className="dndnode message"
      onDragStart={(event) => dragStart(event, NODE_TYPE)}
      draggable
    >
      <IconButton size="small">
        <ChatIcon color="primary" fontSize="small" />
      </IconButton>
      Message
    </div>
  );
};
