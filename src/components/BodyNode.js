import { Typography, Card, CardContent } from '@mui/material';

const FOLDER = 1;
const TEXT = 2;

export default function BodyNode({ nodes, id }) {
  const node = nodes[id];

  return (
    <Card>
      <CardContent>
        <Typography variant='h5' sx={{mb: 1.5}} >{node.title}</Typography>
          {
            node.type === FOLDER &&
            node.children.map((i) =>
              <BodyNode nodes={nodes} id={i} />
            )
          }
        {
          node.type === TEXT && node.content &&
          <Typography paragraph={true}>{node.content}</Typography>
        }
      </CardContent>
    </Card>
  )
}