import { Handle, Position } from "reactflow";
import "../../styles/MessageNode.css";
import ChatIcon from "@mui/icons-material/Chat";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  IconButton,
  Box,
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { styled } from "@mui/system";
import { useCallback } from "react";
import "../../styles/TextNodeInput.css";

const StyledCard = styled(Card)({
  display: "flex",
  alignItems: "center",
  borderRadius: "8px",
  flexDirection: "column",
  minWidth: 250,
});
// main node
export const MessageNode = ({ data, isConnectable }) => {
  return (
    <StyledCard>
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "1px",
          background: "#E0F7FA",
          width: "100%",
          justifyContent: "space-between",
        }}
        style={{ flexGrow: 1 }}
      >
        <Box display={"flex"} flexDirection={"row"}>
          <IconButton size="small">
            <ChatIcon fontSize="small" />
          </IconButton>
          <Typography variant="h6">Send Message</Typography>
        </Box>
        <IconButton size="small">
          <WhatsAppIcon fontSize="small" />
        </IconButton>
      </CardContent>
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "1px",
          background: "white",
          height: "40px",
          width: "100%",
          paddingLeft: "15px",
        }}
        style={{ flexGrow: 1 }}
      >
        <Typography variant="body1">{data.label}</Typography>
      </CardContent>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </StyledCard>
  );
};

// a draggable node on the side panel
export const DraggableMessageNode = ({ dragStart }) => {
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

// input component for the main node
export const MessageInput = ({ value, onInputChangeTextNode }) => {
  const onChange = useCallback(
    (evt) => {
      console.log(evt.target.value);
      onInputChangeTextNode(evt.target.value);
    },
    [onInputChangeTextNode]
  );
  return (
    <div className="TextNodeInputWrapper">
      {/* <Typography variant={"caption"}> Text</Typography> */}
      <TextField
        id="outlined-multiline-static"
        label="Text"
        multiline
        value={value}
        onChange={onChange}
        rows={2}
        fullWidth
      />
    </div>
  );
};
