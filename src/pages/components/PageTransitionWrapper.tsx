import React, {useEffect, useRef} from 'react';
import '../../styles.css'; // ensure your CSS styles are imported

interface PageTransitionWrapperProps {
    children: React.ReactNode;
}

const PageTransitionWrapper: React.FC<PageTransitionWrapperProps> = ({children}) => {
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Trigger the transition (for example, add a class) whenever the children change
        if (wrapperRef.current) {
            wrapperRef.current.classList.remove('page-turn-animation');
            void wrapperRef.current.offsetWidth; // forces reflow
            wrapperRef.current.classList.add('page-turn-animation');
        }
    }, [children]);

    return (
        <div className="page-wrapper" ref={wrapperRef}>
            {children}
        </div>
    );
};

export default PageTransitionWrapper;
