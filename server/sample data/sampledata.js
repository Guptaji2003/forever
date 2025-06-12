const seeddata = [
  {
    name: "Elegant Kurti",
    image: [
      {
        url: "https://images.unsplash.com/photo-1602810316637-1eae9f65e3d1",
        alttext: "Elegant Kurti",
      },
    ],
    price: 1683,
    category: "women",
    description: "Traditional and elegant kurti for women.",
    color: ["blue", "pink"],
    size: ["S", "M", "L"],
  },
//   {
//     name: "Men's Formal Shirt",
//     image: [
//       {
//         url: "https://images.unsplash.com/photo-1602810316614-b74d58f282b9",
//         alttext: "Men's Formal Shirt",
//       },
//     ],
//     price: 1258,
//     category: "men",
//     description: "Stylish and durable clothing for men.",
//     color: ["white", "blue", "black"],
//     size: ["M", "L", "XL"],
//   },
//   {
//     name: "Kids Party Dress",
//     image: [
//       {
//         url: "https://images.unsplash.com/photo-1601582584000-6b9df50d77ad",
//         alttext: "Kids Party Dress",
//       },
//     ],
//     price: 899,
//     category: "kids",
//     description: "Cute and colorful party dress for kids.",
//     color: ["pink", "yellow"],
//     size: ["S", "M"],
//   },
//   {
//     name: "Women's Denim Jacket",
//     image: [
//       {
//         url: "https://images.unsplash.com/photo-1618354691546-54897e3f660f",
//         alttext: "Women's Denim Jacket",
//       },
//     ],
//     price: 2100,
//     category: "women",
//     description: "Trendy denim jacket for stylish women.",
//     color: ["blue", "black"],
//     size: ["M", "L", "XL"],
//   },
//   {
//     name: "Men's Sports T-Shirt",
//     image: [
//       {
//         url: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
//         alttext: "Men's Sports T-Shirt",
//       },
//     ],
//     price: 699,
//     category: "men",
//     description: "Comfortable and breathable sportswear for men.",
//     color: ["red", "grey"],
//     size: ["S", "M", "L"],
//   },
//   {
//     name: "Girls Ethnic Wear",
//     image: [
//       {
//         url: "https://images.unsplash.com/photo-1574180045827-681f8a1a9622",
//         alttext: "Girls Ethnic Wear",
//       },
//     ],
//     price: 1300,
//     category: "kids",
//     description: "Colorful ethnic wear for girls.",
//     color: ["orange", "green"],
//     size: ["S", "M"],
//   },
//   {
//     name: "Silk Saree",
//     image: [
//       {
//         url: "https://images.unsplash.com/photo-1614851099517-65d9ee10be4a",
//         alttext: "Silk Saree",
//       },
//     ],
//     price: 3200,
//     category: "women",
//     description: "Rich silk saree with beautiful patterns.",
//     color: ["red", "gold"],
//     size: ["Free Size"],
//   },
//   {
//     name: "Men's Casual Jeans",
//     image: [
//       {
//         url: "https://images.unsplash.com/photo-1541099649105-09255e084261",
//         alttext: "Men's Casual Jeans",
//       },
//     ],
//     price: 1500,
//     category: "men",
//     description: "Comfort-fit jeans for casual wear.",
//     color: ["blue", "black"],
//     size: ["M", "L", "XL"],
//   },
//   {
//     name: "Kids Winter Jacket",
//     image: [
//       {
//         url: "https://images.unsplash.com/photo-1599947125553-6a9dc64c7656",
//         alttext: "Kids Winter Jacket",
//       },
//     ],
//     price: 1600,
//     category: "kids",
//     description: "Warm and cozy jacket for kids.",
//     color: ["red", "grey"],
//     size: ["S", "M"],
//   },
//   {
//     name: "Printed Kurta Set",
//     image: [
//       {
//         url: "https://images.unsplash.com/photo-1602810316544-fb0aeaa30007",
//         alttext: "Printed Kurta Set",
//       },
//     ],
//     price: 1799,
//     category: "women",
//     description: "Stylish printed kurta set for festivals.",
//     color: ["maroon", "beige"],
//     size: ["M", "L"],
//   },
//   {
//     name: "Men's Hoodie",
//     image: [
//       {
//         url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf",
//         alttext: "Men's Hoodie",
//       },
//     ],
//     price: 1100,
//     category: "men",
//     description: "Warm hoodie perfect for winter days.",
//     color: ["black", "navy"],
//     size: ["M", "L", "XL"],
//   },
//   {
//     name: "Boys Cotton T-shirt",
//     image: [
//       {
//         url: "https://images.unsplash.com/photo-1602220931352-7520b5c05fa3",
//         alttext: "Boys Cotton T-shirt",
//       },
//     ],
//     price: 499,
//     category: "kids",
//     description: "Soft and comfy cotton t-shirt for boys.",
//     color: ["blue", "green"],
//     size: ["S", "M"],
//   },
//   {
//     name: "Designer Gown",
//     image: [
//       {
//         url: "https://images.unsplash.com/photo-1549388604-817d15aa0110",
//         alttext: "Designer Gown",
//       },
//     ],
//     price: 3500,
//     category: "women",
//     description: "Elegant gown for special occasions.",
//     color: ["purple", "silver"],
//     size: ["M", "L"],
//   },
//   {
//     name: "Men's Blazer",
//     image: [
//       {
//         url: "https://images.unsplash.com/photo-1599947126395-7b7f6d456870",
//         alttext: "Men's Blazer",
//       },
//     ],
//     price: 2800,
//     category: "men",
//     description: "Classy blazer for formal events.",
//     color: ["navy", "black"],
//     size: ["L", "XL"],
//   },
//   {
//     name: "Girls Frock",
//     image: [
//       {
//         url: "https://images.unsplash.com/photo-1599947124761-1a2365cbe2e1",
//         alttext: "Girls Frock",
//       },
//     ],
//     price: 999,
//     category: "kids",
//     description: "Cute and floral frock for girls.",
//     color: ["pink", "white"],
//     size: ["S", "M"],
//   },
];

export default seeddata;
