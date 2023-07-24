
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import FaceIcon from '@mui/icons-material/Face';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
export const Chips = (props) => {

    const ListItem = styled('li')(({ theme }) => ({
        margin: theme.spacing(0.5),
    }));

    const items = [
        {
            name: "🤤 Current Order",
            value: "currentOrder"
        },
        {
            name: "🍭 Previous Orders",
            value: "previousOrders"
        },
        {
            name: "🔥 Hot new Restaurants",
            value: "hotNewRestaurants"
        },
        {
            name: "🍔 Best Veggie Burgers",
            value: "bestBurgers"
        },
        {
            name: "🛵 Fastest delivery",
            value: "fastestDelivery"
        },
        {
            name: "💸 Cheap options",
            value: "cheapOptions"
        },
        {
            name: "🤨 something else...",
            value: "somethingElse"
        }
    ]

    const chipClickHandler = (value) => {
        props.onChip(value);
    }

    return (
        <div>
            <h6>Suggestions...</h6>

            <Paper
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    listStyle: 'none',
                    p: 0.5,
                    m: 0,
                }}
                component="ul"
            >
                {items.map((item, index) => {
                    return (
                        <ListItem>
                            <Chip key={index} color="primary" label={item.name} variant="outlined"
                                onClick={chipClickHandler.bind(null, item.value)} />
                        </ListItem>

                    )
                })}
            </Paper>

        </div>
    )

}

export default Chips;