import React from "react";
import ReactFlow, {
  ReactFlowProvider,
  Node,
  Edge,
  OnConnect,
  ConnectionLineType,
  ConnectionMode,
  OnConnectStart,
  OnConnectEnd,
  OnNodesChange,
} from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "./CustomNode";
import { Project } from "generated/graphql";

const CategoriesFlowComponent = ({
  projects,
  onConnect,
  generateNodesAndEdges,
  onConnectStart,
  onConnectEnd,
  onNodesChange
}: {
  projects: Project[];
  onConnectStart: OnConnectStart;
  onConnectEnd: OnConnectEnd;
  onConnect: OnConnect;
  onNodesChange:OnNodesChange
  generateNodesAndEdges: (projectsArray: Project[]) => {
    nodes: Node[];
    edges: Edge[];
  };
}) => {
  const { nodes, edges } = generateNodesAndEdges(projects as any);
  const nodeTypes = { custom: CustomNode };

  return (
    <div
      className="flows-container"
    >
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          nodesDraggable={true}
          nodesConnectable={true}
          elementsSelectable={true}
          onConnect={onConnect}
          edgesUpdatable={true}
          onEdgesChange={() => console.log("ss")}
          panOnDrag={true}
          zoomOnDoubleClick={false}
          nodeOrigin={[0.5, 0.5]}
          preventScrolling={false}
          onNodesChange={onNodesChange}
          onConnectStart={onConnectStart}
          onConnectEnd={onConnectEnd}
          fitView
          fitViewOptions={{ padding: 0.2 }}
        />
      </ReactFlowProvider>
    </div>
  );
};

export default CategoriesFlowComponent;
