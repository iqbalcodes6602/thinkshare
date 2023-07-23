import React from 'react'
import { Box, Card, CardContent } from '@mui/material';
import JoditEditor from "jodit-react"
import { useRef, useState } from "react"

function NoteMaker() {

    const editor = useRef(null)
    const [content, setContent] = useState("")

    

    return (
        <Box style={{display:"flex", }}>
            <Card style={{padding:"0",width:"30vw", height:"60vh", overflow:"auto", resize:"both"}} variant="outlined">
                <CardContent>
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
    )
}

export default NoteMaker
