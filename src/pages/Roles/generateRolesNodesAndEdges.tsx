import "./Roles.styles.scss";
import { Node, Edge, EdgeText } from "reactflow";
import "reactflow/dist/style.css";
import { User } from "generated/graphql";
import { FaUser } from "react-icons/fa";
import { themeColor } from "utils/theme";


interface CustomNodeData {
  label: JSX.Element;
  background: string;
}

const generateNodesAndEdges = (

  usersArray: User[]
): { nodes: Node<CustomNodeData>[]; edges: Edge[] } => {

  const nodes: Node<CustomNodeData>[] = [];
  const edges: Edge[] = [];

  const roleColors: { [key: string]: string } = {
    ADMIN: "#ffcccb", // Example color for ADMIN
    MANAGER: "#c0ffee", // Example color for MANAGER
    PERSONAL: "#b0e0e6", // Example color for PERSONAL
  };

  const roleOrder: { [key: string]: number } = {
    ADMIN: 0,
    MANAGER: 1,
    PERSONAL: 2,
  };

  // Group users by roles
  const groupedUsers: { [key: string]: User[] } = {
    ADMIN: [],
    MANAGER: [],
    PERSONAL: [],
  };

  usersArray.forEach((user: User) => {
    if (user.role && groupedUsers[user.role]) {
      groupedUsers[user.role].push(user);
    }
  });

  // Add nodes
  let yOffset = 0; // Keeps track of the vertical position of nodes

  Object.keys(groupedUsers).forEach((role) => {
    groupedUsers[role].forEach((user, userIndex) => {
      const role = user.role as string;
      const userColor = roleColors[role] || "#faebd7"; // Default color if role is not specified
      const userY = yOffset + userIndex * 100; // Vertical spacing for users within the same role
      
      nodes.push({
        id: `user-${user.id}`,
        data: {
          label: (
            <div className="items">
              <div style={{ minWidth: "100px" }}>
                <FaUser
                  className="icons"
                  color={themeColor}
                />
              </div>

              <div style={{ fontWeight: "bold" }}>
                {user.username ?? user.email}
              </div>
              <div style={{ fontSize: "0.9em" }}> {user.role}</div>
            </div>
          ),
          background: userColor,
        },
        position: { x: roleOrder[role] * 100, y: userY },
        type: "custom",
      });

      // Optionally, add edges if there's a hierarchy
      if (role === "MANAGER" && groupedUsers["ADMIN"].length > 0) {
        groupedUsers["ADMIN"].forEach((adminUser,i) => {
          edges.push({
            id: `edge-${adminUser.id}-${user.id}`,
            source: `user-${adminUser.id}`,
            target: `user-${user.id}`,
            type: "smoothstep",
            
          });
          
        });
         groupedUsers["MANAGER"].forEach((adminUser,i) => {
          nodes.push({
                  id: `user-${adminUser.id}`,
              data: {
                label: (
                  <div
                    className="items"
                    style={{ position: "relative", minWidth: "100px" }}>
                    <div>
                      <FaUser
                        className="icons"
                        color={themeColor}
                      />
                    </div>

                    <div style={{ fontWeight: "bold" }}>
                      {adminUser.username ?? adminUser.email}
                    </div>
                    <div style={{ fontSize: "0.9em" }}>{adminUser.role}</div>
                  </div>
                ),
                background: userColor,
              },
              position: { x: 180 * i + 10, y: userY },
              type: "custom",
            
          });
          
        });
      } else if (role === "PERSONAL" && user.managers) {
        usersArray
          .filter((user) => user.role === "PERSONAL")
          .map((user, j) => {
            nodes.push({
              id: `user-${user.id}`,
              data: {
                label: (
                  <div
                    className="items"
                    style={{ position: "relative", minWidth: "100px" }}>
                    <div>
                      <FaUser
                        className="icons"
                        color={themeColor}
                      />
                    </div>

                    <div style={{ fontWeight: "bold" }}>
                      {user.username ?? user.email}
                    </div>
                    <div style={{ fontSize: "0.9em" }}>{user.role}</div>
                  </div>
                ),
                background: userColor,
              },
              position: { x: 180 * j + 10, y: 500 },
              type: "custom",
            });
          });
      
        user.managers.forEach((manager, j) => {
          edges.push({
            id: `edge-${manager?.id}-${user.id}`,
            source: `user-${manager?.id}`,
            target: `user-${user.id}`,
            type: 'customEdge',
              data: {
    customLabel: <span style={{ color: 'red' }}>Custom JSX Label</span>, // Pass JSX via data
  },
          }); 
        });
      }
    });
  
    yOffset += groupedUsers[role].length; // Update yOffset for the next role
  });

  return { nodes, edges };
};

export default generateNodesAndEdges;
