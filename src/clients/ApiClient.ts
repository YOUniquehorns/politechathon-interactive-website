export default class ApiClient {
    protected BASE_URL: string;

    constructor() {
        this.BASE_URL = "https://int.botbucket.de/api"
    }
    protected postStream = async (url: string, body: any,
                                  onClose: (lastChunkReceived: string) => void) => {
        try {
            let headers:{[key:string]: string} = {}
            
            headers['Content-Type'] = 'application/json'
            headers['Accept'] = 'text/event-stream'
            
            const response = await fetch(this.BASE_URL + url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const reader = response.body?.getReader();
            let receivedText = '';
            let partialJSON = '';
            let lastFullMessage = '';
            

            const processText = ({ done, value }: ReadableStreamReadResult<Uint8Array>) => {
                if (done) {
                    console.log('Stream finished.');
                    onClose(lastFullMessage); // Call the close callback
                    return;
                }

                if (value) {
                    const chunk = new TextDecoder().decode(value);
                    receivedText += chunk;

                    // Process server-sent events
                    const events = receivedText.split(/\n\n/);
                    for (const eventString of events.slice(0, -1)) {
                        if (eventString.trim() !== '') {
                            const hadNewline = eventString.indexOf("\n") > 0
                            const eventData = eventString.split(/\n/)[0].replace(/^data:/, '');
                            if (eventData) {
                                let fullMsg = (partialJSON + eventData) + (hadNewline ? "\n" : "").replaceAll("\n", "<br/>")
                                if (fullMsg.trim().endsWith("}<br/>")) {
                                    fullMsg = fullMsg.replaceAll("}<br/>", "}")
                                }
                                if (fullMsg.trim().endsWith("}") || fullMsg.trim().endsWith("}<br/>")) {
                                    partialJSON = '';
                                    lastFullMessage = fullMsg;
                                } else {
                                    partialJSON = partialJSON + eventData;
                                    // more parts to collect until we have a full json
                                }
                                // setMessages((prevMessages) => [...prevMessages, eventData]);
                            }
                        }
                    }

                    receivedText = events[events.length - 1]; // Keep the last partial event string
                }

                // Read the next chunk
                reader?.read().then(processText);
            };

            reader?.read().then(processText);

        } catch (error) {
            console.error("Error or stream closed unexpectedly:", error);
        }
    };
}