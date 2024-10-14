import React from 'react';
import { Handle, Position } from 'reactflow';
import { useTheme } from 'hooks/theme.hook';
import './CategoriesFlow.styles.scss';

const CustomNode = ({ data }: { data: any }) => {
  const theme = useTheme();
  
  return (
    <div 
      className='custom-node' 
      style={{
        ...customNodeStyle, 
        backgroundColor: data.background || (theme?.theme === 'dark' ? data.color : data.color)
      }}
    >
      <div style={{ color: theme?.theme === 'dark' ? data.color : data.color }}>{data.label}</div>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: data.color,width:'1px',height:'1px' }}
      />
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: data.color,width:'1px',height:'1px' }}
      />
    </div>
  );
};

const customNodeStyle: React.CSSProperties = {
  padding: '5px 10px',
  borderRadius: '5px',
  fontSize: '8px',
  textAlign: 'center',
};

export default CustomNode;
