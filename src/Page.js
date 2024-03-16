import { useState, useEffect } from "react";
import { Typography, Modal, Card, CardContent } from "@mui/material";
import { useActiveNode } from "./context/ActiveNodeContext";
import NavNode from "./components/NavNode";

const FOLDER = 1
const TEXT = 2

const nodes = {
  0: { /* Root Wrapper */
    id: 0,
    type: FOLDER,
    title: '',
    children: [1]
  },
  1: {
    id: 1,
    type: FOLDER,
    title: 'Root',
    children: [2, 7]
  },
  2: {
    id: 2,
    type: FOLDER,
    title: 'Parent A',
    children: [3, 4]
  },
  3: {
    id: 3,
    type: TEXT,
    title: 'Child A1',
  },
  4: {
    id: 4,
    type: FOLDER,
    title: 'Child Parent A2',
    children: [5, 6]
  },
  5: {
    id: 5,
    type: TEXT,
    title: 'Child A21',
  },
  6: {
    id: 6,
    type: TEXT,
    title: 'Child A21',
  },
  7: {
    id: 7,
    type: FOLDER,
    title: 'Parent B',
    children: [8, 9, 10]
  },
  8: {
    id: 8,
    type: TEXT,
    title: 'Child B1',
  },
  9: {
    id: 9,
    type: TEXT,
    title: 'Child B2',
  },
  10: {
    id: 10,
    type: FOLDER,
    title: 'Child Parent B3',
    children: []
  },
}

export default function Page() {
  const activeNode = useActiveNode();
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (activeNode) {
      setOpen(true)
    }
  }, [activeNode])

  return (
    <>
      <NavNode nodes={nodes} id={0}/>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <Card>
        <CardContent>
          <Typography>
            You clicked on node: {activeNode ? nodes[activeNode].title : false}
          </Typography>
          </CardContent>
        </Card>
      </Modal>
    </>
  )
}