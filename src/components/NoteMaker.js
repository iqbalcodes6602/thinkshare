import React from 'react'
import { Box, Card, CardContent } from '@mui/material';
import JoditEditor from "jodit-react"
import { useRef, useState } from "react"

function NoteMaker() {

    const editor = useRef(null)
    const [content, setContent] = useState("")
    return (
        <Box>
            <Card style={{width:"50vw", height:"50vh"}} variant="outlined">
                <CardContent>
                    <JoditEditor
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
