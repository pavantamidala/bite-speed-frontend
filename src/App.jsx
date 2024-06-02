import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  MiniMap,
  Controls,
  Background,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import "./App.css";
import { useCallback, useState } from "react";
import { SideBar } from "./components/Sidebar";
import {
  DraggableMessageNode,
  MessageInput,
  MessageNode,
} from "./components/CustomNodes/Message";
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

// To add new node in nodes panel we need to change the below config.
const nodeTypes = { message: MessageNode };
const nodesConfig = [
  {
    mainNode: MessageNode, // main node for the react flow
    inputNode: MessageInput, // input node for the settings panel
    draggableNode: DraggableMessageNode, // draggable node used to create main node.
    type: "message", // type of the node.
  },
];

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
    (connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 },
          },
          eds
        )
      ),
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
    if (nodes.length > 1) {
      const nodesWithEmptyTargetHandles = nodes.filter(
        (node) => !edges.some((edge) => edge.target === node.id)
      );

      if (nodesWithEmptyTargetHandles.length > 1) {
        toast.error(NOTIFICATION_MSGS.FAILED_CONDITION, TOASTS_OPTS);
        return;
      }
    }

    if (edges.length >= nodes.length || edges.length >= nodes.length - 1) {
      toast.success(NOTIFICATION_MSGS.SUCCESS, TOASTS_OPTS);
    } else {
      toast.error(NOTIFICATION_MSGS.FAILURE, TOASTS_OPTS);
    }
  };

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
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
            <Background color="#ccc" variant={"cross"} />
          </ReactFlow>
        </div>
        <div style={{ borderLeft: "1px solid lightgray" }}>
          <SideBar
            activeNodeDetails={activeNodeDetails}
            deselectNode={deselectNode}
          >
            {nodesConfig.map((config) => {
              if (activeNodeDetails.type === config.type) {
                return (
                  <config.inputNode
                    key={config.type}
                    onInputChangeTextNode={onInputChangeTextNode}
                    value={activeNodeDetails.text}
                  ></config.inputNode>
                );
              } else if (!activeNodeDetails.type) {
                return (
                  <config.draggableNode
                    key={config.type}
                    dragStart={onDragStart}
                  ></config.draggableNode>
                );
              }
            })}
          </SideBar>
          <ToastContainer></ToastContainer>
        </div>
      </div>
    </>
  );
}

export default App;
