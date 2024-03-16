import { useState, useEffect } from "react";
import { Typography, Modal, Card, CardContent, Box } from "@mui/material";
import { useActiveNode } from "./context/ActiveNodeContext";
import NavNode from "./components/NavNode";
import BodyNode from "./components/BodyNode";
import logo from "./logo.svg"

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
    content: 'Hello, World'
  },
  4: {
    id: 4,
    type: FOLDER,
    title: 'Child Parent A2',
    children: [5, 6, 11, 12, 13]
  },
  5: {
    id: 5,
    type: TEXT,
    title: 'Child A21',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis vehicula feugiat. Proin vitae lectus augue. Sed sodales, augue tempor pharetra viverra, arcu diam laoreet diam, a tincidunt sapien dui nec velit. Etiam feugiat aliquet arcu vel gravida. Aenean fringilla scelerisque auctor. Ut vel felis eget lorem facilisis aliquet in ut metus. Pellentesque elit lorem, facilisis nec malesuada sed, vestibulum tincidunt libero. Nullam feugiat libero a nisi dapibus, sit amet placerat turpis egestas. Morbi sagittis nisi vitae mollis venenatis. Duis sollicitudin ornare urna, id sodales diam venenatis eu. Aliquam sem nunc, aliquam non efficitur at, auctor nec sem. Vestibulum sit amet scelerisque est. Pellentesque vitae dictum felis. Nam consectetur turpis at nunc volutpat, eget eleifend lorem tristique. Sed posuere commodo urna ac volutpat. Pellentesque consectetur, ex eu hendrerit malesuada, elit elit aliquet purus, et congue tellus neque quis lorem. Donec iaculis at arcu nec iaculis. Curabitur placerat, est vel malesuada interdum, metus est accumsan justo, ut euismod sem urna id justo. Vivamus eget sagittis est. Maecenas imperdiet convallis pharetra. Nunc risus sapien, lacinia a erat luctus, congue efficitur metus. Integer iaculis quam sit amet justo sodales finibus. Morbi mauris ligula, aliquet id vehicula a, condimentum a ante. Pellentesque ante diam, mattis ut quam in, venenatis facilisis sem. Aenean porttitor nunc sit amet purus maximus, id accumsan tortor hendrerit. Aenean porta fermentum neque ut condimentum. Donec eget augue turpis. Vivamus porttitor vitae eros sed rhoncus. Curabitur quis consequat ex. Vestibulum ultricies leo lacus, vitae interdum sapien dignissim eget. Praesent dignissim at enim sodales convallis. Maecenas non eros quam. Cras quam odio, lacinia ac imperdiet non, ultrices ut nulla. Aliquam a massa quis urna interdum malesuada. Nunc sed volutpat justo, a tempor nulla. Proin vestibulum enim ac urna semper interdum. Sed a neque ullamcorper, hendrerit justo at, rhoncus risus. Donec metus lorem, tempor congue tincidunt feugiat, congue ut urna. Nam leo ligula, vulputate sit amet mi eget, consequat pharetra justo. Praesent dictum sagittis aliquam. Mauris tincidunt lectus eget erat feugiat gravida. Donec ac fermentum est. Aenean in euismod felis, sit amet finibus purus. Vestibulum suscipit egestas massa. Aliquam vitae dui turpis. Aenean diam diam, condimentum at dolor a, vestibulum dapibus mi. In ut nulla pellentesque, congue nulla elementum, condimentum lacus. Integer iaculis vehicula dui ac condimentum. Vivamus aliquam quam volutpat lorem finibus facilisis. Ut pulvinar pretium mauris vitae laoreet. Integer porta eros lorem, at consequat ante sagittis vel. Phasellus pellentesque mattis est dapibus convallis. Integer interdum dolor nec erat faucibus pulvinar. Phasellus lacinia dui id faucibus hendrerit. In pharetra odio nec elit finibus, id cursus dolor suscipit. Praesent ultricies eleifend fermentum. Suspendisse imperdiet libero enim, eget interdum purus ornare nec. Nulla facilisi. Sed nec consequat lorem. In consequat augue sed egestas malesuada. Vivamus dictum ullamcorper dignissim. Vivamus interdum, sem ac luctus malesuada, libero urna tempus purus, sed eleifend libero lectus at libero. In ultricies dui dolor, id luctus risus tristique sed. Cras tristique metus ut eros aliquet convallis. In pulvinar ultricies neque interdum cursus. Donec sodales vestibulum dolor, non tincidunt eros egestas id. Donec efficitur vulputate ante, ac facilisis urna vulputate vitae. Nulla vel ipsum nulla. Proin scelerisque mollis porttitor. Nunc ac accumsan nunc. Donec accumsan, tellus ut molestie cursus, tellus dolor feugiat odio, ut pellentesque turpis turpis vel metus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque libero libero, porttitor vel elit in, molestie tincidunt odio. Nulla facilisi. Etiam lobortis augue sapien, at feugiat dui fermentum nec. Vivamus et placerat justo, ac placerat justo. Nunc id velit nec sapien consequat vulputate vel bibendum neque. Sed commodo nisl ipsum, non tincidunt ipsum imperdiet a. Sed pharetra arcu sit amet eros finibus ullamcorper. Sed non tristique lectus. Curabitur ac cursus ante, sed tempor ante. Mauris commodo maximus efficitur. Etiam blandit porttitor porttitor. Vestibulum et libero turpis. Fusce lorem libero, tincidunt in fringilla sit amet, efficitur et urna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at neque ac massa accumsan suscipit eget a eros. Fusce mollis volutpat arcu et rhoncus. Mauris euismod sagittis massa eget faucibus. Vivamus malesuada nisi nisi, eget dictum arcu tempus rutrum. Aenean et erat risus. Nulla facilisi. Donec laoreet mi arcu, vitae fringilla velit dapibus quis. Quisque quam nisi, placerat eget enim eget, finibus volutpat felis. In a magna condimentum, vehicula risus nec, faucibus ante. Fusce eu ornare nulla. Nullam ut nisl porta, pellentesque tortor non, placerat eros. Mauris convallis posuere tortor, sed tincidunt sem condimentum eget. Pellentesque tempus vulputate mauris. Morbi hendrerit quis felis in feugiat. Nullam interdum velit sem. Maecenas rhoncus eros ut faucibus commodo. Nam scelerisque malesuada lectus, vel dictum libero. Quisque eget pulvinar erat. Cras at rhoncus enim. Integer fringilla ligula nec dui lobortis, id rutrum odio porttitor. Maecenas velit lacus, condimentum ac augue eget, vestibulum tincidunt orci. Phasellus iaculis, mauris non luctus finibus, enim lacus imperdiet diam, at lobortis enim lacus quis mi. Nullam quis lectus nibh. Suspendisse feugiat molestie finibus. Duis vestibulum turpis porttitor malesuada gravida. Nulla malesuada viverra est, a blandit lacus posuere vitae. Duis gravida dolor ipsum, nec vestibulum nulla mattis in. Phasellus vel auctor libero. Curabitur convallis lacus a ex luctus, eget lobortis sem eleifend. Proin sed ullamcorper ipsum, non suscipit ex. Donec scelerisque fringilla arcu, luctus rutrum lacus cursus at. Phasellus et molestie tellus. Aliquam volutpat ut metus vel suscipit. Sed imperdiet neque at enim bibendum fermentum. Nulla congue urna vel justo venenatis facilisis. Morbi varius erat enim, semper bibendum nibh ultrices non. Sed aliquam nulla id nulla porttitor eleifend. Praesent id faucibus nunc. Suspendisse faucibus lectus eu lectus vulputate, eu varius risus elementum. Praesent lectus purus, sollicitudin vitae mattis non, finibus sit amet lacus. Suspendisse potenti. Cras at nunc sit amet ante aliquam dignissim eu pulvinar nisl. Aenean eget orci nec est volutpat molestie at ut massa. Pellentesque mollis varius elementum. Pellentesque elementum ut nibh a suscipit. Mauris pharetra dolor quis tortor sodales pretium. Maecenas arcu mi, ultrices ultrices velit eget, venenatis placerat est. Vestibulum euismod turpis lorem, ac efficitur tellus sollicitudin nec. Fusce laoreet velit varius finibus facilisis. Pellentesque eros urna, eleifend vel hendrerit ac, laoreet non eros. Duis tincidunt auctor mauris, ut ultricies eros iaculis id. Nunc ac aliquam lacus, at imperdiet orci. Phasellus rutrum sapien vitae luctus lacinia. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sapien metus, malesuada a ipsum quis, iaculis dictum orci. Etiam non luctus dui, vel ultrices dui. Pellentesque in molestie sem. Fusce in tincidunt arcu, convallis porttitor sapien. Vivamus neque magna, porta vel diam ac, lacinia tincidunt tellus. Cras ut facilisis magna. Duis bibendum est non dolor pretium ultrices. Ut vel ante lobortis, ornare libero in, ultrices nunc. Integer tempor enim augue, in dapibus enim finibus nec. Curabitur fringilla felis id purus molestie, vitae condimentum neque pretium. Etiam consequat, lorem vitae sodales viverra, augue elit eleifend urna, rhoncus convallis dolor massa vel erat. Pellentesque imperdiet finibus arcu id varius. Nullam ultricies tempus libero vitae tristique. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam ut sagittis erat, id scelerisque massa. Sed viverra turpis a tincidunt vestibulum. Etiam aliquet, velit in eleifend accumsan, turpis turpis dictum sem, suscipit sodales urna metus pharetra diam. Morbi commodo non augue nec venenatis. Nullam a nisl sed erat vulputate dapibus at sit amet libero. Mauris commodo libero ante, et cursus nisl aliquet ac. Aliquam in felis a neque finibus lobortis in quis nibh. Mauris semper ex a ipsum porttitor mollis. Integer non justo vitae felis aliquet pharetra. Etiam imperdiet suscipit massa. Donec eu odio ac tortor eleifend euismod non ut dolor. Morbi eleifend, magna sed vulputate auctor, sapien urna rutrum erat, non venenatis lacus diam suscipit mauris. Praesent tempor velit eget pharetra bibendum. Nunc a placerat eros, nec consectetur orci. Mauris auctor justo libero, nec euismod odio maximus at. Phasellus scelerisque purus nec felis vehicula, eleifend luctus ex commodo. Aliquam semper varius vulputate. In hac habitasse platea dictumst. Mauris pellentesque accumsan arcu. Etiam egestas tempus urna ac tincidunt. Cras orci tortor, rutrum in eleifend at, tincidunt accumsan lectus. Aliquam dapibus odio massa, sit amet consectetur risus ullamcorper eget. Ut tortor est, pulvinar ac quam et, elementum ornare sapien. Aliquam accumsan sapien porttitor turpis lobortis varius. Nulla vitae aliquam massa. Pellentesque in arcu justo. Nulla eleifend diam vel nibh pellentesque congue. Donec at condimentum urna, non elementum velit. Nulla nec pretium enim, ac venenatis ex. Morbi consequat erat velit, at facilisis lectus blandit ac. Maecenas et viverra justo. Quisque eleifend pretium mi, et varius mauris vestibulum ac. Proin maximus accumsan dolor in egestas. Nunc pulvinar metus ac ante tristique porta. Fusce nisl lorem, fermentum non augue varius, vestibulum finibus urna. Proin at urna sit amet enim tincidunt feugiat. Praesent lobortis suscipit justo, sed rutrum quam auctor nec. Nulla consequat consequat est, et posuere nibh pretium quis. Vivamus vel purus eget erat odio.'
  },
  6: {
    id: 6,
    type: TEXT,
    title: 'Child A22',
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
    content: 'Testing Multiple Categories'
  },
  9: {
    id: 9,
    type: TEXT,
    title: 'Child B2',
    content: 'Testing Multiple Categories'
  },
  10: {
    id: 10,
    type: FOLDER,
    title: 'Child Parent B3',
    children: []
  },
  11: {
    id: 11,
    type: TEXT,
    title: 'Test Nav Scroll',
  },
  12: {
    id: 12,
    type: TEXT,
    title: 'Test Nav Scroll',
  },
  13: {
    id: 6,
    type: TEXT,
    title: 'Test Nav Scroll',
  },
}

