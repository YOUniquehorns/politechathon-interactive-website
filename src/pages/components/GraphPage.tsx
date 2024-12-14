import React, { useRef } from 'react';
import ForceGraph2D, { NodeObject } from 'react-force-graph-2d';
import { useNavigate } from 'react-router-dom';

interface MyNodeObject extends NodeObject {
    id: string;
    name?: string;
}

const GraphPage: React.FC = () => {
    const navigate = useNavigate();
    const hoveredNodeId = useRef<string | null>(null);
    const hoveredNodeName = useRef<string | null>(null);
    const nameDisplayRef = useRef<HTMLDivElement>(null); // Ref for the displayed name

    const graphData = {
        nodes: [
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
        hoveredNodeId.current = node ? node.id : null; // Set the hovered node ID
        hoveredNodeName.current = node ? node.name || null : null; // Update the hovered node name

        // Update the text in the name display without triggering a re-render
        if (nameDisplayRef.current) {
            nameDisplayRef.current.textContent = node?.name || '';
        }
    };

    const handleNodeClick = (node: MyNodeObject) => {
        navigate(`/other/${node.id}`);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Display hovered node name with fixed height */}
            <div
                ref={nameDisplayRef}
                style={{
                    textAlign: 'center',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    marginBottom: '16px',
                    marginTop: '32px', // Adjust vertical position
                    color: 'black',
                    height: '30px', // Fix the height to prevent layout shifting
                }}
            >

            </div>

            {/* ForceGraph2D component */}
            <div style={{ width: '100%', height: 'calc(100vh - 100px)' }}>
                <ForceGraph2D
                    graphData={graphData}
                    nodeLabel={(node: MyNodeObject) => node.name || ''}
                    onNodeHover={handleNodeHover}
                    onNodeClick={handleNodeClick}
                    nodeCanvasObject={(node, ctx) => {
                        const isHovered = hoveredNodeId.current === node.id;

                        // Draw the node
                        ctx.beginPath();
                        ctx.arc(node.x!, node.y!, 5, 0, 2 * Math.PI, false);
                        ctx.fillStyle = isHovered ? 'red' : '#ADD8E6'; // Red on hover, light blue otherwise
                        ctx.fill();
                        ctx.closePath();

                        // Draw a full round ring around the hovered node
                        if (isHovered) {
                            const ringRadius = 12;
                            const ringWidth = 3;

                            ctx.save();
                            ctx.translate(node.x!, node.y!); // Move to node's position

                            ctx.beginPath();
                            ctx.arc(0, 0, ringRadius, 0, 2 * Math.PI, false); // Full circle
                            ctx.lineWidth = ringWidth;
                            ctx.strokeStyle = 'rgba(255, 0, 0, 0.3)'; // Semi-transparent red
                            ctx.stroke();
                            ctx.closePath();

                            ctx.restore();
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default GraphPage;
