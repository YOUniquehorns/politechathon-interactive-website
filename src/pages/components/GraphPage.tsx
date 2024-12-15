import React, {useRef, useState} from 'react';
import ForceGraph2D, {NodeObject} from 'react-force-graph-2d';
import {useNavigate} from 'react-router-dom';
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {withAiAnimation} from "../../tools/AiAnimation";

interface MyNodeObject extends NodeObject {
    id: string;
    name?: string;
}

const nodeToLink = (nodeId: string) => {
    switch (nodeId) {
        case 'node1':
            return '/session/intro/video/0';
        default:
            return undefined;
    }
}

const GraphPage: React.FC = () => {
    const navigate = useNavigate();
    const hoveredNodeId = useRef<string | null>(null);
    const hoveredNodeName = useRef<string | null>(null);
    const nameDisplayRef = useRef<HTMLDivElement>(null); // Ref for the displayed name

    const [isHelpOpen, setIsHelpOpen] = useState(false); // State to control help dialog

    const graphData = {
        nodes: [
            {id: 'node1', name: 'Weißt du, dass du gefragt hast?'},
            {id: 'node2', name: 'Fake News'},
            {id: 'node3', name: 'Was kann ich tun?'},
            {id: 'node4', name: 'Manipulative Algorithmen und Konsumverhalten'},
            {id: 'node5', name: 'Co-Creation & Weiterentwicklung'},
            {id: 'node6', name: 'Verzerrte Wirklichkeiten - KI-Halluzination'},
            {id: 'node7', name: 'KI Act'},
            {id: 'node8', name: ''},
            {id: 'node9', name: ''},
            {id: 'node10', name: ''}
        ],
        links: [
            {source: 'node1', target: 'node2'},
            {source: 'node1', target: 'node3'},
            {source: 'node1', target: 'node4'},
            {source: 'node1', target: 'node5'},
            {source: 'node1', target: 'node6'},
            {source: 'node6', target: 'node7'},
            {source: 'node6', target: 'node8'},
            {source: 'node6', target: 'node9'},
            {source: 'node5', target: 'node10'},
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
       const link = nodeToLink(node.id);
       if(link){
           navigate(link);
       }
    };

    const toggleHelpDialog = () => {
        setIsHelpOpen(!isHelpOpen); // Open or close the help dialog
    };

    return (
        <div style={{position: 'relative', width: '100%', height: '100%'}}>
            {/* Help Icon */}
            <IconButton
                style={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    zIndex: 1000,
                    backgroundColor: 'white',
                }}
                onClick={toggleHelpDialog}
            >
                <HelpOutlineIcon style={{fontSize: '72px'}}/> {/* Große Version des Symbols */}
            </IconButton>

            {/* Help Dialog */}
            <Dialog open={isHelpOpen} onClose={toggleHelpDialog}>
                <DialogTitle sx={{
                    color: 'black'
                }}>Hilfe</DialogTitle>
                <DialogContent sx={{
                    color: 'black'
                }}>
                    <p>
                        Dies ist ein interaktives Graph-Diagramm. Du kannst:
                    </p>
                    <ul>
                        <li>Über Knoten hovern, um deren Namen zu sehen.</li>
                        <li>Auf einen Knoten klicken, um eine Lektion zu öffnen.</li>
                        <li>Den Graphen verschieben und zoomen, indem du die Maus benutzt.</li>
                    </ul>
                    <p>Klicke auf "Verstanden!", um diese Anleitung zu schließen.</p>
                </DialogContent>
                <DialogActions>
                    {/* Verstanden-Button */}
                    <Button
                        onClick={toggleHelpDialog}
                        color="primary"
                        variant="contained"
                        style={{
                            width: '100%', // Button nimmt die gesamte Breite des Dialogfelds ein
                            fontSize: '18px', // Optional: Größerer Text für den Button
                            padding: '12px',  // Optional: Mehr Padding für bessere Optik
                        }}
                    >
                        Verstanden!
                    </Button>
                </DialogActions>

            </Dialog>

            {/* Display hovered node name with fixed height */}
            <div
                ref={nameDisplayRef}
                style={{
                    textAlign: 'center',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    marginBottom: '16px',
                    marginTop: '64px', // Adjust vertical position
                    color: 'white',
                    height: '30px', // Fix the height to prevent layout shifting
                }}
            ></div>

            {/* ForceGraph2D component */}
            <div style={{width: '100%', height: 'calc(100vh - 100px)'}}>
                <ForceGraph2D
                    graphData={graphData}
                    enableZoomInteraction={false}
                    minZoom={8}
                    linkWidth={4} // Make the links thicker
                    nodeLabel={(node: MyNodeObject) => node.name || ''}
                    onNodeHover={handleNodeHover}
                    onNodeClick={handleNodeClick}
                    linkColor={() => '#E3F3FAFF'} // Light blue color for links
                    nodeCanvasObject={(node, ctx) => {
                        const isHovered = hoveredNodeId.current === node.id;

                        // Adjust Node Size
                        const nodeRadius = 5;

                        // Draw the node
                        ctx.beginPath();
                        ctx.arc(node.x!, node.y!, nodeRadius, 0, 2 * Math.PI, false);
                        ctx.fillStyle = isHovered ? '#4E04B7' : '#789D25'; // Red on hover, light blue otherwise
                        ctx.fill();
                        // Draw the node name
                        ctx.font = '2px Arial';
                        ctx.fillStyle = 'white';
                        ctx.textAlign = 'center';
                        ctx.fillText(node.name || '', node.x!, node.y!);
                        ctx.closePath();

                        // Draw a full round ring around the hovered node
                        if (isHovered) {
                            const ringRadius = nodeRadius + 4; // Slightly larger than the node
                            const ringWidth = 3;

                            ctx.save();
                            ctx.translate(node.x!, node.y!); // Move to node's position

                            ctx.beginPath();
                            ctx.arc(0, 0, ringRadius, 0, 2 * Math.PI, false); // Full circle
                            ctx.lineWidth = ringWidth;
                            ctx.strokeStyle = 'rgba(78, 4, 183, 0.3)'; // Semi-transparent red
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

export default withAiAnimation(GraphPage);
