// import { AccordionItem, AccordionItemContent, AccordionItemTrigger, AccordionRoot } from '@/components/ui/accordion';

// const Demo = () => {
//     return (
//         <AccordionRoot collapsible defaultValue={['b']}>
//             {items.map((item, index) => (
//                 <AccordionItem key={index} value={item.value}>
//                     <AccordionItemTrigger>{item.title}</AccordionItemTrigger>
//                     <AccordionItemContent>{item.text}</AccordionItemContent>
//                 </AccordionItem>
//             ))}
//         </AccordionRoot>
//     );
// };

// const items = [
//     { value: 'a', title: 'First Item', text: 'Some value 1...' },
//     { value: 'b', title: 'Second Item', text: 'Some value 2...' },
//     { value: 'c', title: 'Third Item', text: 'Some value 3...' },
// ];

// import { ClipboardIconButton, ClipboardRoot } from '@/components/ui/clipboard';

// const Demo = () => {
//     return (
//         <ClipboardRoot value="https://chakra-ui.com">
//             <ClipboardIconButton />
//         </ClipboardRoot>
//     );
// };
import { Badge, Stack } from '@chakra-ui/react';

const Demo = () => {
    return (
        <Stack direction="row">
            <Badge>Default</Badge>
            <Badge colorPalette="green">Success</Badge>
            <Badge colorPalette="red">Removed</Badge>
            <Badge colorPalette="purple">New</Badge>
        </Stack>
    );
};

export default Demo;
