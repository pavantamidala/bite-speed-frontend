import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  MiniMap,
  Controls,
  Background,
} from "reactflow";
import "reactflow/dist/style.css";
import "./App.css";
import { useCallback, useState } from "react";
import { SideBar } from "./components/SideBar/Sidebar";
import { MessageNode } from "./components/CustomNodes/MessageNode";
import "react-toastify/dist/ReactToastify.css";

import { toast, ToastContainer } from "react-toastify";
import { Button } from "@mui/material";
const initialNodes = [
  {
    id: "0",
    type: "message",
    position: { x: 118, y: 77 },
    data: { label: "message node" },
  },
];
let id = 1;
const getId = () => `${id++}`;
const nodeTypes = { message: MessageNode };

function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [activeNodeDetails, setActiveNodeDetails] = useState({
    id: "",
    type: "",
    text: "",
  });
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
      console.log(edges);
    },
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const nodeClickHandle = (event, node) => {
    console.log(node);
    console.log(nodes);
    setActiveNodeDetails({
      id: node.id,
      type: node.type,
      text: node.data.label,
    });
  };

  const onInputChangeTextNode = (value) => {
    const tempNodes = nodes.map((obj) => {
      if (obj.id === activeNodeDetails.id) {
        // obj.data.label = value;
        obj.data = { ...obj.data, label: value };
        setActiveNodeDetails({ ...activeNodeDetails, text: value });
      }
      return obj;
    });
    setNodes(tempNodes);
  };

  const deselectNode = () => {
    const tempNodes = nodes.map((obj) => {
      obj.selected = false;
      return { ...obj };
    });
    setActiveNodeDetails({ text: "", id: "", type: "" });
    setNodes(tempNodes);
  };
  const save = () => {
    // total edges = total nodes - 1
    // save if total edges >= nodes-1
    if (edges.length >= nodes.length || edges.length >= nodes.length - 1) {
      console.log("all nodes are connected");
      toast.success("Flow saved successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
      });
    } else {
      console.log("Not connected");
      toast.error("Failed to save the flow", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <>
      <div
        className="overall-wrapper"
        style={{ background: "lightgray", height: "7vh" }}
      >
        <div></div>
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
      <div className="overall-wrapper dndflow">
        <div style={{ height: "93vh" }}>
          <ReactFlow
            nodes={nodes}
            onNodeClick={nodeClickHandle}
            edges={edges}
            onNodesChange={onNodesChange}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
          >
            <MiniMap
              nodeStrokeWidth={3}
              nodeColor={() => "#E0F7FA"}
              zoomable
              pannable
            />
            <Controls />
            <Background color="#ccc" variant={"dots"} />
          </ReactFlow>
        </div>
        <div>
          {/* <button onClick={save}> save</button> */}
          <SideBar
            onInputChangeTextNode={onInputChangeTextNode}
            textNodeValue={activeNodeDetails.text}
            activeNodeDetails={activeNodeDetails}
            deselectNode={deselectNode}
          ></SideBar>
          <ToastContainer></ToastContainer>
        </div>
      </div>
    </>
  );
}

export default App;
