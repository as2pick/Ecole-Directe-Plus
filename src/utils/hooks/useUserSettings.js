import { useReducer } from "react";

export default function useSettings() {
    const [settings, dispatch] = useReducer({}, (state, { action, params }) => {
        const next = { ...state };

        switch (action) {
            case "SET":
                {
                    const { setting, value } = params;
                    if (next.hasOwnProperty(setting)) {
                        next[setting].value = value;
                    } else {
                        next[setting] = { value, properties: {} };
                    }
                    return next;
                }
            case "SET_PROPERTY":
                {
                    /**
                     * Brackets are mandatory here, because without it,
                     * the previous case is considered as the same scope
                     * so we can't create the same variables on the line
                     * below (setting and value)  
                     */
                    const { setting, property, value } = params;
                    if (!next.hasOwnProperty(setting)) {
                        throw new Error("Couldn't add property to inexistant setting");
                    }
                    next[setting][property] = value;
                    return next;
                }
        }

    })

    function setSetting(setting, value) {
        dispatch( {action: "SET", params: {setting, value}} )
    }
    
    function setSettingProperty(setting, property, value) {
        dispatch( {action: "SET_PROPERTY", params: {setting, property, value}} )
    }
 
    return [settings, {setSetting, setSettingProperty}];
}