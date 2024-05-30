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
import { SideBar } from "./components/Sidebar";
import { MessageNode } from "./components/CustomNodes/Message";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { Header } from "./components/Header";
import {
  getId,
  initialNodes,
  NOTIFICATION_MSGS,
  PRO_OPTS,
  TOASTS_OPTS,
} from "./static";

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
    [edges]
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
    console.log(edges);
    setActiveNodeDetails({
      id: node.id,
      type: node.type,
      text: node.data.label,
    });
  };

  const onInputChangeTextNode = (value) => {
    const tempNodes = nodes.map((obj) => {
      if (obj.id === activeNodeDetails.id) {
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
    if (edges.length >= nodes.length || edges.length >= nodes.length - 1) {
      toast.success(NOTIFICATION_MSGS.SUCCESS, TOASTS_OPTS);
    } else {
      toast.error(NOTIFICATION_MSGS.FAILURE, TOASTS_OPTS);
    }
  };
  return (
    <>
      <Header save={save}></Header>
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
            proOptions={PRO_OPTS}
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
        <div style={{ borderLeft: "1px solid lightgray" }}>
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
