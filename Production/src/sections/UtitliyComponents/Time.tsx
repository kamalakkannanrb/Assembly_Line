
import { useState,useEffect } from "react";

export function Time(){
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => {
        setTime(new Date());
        }, 1000);
        return () => {
        clearInterval(timerId);
        };
    }, []); 

    const formattedTime = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true, // Use 12-hour format with AM/PM
    });

    return (
    <div className="text-center font-mono">
        {formattedTime}
    </div>
    );
}