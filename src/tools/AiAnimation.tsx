import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import {blue, grey, orange, red, yellow} from '@mui/material/colors';

export interface AiAnimationProps { }

const AiAnimation: React.FC<React.PropsWithChildren<AiAnimationProps>> = (props) => {
    const [init, setInit] = useState(false);

    // this should be run only once per application lifetime
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
            // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
            // starting from v2 you can add only the features you need reducing the bundle size
            //await loadAll(engine);
            //await loadFull(engine);
            await loadSlim(engine);
            //await loadBasic(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);
    if (!init) {
        return <>{props.children}</>
    }
    return (
        <>
            <Box component="div" sx={{
                position: "fixed",
                display: "block",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: "auto",
                height: "auto",
                zIndex: '-1000 !important',
            }}>
                <Particles
                    className='particle-canvas'
                    options={{
                        fpsLimit: 60,
                        interactivity: {
                            events: {
                                onClick: {
                                    enable: false,
                                    mode: "push",
                                },
                                onHover: {
                                    enable: false,
                                    mode: "repulse",
                                },
                            },
                            modes: {
                                push: {
                                    quantity: 4,
                                },
                                repulse: {
                                    distance: 80,
                                    duration: 0.4,
                                },
                            },
                        },
                        particles: {
                            color: {
                                value: [
                                    '#4E04B7',
                                    '#789D25',
                                ],
                            },
                            links: {
                                color: [grey[700], grey[600], grey[700]],
                                distance: 150,
                                enable: true,
                                opacity: 0.3,
                                width: 1,
                            },
                            move: {
                                direction: "none",
                                enable: true,
                                outModes: {
                                    default: "bounce",
                                },
                                random: false,
                                speed: 1,
                                straight: false,
                            },
                            number: {
                                value: 100,
                            },
                            opacity: {
                                value: 0.3,
                            },
                            shape: {
                                type: "circle",
                            },
                            size: {
                                value: { min: 1, max: 3 },
                            },
                        },
                        detectRetina: true,
                    }}

                />
            </Box>
            {props.children}
        </>
    );
};

export default AiAnimation;

export const withAiAnimation = (Comp: React.FC): React.FC => {
    return () => (
        <AiAnimation>
            <Comp />
        </AiAnimation>
    );
};