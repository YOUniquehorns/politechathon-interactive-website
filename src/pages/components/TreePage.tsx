import React, { useState } from 'react';

interface Node {
    id: string;
    x: number;
    y: number;
    label?: string;
    imageUrl?: string; // URL des Bildes für den Knoten
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

    const nodeRadius = 20; // Radius der Nodes

    // Bilder-URLs für die Ebenen
    const levelImages = [
        [
            'https://ih1.redbubble.net/image.5541324284.6118/st,small,507x507-pad,600x600,f8f8f8.u3.jpg', // Ebene 1 Bild 1
            'https://www.shutterstock.com/shutterstock/photos/2000070206/display_1500/stock-vector-cat-home-farm-animals-emoji-illustration-face-vector-design-art-flat-vector-dog-emoji-cat-face-2000070206.jpg', // Ebene 1 Bild 2
            'https://images.emojiterra.com/google/noto-emoji/unicode-15/color/512px/26f7.png', // Ebene 1 Bild 3
        ],
        [
            'https://i.pinimg.com/736x/b9/a4/95/b9a495527a7e14e8b49f8900acf59e36.jpg', // Ebene 2 Bild 1
            'https://t3.ftcdn.net/jpg/01/13/84/58/360_F_113845833_swa3YoP0b8qOZnNcVq0hSJmhW15kvPze.jpg', // Ebene 2 Bild 2
            'https://static.vecteezy.com/system/resources/previews/008/957/248/non_2x/football-icon-clipart-soccer-in-flat-animated-illustration-on-white-background-vector.jpg', // Ebene 2 Bild 3
        ],
        [
            'https://media.istockphoto.com/id/1364983877/vector/fried-egg-pan-breakfast-vector-emoji-illustration.jpg?s=612x612&w=0&k=20&c=A31GEBDxx2MnXMzKQ-S6DdeENFZ5-CR8heXMZTo4NuY=', // Ebene 3 Bild 1
            'https://us.123rf.com/450wm/jemastock/jemastock1711/jemastock171101753/88980207-handschuh-der-hammerikonenvektor-illustrationsgrafikdesign-h%C3%A4lt.jpg?ver=6', // Ebene 3 Bild 2
            'https://img.freepik.com/premium-vector/eco-electrocar-icon-zero-emission-vehicle-battery-charging-station-sign_599062-3728.jpg', // Ebene 3 Bild 3
        ],
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
            label: '',
            imageUrl: '',
        },
    ];
    const links: Link[] = [];

    // Erstelle den Baum
    const createBranches = (parentId: string, parentX: number, parentY: number, level: number) => {
        if (level > 3) return; // Begrenze die Tiefe auf 3 Ebenen

        // Der horizontale Abstand nimmt mit jeder Ebene zu
        const horizontalRadius = (horizontalBase / Math.pow(3, level - 1)) * 1.2;

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
                imageUrl: levelImages[level - 1][i], // Wechsle Bilder basierend auf der Ebene
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
                <defs>
                    {/* Definiere eine Maske für die Knoten */}
                    {nodes.map((node) => (
                        <clipPath key={`clip-${node.id}`} id={`clip-${node.id}`}>
                            <circle cx={0} cy={0} r={nodeRadius} />
                        </clipPath>
                    ))}
                </defs>

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
                        {/* Bild wird auf den Kreis zugeschnitten */}
                        {node.imageUrl ? (
                            <image
                                href={node.imageUrl}
                                x={-nodeRadius}
                                y={-nodeRadius}
                                width={nodeRadius * 2}
                                height={nodeRadius * 2}
                                clipPath={`url(#clip-${node.id})`} // Anwenden der Maske
                            />
                        ) : (
                            <circle r={nodeRadius} fill="#00BFFF" />
                        )}
                        {/* Label nur beim Hovern anzeigen */}
                        {hoveredNode === node.id && node.label && (
                            <text
                                x={0}
                                y={nodeRadius + 15}
                                fill="white"
                                textAnchor="middle"
                                fontSize="10px"
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
