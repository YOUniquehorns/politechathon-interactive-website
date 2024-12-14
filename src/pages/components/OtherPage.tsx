import React from 'react';
import { useParams } from 'react-router-dom';

const OtherPage: React.FC = () => {
    const { nodeId } = useParams<{ nodeId: string }>();

    return (
        <div style={{ padding: '20px' }}>
            <h1>Details for {nodeId}</h1>
            <p>This is another page, triggered by the node click.</p>
        </div>
    );
};

export default OtherPage;
