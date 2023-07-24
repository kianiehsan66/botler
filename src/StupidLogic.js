import { orders, restaurants } from "./DummyData";


const location = "Schlesische straße 38, 10997 Berlin";








export const doInitLogic = (chipValue) => {

    let lMessages = [];
    let askAI = false;

    let mood = ["neutral manner", "happy manner", "german language", "persian language", "happy pride month manner"];

    switch (chipValue) {
        case "currentOrder":
            lMessages.push(
                {
                    sender: 'meta',
                    text: "my location is " + location +
                        "My name is Ehsan,call me by my name at the end of each message. "
                }
            );

            lMessages.push(
                {
                    sender: 'bot',
                    text: "current order(" + orders[0].orderNumber + ") is  from " + orders[0].restaurantName + " and it will be delivered to " + location
                }
            )
            lMessages.push(
                {
                    sender: 'bot',
                    text: "order is being prepared and will be delivered in 30 minutes."
                }
            );
            lMessages.push(
                {
                    sender: 'bot',
                    text: "You can call the restaurant by this number: 00493012345678"
                });
            lMessages.push(
                {
                    sender: 'meta',
                    text: "order cannot be canceled automatically because it's already being prepared however you can call the restaurant also it's possible to  change the delivery time to later"
                }
            );


            break;
        case "previousOrders":

            break;
        case "hotNewRestaurants":
            let highestRatedRestaurant = restaurants["1077"];
            for (const key in restaurants) {
                if (restaurants[key].rating.score > highestRatedRestaurant.rating.score) {
                    highestRatedRestaurant = restaurants[key];
                }
            }


            lMessages.push(
                {
                    sender: 'meta',
                    text: ` newest highest rated restaurant in this area: ${highestRatedRestaurant.brand.name} ,

                 most popular item: ${highestRatedRestaurant.popularItem},

                 cost:${highestRatedRestaurant.popularItemPrice}, 

                 delivered: ${highestRatedRestaurant.shippingInfo.delivery.duration} ,
                    \n`
                },
                {
                    sender: 'meta',
                    text: `
                        if the user said yes to question about placing an order send this link in response :https://www.lieferando.de/speisekarte/musti-bistro 
                        \n`
                },
                {
                    sender: 'meta',
                    text: ` 
                     explain previous data to user in a ${mood[4]}  use emojis then ask if user wants to place an order?\n`
                },
                {
                    sender: 'user',
                    text: "what's the newest highest rated restaurant in the area? \n"
                })

            askAI = true;
            break;
        case "bestBurgers":
            let highestRatedBurger = restaurants["1077"];
            for (const key in restaurants) {
                if (restaurants[key].rating.score > highestRatedBurger.rating.score && restaurants[key].popularItem === "Burger") {
                    highestRatedBurger = restaurants[key];
                }
            }

            lMessages.push(
                {
                    sender: 'meta',

                    text: `The highest rated veggi bergur is ${highestRatedBurger.popularItem} from ${highestRatedBurger.name}, they also have a promotion that you can get 2 burgers if you order 1, the cost is ${highestRatedBurger.popularItemPrice} euros and delivery time is  minutes the delivery costs 1.99 euros, explain previous data to user in a ${mood[1]} use emojis then ask if user wants to place an order? \n`
                },
                {
                    sender: 'user',
                    text: "what's the best veggi burger in the area? \n"
                })
            askAI = true;
            break;
        case "fastestDelivery":
            break;
        case "cheapOptions":
            break;
        default:

            break;
    }


    return { messages: lMessages, askAI: askAI };


}
