import { useVideoInputs } from "react-18-amazon-chime-js-sdk";

export const DevicesListView = () => {
    const { devices, selectedDevice } = useVideoInputs();
    const items = devices.map((device) => <li>{device.label}</li>);
    
    return (
        <div>
            <p> Current Selected Device: { selectedDevice } </p>
            <p>Devices</p>
            <ul>{items}</ul>
        </div>
    )
}