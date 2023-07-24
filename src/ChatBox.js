import Box from '@mui/material/Box';
import './ChatBox.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useRef, useState, useEffect } from 'react';
import { Configuration, OpenAIApi } from "openai";
import { doInitLogic, MetaData } from './StupidLogic';
import Chips from './Chips';
import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';

const ChatBox = () => {

    let renounce = false;
    useEffect(() => {
        if (!renounce) {
            renounce = true;
            return;
        }

        const synth = window.speechSynthesis;

        const utterThis = new SpeechSynthesisUtterance('Hey, how can I help you?');
        synth.speak(utterThis);

    }, []);
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body1,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 'auto',
        lineHeight: '30px',
        overflowX: 'hidden'
    }));

    const [messages, setMessages] = useState([
        {
            text: 'Hey 👋, how can I help you?',
            sender: 'bot'
        }
    ]);

    const [message, setMessage] = useState('');
    const [askAI, setAskAI] = useState(false);
    const [chipValue, setChipValue] = useState(null);
    const configuration = new Configuration({

        apiKey: "your key",
    });
    const openai = new OpenAIApi(configuration);






    useEffect(() => {
        async function test() {
            if (!askAI) {
                return;
            }

            const prompt = messages.reduce((acc, cur) => {
                return acc + cur.text + '\n';
            }, '');

            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: prompt,
                temperature: 1,
                max_tokens: 256,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            })

            setMessages([...messages, {
                sender: 'bot',
                text: response.data.choices[0].text
            }]);
            const synth = window.speechSynthesis;

            const utterThis = new SpeechSynthesisUtterance(response.data.choices[0].text);

            synth.speak(utterThis);

            console.log(response.data);
            console.log(response.data.choices[0].text);
            setAskAI(false);

        }
        test();

    }, [askAI]);


    const sendHandler = () => {

        setMessages([...messages, {
            sender: 'user',
            text: message
        }]);
        setMessage('');
        setAskAI(true);
    }
    const chipClickHandler = (value) => {

        const obj = doInitLogic(value);
        setMessages([...messages, ...obj.messages]);

        setChipValue(value);
        setAskAI(obj.askAI);
    }


    return (
        <div >
            <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 2, md: 2 }}>




                {
                    messages.map((message, index) => {

                        if (message.sender === 'user') {
                            return (
                                <>
                                    <Grid item xs={6}>

                                        <Box
                                            sx={{
                                                p: 2,
                                                bgcolor: 'background.default',
                                                display: 'grid',
                                                gridTemplateColumns: { md: '1fr 1fr' },
                                                gap: 2,
                                            }}
                                        >
                                            <Item
                                                sx={
                                                    {
                                                        bgcolor: 'primary.light'

                                                    }
                                                }
                                                elevation={3}>
                                                {message.text}
                                            </Item>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                    </Grid>
                                </>

                            )

                        }
                        else if (message.sender === 'bot') {
                            return (
                                <>
                                    <Grid item xs={6}>
                                    </Grid>
                                    <Grid item xs={6}>

                                        <Box
                                            sx={{
                                                p: 2,
                                                bgcolor: 'background.default',
                                                display: 'grid',
                                                gridTemplateColumns: { md: '1fr 1fr' },
                                                gap: 2,
                                            }}
                                        >
                                            <Item onClick={() => { window.open("https://www.lieferando.de/speisekarte/musti-bistro", "_blank") }}
                                                sx={
                                                    {
                                                        bgcolor: 'warning.light',
                                                    }
                                                }
                                                elevation={3}>
                                                {message.text}
                                            </Item>
                                        </Box>
                                    </Grid>

                                </>)
                        }

                        return null
                    }
                    )
                }

            </Grid>
            {!chipValue && <Chips onChip={chipClickHandler} />}

            {chipValue && <Container

            >
                <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={(event) => setMessage(event.target.value)} value={message} />
                <Button variant="contained" endIcon={<SendIcon />}
                    onClick={sendHandler}
                >
                    Send
                </Button>
            </Container>}


        </div>
    )

}

export default ChatBox;