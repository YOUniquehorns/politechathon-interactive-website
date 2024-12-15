import React, { useState } from 'react';
import { withAiAnimation } from "../../tools/AiAnimation";
import {getClickedVideos} from "../../tools/progress-tracker";
import {Stack, Typography, Button} from "@mui/material";
import { useNavigate } from 'react-router-dom';

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
    label?: string;
}

const TreePage: React.FC = () => {
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);
    const navigate = useNavigate();

    const centerX = 750;
    const centerY = 50;
    const horizontalBase = 300;
    const verticalStep = 150;

    const nodeRadius = 20;

    const levelLabels = [
        ["Politik", "Katzen", "Wintersport"], // Ebene 1
        ["Music", "CSD", "Mannschaftssport"], // Ebene 2
        ["Kochen", "Basteln", "e-Mobilität"], // Ebene 3
    ];

    const levelAttributes = [
        ["politikinteressiert", "katzenliebend", "Wintersportler"], // Ebene 1
        ["ein Swiftie", "Teil des CSD", "fussballbegeistert"], // Ebene 2
        ["und kochst gerne.", "und bastelst gerne.", "und interessiert an e-Mobilität."], // Ebene 3
    ];

    const levelImages = [
        [
            'https://ih1.redbubble.net/image.5541324284.6118/st,small,507x507-pad,600x600,f8f8f8.u3.jpg',
            'https://www.shutterstock.com/shutterstock/photos/2000070206/display_1500/stock-vector-cat-home-farm-animals-emoji-illustration-face-vector-design-art-flat-vector-dog-emoji-cat-face-2000070206.jpg',
            'https://images.emojiterra.com/google/noto-emoji/unicode-15/color/512px/26f7.png',
        ],
        [
            'https://i.pinimg.com/736x/b9/a4/95/b9a495527a7e14e8b49f8900acf59e36.jpg',
            'https://t3.ftcdn.net/jpg/01/13/84/58/360_F_113845833_swa3YoP0b8qOZnNcVq0hSJmhW15kvPze.jpg',
            'https://static.vecteezy.com/system/resources/previews/008/957/248/non_2x/football-icon-clipart-soccer-in-flat-animated-illustration-on-white-background-vector.jpg',
        ],
        [
            'https://media.istockphoto.com/id/1364983877/vector/fried-egg-pan-breakfast-vector-emoji-illustration.jpg?s=612x612&w=0&k=20&c=A31GEBDxx2MnXMzKQ-S6DdeENFZ5-CR8heXMZTo4NuY=',
            'https://us.123rf.com/450wm/jemastock/jemastock1711/jemastock171101753/88980207-handschuh-der-hammerikonenvektor-illustrationsgrafikdesign-h%C3%A4lt.jpg?ver=6',
            'https://img.freepik.com/premium-vector/eco-electrocar-icon-zero-emission-vehicle-battery-charging-station-sign_599062-3728.jpg',
        ],
    ];

    const clickedVideos = getClickedVideos(); // Ausgewählte Videos

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

    const createBranches = (parentId: string, parentX: number, parentY: number, level: number) => {
        if (level > 3) return;

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
                imageUrl: levelImages[level - 1][i],
            });
            links.push({
                source: parentId,
                target: id,
                label: levelLabels[level - 1][i],
            });

            createBranches(id, position.x, position.y, level + 1);
        }
    };

    createBranches('0', centerX, centerY, 1);

    const getHighlightedLinks = () => {
        const highlightedLinks: Link[] = [];
        let currentSource = "0";

        clickedVideos.forEach((clickedVideo, level) => {
            const link = links.find(
                (link) => link.source === currentSource && link.label === clickedVideo
            );

            if (link) {
                highlightedLinks.push(link);
                currentSource = link.target as string;
            }
        });

        return highlightedLinks;
    };

    const highlightedLinks = getHighlightedLinks();

    const generateDescription = () => {
        const descriptions: string[] = [];
        let currentSource = "0";

        clickedVideos.forEach((clickedVideo, level) => {
            const link = links.find(
                (link) => link.source === currentSource && link.label === clickedVideo
            );

            if (link) {
                const attributeIndex = levelLabels[level].indexOf(clickedVideo);
                if (attributeIndex !== -1) {
                    descriptions.push(levelAttributes[level][attributeIndex]);
                }
                currentSource = link.target as string;
            }
        });

        return descriptions.join(", ");
    };

    const finalDescription = generateDescription();

    return (
        <Stack>
            <Typography variant={"h5"} align={"center"} sx={{
                marginTop:"2em",
                marginBottom:"2em"
            }}>
                <b>Jede Aktion zählt! Für den Algorithmus bist du ...</b>
            </Typography>

            <svg width="100%" height="100%" viewBox="0 0 1500 550">
                <defs>
                    {nodes.map((node) => (
                        <clipPath key={`clip-${node.id}`} id={`clip-${node.id}`}>
                            <circle cx={0} cy={0} r={nodeRadius}/>
                        </clipPath>
                    ))}
                </defs>

                {links.map((link, index) => {
                    const sourceNode = nodes.find((node) => node.id === link.source);
                    const targetNode = nodes.find((node) => node.id === link.target);
                    if (!sourceNode || !targetNode) return null;

                    const isHighlighted = highlightedLinks.some(
                        (hl) => hl.source === link.source && hl.target === link.target
                    );

                    return (
                        <g key={index}>
                            <line
                                x1={sourceNode.x}
                                y1={sourceNode.y}
                                x2={targetNode.x}
                                y2={targetNode.y}
                                stroke={isHighlighted ? "#789D25" : "#E3F3FAFF"}
                                strokeWidth={isHighlighted ? 4 : 2}
                            />
                        </g>
                    );
                })}

                {nodes.map((node) => (
                    <g
                        key={node.id}
                        transform={`translate(${node.x}, ${node.y})`}
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                    >
                        {node.imageUrl ? (
                            <image
                                href={node.imageUrl}
                                x={-nodeRadius}
                                y={-nodeRadius}
                                width={nodeRadius * 2}
                                height={nodeRadius * 2}
                                clipPath={`url(#clip-${node.id})`}
                            />
                        ) : (
                            <circle r={nodeRadius} fill="#789D25"/>
                        )}
                    </g>
                ))}
            </svg>

            <Typography variant={"h6"} align={"center"} sx={{
                marginTop:"2em"
            }}>
                <b>... {finalDescription}</b>
            </Typography>

            <Button 
                variant="contained" 
                onClick={() => navigate('/module-four/algorithm')}
                color="primary"
                sx={{
                    marginTop: '2em',
                    alignSelf: 'center'
                }}
            >
                Weiter
            </Button>
        </Stack>
    );
};

export default withAiAnimation(TreePage);
