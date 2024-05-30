import { Handle, Position } from "reactflow";
import "../../styles/MessageNode.css";
import ChatIcon from "@mui/icons-material/Chat";
import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { styled } from "@mui/system";

const StyledCard = styled(Card)({
  display: "flex",
  alignItems: "center",
  //   backgroundColor: "#E0F7FA",
  borderRadius: "8px",
  //   padding: "8px 16px",
  flexDirection: "column",
  minWidth: 250,
});

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
