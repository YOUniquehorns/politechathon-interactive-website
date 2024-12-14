import React, { useRef, useEffect, useState } from 'react';
import ForceGraph2D, { LinkObject, NodeObject } from 'react-force-graph-2d';
import { useNavigate } from 'react-router-dom';

interface MyNodeObject extends NodeObject {
    id: string;
    name?: string;
}

const GraphPage: React.FC = () => {
    const navigate = useNavigate();

    // Example data. In a real scenario, you might fetch this from an API.
    const graphData = {
        nodes: [
            { id: 'intro/video1', name: 'Session1' },
            { id: 'node1', name: 'Node 1' },
            { id: 'node2', name: 'Node 2' },
            { id: 'node3', name: 'Node 3' }
        ],
        links: [
            { source: 'node1', target: 'node2' },
            { source: 'node2', target: 'node3' }
        ]
    };

    const handleNodeHover = (node: MyNodeObject | null) => {
        // You can set a state and highlight the node or show a tooltip
        // In this example, we just log to console
        if (node) {
            console.log(`Hovered on: ${node.name}`);
        }
    };

    const handleNodeClick = (node: MyNodeObject) => {
        if (node.id === 'intro/video1') {
            navigate(`/session/intro/video1`);
        } else {
            // Navigate to other page with node id
            navigate(`/other/${node.id}`);
        }
    };

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <ForceGraph2D
                graphData={graphData}
                nodeLabel={(node: MyNodeObject) => node.name || ''}
                onNodeHover={handleNodeHover}
                onNodeClick={handleNodeClick}
                nodeAutoColorBy="group"
            />
        </div>
    );
};

export default GraphPage;
