import React from 'react'
import { Box, Card, CardContent } from '@mui/material';
import JoditEditor from "jodit-react"
import { useRef, useState } from "react"
import Draggable from 'react-draggable';
import { DragIndicator } from '@mui/icons-material';

function NoteMaker() {

    const editor = useRef(null)
    const [content, setContent] = useState("")


    return (
        <Draggable
            axis="both"
            handle=".draggingHandle"
            position={null}
            scale={1}
            defaultPosition={{ x: 0, y: 0 }}
            // onStart={this.handleStart}
            // onDrag={this.handleDrag}
            // onStop={this.handleDrop}
        >
            <Box style={{ display: "flex", position: 'absolute' }}>
                <Card style={{ padding: "0", width: "30vw", height: "60vh", overflow: "auto", resize: "both" }} variant="outlined">
                    <CardContent>
                        <DragIndicator className='draggingHandle' />
                        <JoditEditor
                            style={{ width: "100%", height: "400px", border: "1px solid #ccc" }}
                            margin="0"
                            ref={editor}
                            value={content}
                            onChange={(newContent) => setContent(newContent)}
                        />
                    </CardContent>
                </Card>
            </Box>
        </Draggable>
    )
}

export default NoteMaker
