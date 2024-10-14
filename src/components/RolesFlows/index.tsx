import React from "react";
import ReactFlow, {
  ReactFlowProvider,
  Node,
  Edge,
  OnConnect,
  OnConnectStart,
  OnConnectEnd,
  OnNodesChange,
  OnEdgesChange,
} from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "./CustomNode";
import {  User } from "generated/graphql";



const RolesFlowComponent = ({
  users,
  onConnect,
  generateNodesAndEdges,
  onConnectStart,
  onConnectEnd,
  onNodesChange,onEdgesChange,

}: {
  users: User[];
  onConnectStart: OnConnectStart;
  onConnectEnd: OnConnectEnd;
  onConnect: OnConnect;
  onNodesChange:OnNodesChange
  onEdgesChange:OnEdgesChange,

  generateNodesAndEdges: (usersArray: User[]) => {
    nodes: Node[];
    edges: Edge[];
  };
}) => {
  const { nodes, edges } = generateNodesAndEdges(users as any
  );
  const nodeTypes = { custom: CustomNode };

  return (
    <div
      className="flows-container"
      style={{ height: "100vh", width: "100%" }}>
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
          onEdgesChange={onEdgesChange}
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

export default RolesFlowComponent;
