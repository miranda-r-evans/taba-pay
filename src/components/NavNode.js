import { Fragment, useState } from 'react';
import { useActiveNodeDispatch } from '../context/ActiveNodeContext';
import { Typography, Accordion, AccordionDetails, AccordionSummary, Card, CardContent } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FOLDER = 1;
const TEXT = 2;

export default function NavNode({ nodes, id }) {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useActiveNodeDispatch();
  const node = nodes[id];

  const handleClick = (i) => {
    setExpanded(expanded === i ? false : i)
    dispatch({
      type: 'change',
      id: expanded === i ? false : i
    })
  }

  return (
    <>
    {node.children.map((i) =>
      <Fragment key={i}>
      {nodes[i].type === FOLDER &&
      <Accordion
        expanded={expanded === i}
        onChange={() => handleClick(i)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{'flex-direction': 'row-reverse'}}
      >
        <Typography>{nodes[i].title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <NavNode nodes={nodes} id={i} />
      </AccordionDetails>
      </Accordion>
      }
      {nodes[i].type === TEXT &&
        <Card
        onClick={() => handleClick(i)}
        >
          <CardContent>
            <Typography>
              {nodes[i].title}
            </Typography>
          </CardContent>
        </Card>
      }
      </Fragment>
    )}
  </>
  )
}