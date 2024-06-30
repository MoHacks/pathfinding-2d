import { useState, useEffect } from "react";


//This function will grab the screen Width when its being resized, and it will re-render it if the screen width has changed
//Note that for custom hooks like useScreenWidth(), it MUST START WITH LOWER CASE "use", followed by an UpperCase Letter!
export default function useScreenWidth(){
    
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    
    useEffect(() => {
            const handleResize = () => {
                setScreenWidth(window.innerWidth);
            }
        
        //adds event listener on Mount to get the resized window value
        window.addEventListener('resize', handleResize);
        
        //removes event listener on unMount
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

        return screenWidth;
    };
