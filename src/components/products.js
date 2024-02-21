// products.js
import headset from '../assests/headset.jpg';
import laptop from '../assests/laptop.jpg';
import kurtaset from '../assests/kurtaset.jpg';
import tshirt from '../assests/tshirt.jpg';
import handbag from '../assests/handbag.jpg';
import lipstick from '../assests/lipstick.jpg';
import bulb from '../assests/bulb.jpg';
import shirt from '../assests/shirt.jpg';
import hairband from '../assests/hairband.jpg';

const products = [
    { id: 1, title: 'Head Set', description: 'The Headset with bluettoth connection provided.', image: headset, price: 70, category: 'Electronics' },
    { id: 2, title: 'Laptop', description: 'Dell Laptop supports latest version of windows with good performance rate.',  image: laptop, price: 120, category: 'Electronics' },
    { id: 3, title: 'bulb', description: 'The incandisense bulb that have 3 year gaurantee',  image: bulb, price: 10, category: 'Electronics' },
    { id: 4, title: 'Kurta Set', description: 'Eligent pink color kuta set with all sizes available.', image: kurtaset,  price: 45, category: 'Clothing' },
    { id: 5, title: 'T-shirt', description: 'T-shirt for men', image: tshirt, price: 25, category: 'Clothing' },
    { id: 6, title: 'shirt', description: 'formal shirt for men with all sizes avialable ', image: shirt, price: 50, category: 'Clothing' },
    { id: 7, title: 'Hand Bag', description: 'Pretty Hand Bag gor lovalble girls.',  image: handbag, price: 120, category: 'Accessory' },
    { id: 8, title: 'LipStick', description: 'Has a nice collection of lipstick colors',  image: lipstick, price: 18, category: 'Accessory' },
    { id: 9, title: 'hairband', description: 'Hairbands in different colors.',  image: hairband, price: 10, category: 'Accessory' },
    // Add more products as needed
  ];
  
  export default products;
  