export default function Page() {
  const activeNode = useActiveNode();
  const [open, setOpen] = useState(false)
  const [displayNode, setDisplayNode] = useState(false)

  useEffect(() => {
    if (activeNode) {
      setOpen(true)
      setDisplayNode(activeNode)
    }
  }, [activeNode])

  return (
    <>
      <Box sx={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
        <Card sx={{flexShrink: 0}}>
          <CardContent>
            <Box display='flex' justifyContent='space-between'>
              <img src={logo} width='100px' height='100px' alt='logo'/>
              <Typography variant="h3" margin='auto'>
                Header
              </Typography>
              <Box width='100px'/>
            </Box>
          </CardContent>
        </Card>
        <Box sx={{flexGrow: 1, display: 'flex', overflow: 'auto'}}>
          <Box sx={{m: 1, flexShrink: 0, overflow: 'auto'}}>
            <NavNode nodes={nodes} id={0}/>
          </Box>
          <Box sx={{flexGrow: 4, m: 1, overflow: 'auto'}}>
            {displayNode !== false && <BodyNode nodes={nodes} id={displayNode}></BodyNode>}
          </Box>

        </Box>
        <Card sx={{flexShrink: 0}}>
          <CardContent>
            <Typography variant="h3" align="center">
              Footer
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <Card>
        <CardContent>
          <Typography>
            You clicked on node: {activeNode !== false ? nodes[activeNode].title : false}
          </Typography>
          </CardContent>
        </Card>
      </Modal>
    </>
  )
}