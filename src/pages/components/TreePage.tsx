import React, { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import SettingsIcon from '@mui/icons-material/Settings';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';

interface Node {
    id: string;
    x: number;
    y: number;
    label?: string;
    icon?: JSX.Element; // Optional: Icon für den Knoten
}

interface Link {
    source: string;
    target: string;
}

const TreePage: React.FC = () => {
    const [hoveredNode, setHoveredNode] = useState<string | null>(null); // State für den gehovten Knoten

    const centerX = 750; // Mittelpunkt des Graphen (X)
    const centerY = 100; // Mittelpunkt des Graphen (Y)
    const horizontalBase = 300; // Basisabstand für die horizontale Verteilung
    const verticalStep = 150; // Vertikaler Abstand zwischen den Ebenen

    // Symbole für die Ebenen
    const levelIcons = [
        [<HomeIcon style={{ fontSize: 20, color: 'blue' }} />, <StarIcon style={{ fontSize: 20, color: 'yellow' }} />, <SettingsIcon style={{ fontSize: 20, color: 'green' }} />], // Ebene 1
        [<FavoriteIcon style={{ fontSize: 20, color: 'red' }} />, <WorkIcon style={{ fontSize: 20, color: 'purple' }} />, <SchoolIcon style={{ fontSize: 20, color: 'orange' }} />], // Ebene 2
        [<StarIcon style={{ fontSize: 20, color: 'pink' }} />, <HomeIcon style={{ fontSize: 20, color: 'teal' }} />, <WorkIcon style={{ fontSize: 20, color: 'lime' }} />], // Ebene 3
    ];

    // Funktion, um Knoten zu platzieren
    const calculateNodePosition = (
        parentX: number,
        parentY: number,
        offsetX: number,
        offsetY: number
    ): { x: number; y: number } => {
        const x = parentX + offsetX;
        const y = parentY + offsetY;
        return { x, y };
    };

    // Generiere Knoten und Links
    const nodes: Node[] = [
        {
            id: '0',
            x: centerX,
            y: centerY,
            label: 'Root',
            icon: <HomeIcon style={{ fontSize: 20, color: 'white' }} />,
        },
    ];
    const links: Link[] = [];

    // Erstelle den Baum
    const createBranches = (parentId: string, parentX: number, parentY: number, level: number) => {
        if (level > 3) return; // Begrenze die Tiefe auf 3 Ebenen

        // Der horizontale Abstand nimmt mit jeder Ebene zu
        const horizontalRadius = (horizontalBase / Math.pow(3, level - 1)) * 1.5;

        const offsets = [
            { idSuffix: 'l', offsetX: -horizontalRadius, offsetY: verticalStep },
            { idSuffix: 'm', offsetX: 0, offsetY: verticalStep },
            { idSuffix: 'r', offsetX: horizontalRadius, offsetY: verticalStep },
        ];

        for (let i = 0; i < offsets.length; i++) {
            const offset = offsets[i];
            const position = calculateNodePosition(parentX, parentY, offset.offsetX, offset.offsetY);

            const id = `${parentId}${offset.idSuffix}`;
            nodes.push({
                id,
                x: position.x,
                y: position.y,
                label: id.toUpperCase(),
                icon: levelIcons[level - 1][i], // Wechsle Icons basierend auf der Ebene
            });
            links.push({ source: parentId, target: id });

            // Rekursive Erstellung der nächsten Ebene
            createBranches(id, position.x, position.y, level + 1);
        }
    };

    // Starte die Generierung ab der Wurzel
    createBranches('0', centerX, centerY, 1);

    return (
        <div style={{ width: '100%', height: '100%', backgroundColor: '#1e1e1e' }}>
            <svg width="100%" height="100%" viewBox="0 0 1500 800">
                {/* Links */}
                {links.map((link, index) => {
                    const sourceNode = nodes.find((node) => node.id === link.source);
                    const targetNode = nodes.find((node) => node.id === link.target);
                    if (!sourceNode || !targetNode) return null;

                    return (
                        <line
                            key={index}
                            x1={sourceNode.x}
                            y1={sourceNode.y}
                            x2={targetNode.x}
                            y2={targetNode.y}
                            stroke="#E3F3FA"
                            strokeWidth={2}
                        />
                    );
                })}

                {/* Nodes */}
                {nodes.map((node) => (
                    <g
                        key={node.id}
                        transform={`translate(${node.x}, ${node.y})`}
                        onMouseEnter={() => setHoveredNode(node.id)} // Setze den gehovten Knoten
                        onMouseLeave={() => setHoveredNode(null)} // Entferne den gehovten Knoten
                    >
                        {/* Kreis für den Node */}
                        <circle r={20} fill="#00BFFF" />
                        {/* Icon */}
                        {node.icon && (
                            <foreignObject x={-10} y={-10} width={20} height={20}>
                                {node.icon}
                            </foreignObject>
                        )}
                        {/* Label nur beim Hovern anzeigen */}
                        {hoveredNode === node.id && node.label && (
                            <text
                                x={0}
                                y={60}
                                fill="white"
                                textAnchor="middle"
                                fontSize="20px"
                            >
                                {node.label}
                            </text>
                        )}
                    </g>
                ))}
            </svg>
        </div>
    );
};

export default TreePage;
