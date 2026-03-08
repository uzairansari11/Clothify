require("dotenv").config();
const mongoose = require("mongoose");
const { ProductModel } = require("./model/product_model");

// ─── Helper: build Unsplash URL from photo ID ────────────────────────────────
const u = (id) => `https://images.unsplash.com/${id}?w=600&h=750&fit=crop`;

// ─── Image pools ───────────────────────────────────────────────────────────────
// EVERY subcategory has its own UNIQUE pool of 6-8 URLs.
// No photo ID appears in more than one pool.

const imgPool = {
  // ═══════════════════════════════════════════════════════════════════════════
  //  M E N
  // ═══════════════════════════════════════════════════════════════════════════
  men_shirts: [
    u("photo-1596755094514-f87e34085b2c"),
    u("photo-1602810318383-e386cc2a3ccf"),
    u("photo-1598033129183-c4f50c736c10"),
    u("photo-1607345366928-199ea26cfe3e"),
    u("photo-1588359348347-9bc6cbbb689e"),
    u("photo-1563389234808-52344934935c"),
    u("photo-1589310243389-96a5483213a8"),
    u("photo-1620012253295-c15cc3e65df4"),
  ],
  men_tshirts: [
    u("photo-1521572163474-6864f9cf17ab"),
    u("photo-1583743814966-8936f5b7be1a"),
    u("photo-1576566588028-4147f3842f27"),
    u("photo-1622445275463-afa2ab738c34"),
    u("photo-1618354691373-d851c5c3a990"),
    u("photo-1562157873-818bc0726f68"),
    u("photo-1527719327859-c6ce80353573"),
    u("photo-1581655353564-df123a1eb820"),
  ],
  men_jeans: [
    u("photo-1542272604-787c3835535d"),
    u("photo-1604176354204-9268737828e4"),
    u("photo-1541099649105-f69ad21f3246"),
    u("photo-1475178626620-a4d074967571"),
    u("photo-1582552938357-32b906df40cb"),
    u("photo-1605518216938-7c31b7b14ad0"),
  ],
  men_trousers: [
    u("photo-1624378439575-d8705ad7ae80"),
    u("photo-1473966968600-fa801b869a1a"),
    u("photo-1506629082955-511b1aa562c8"),
    u("photo-1519722417352-7d6959729417"),
    u("photo-1559563458-527698bf5295"),
    u("photo-1517438476312-10d79c077509"),
  ],
  men_shorts: [
    u("photo-1591195853828-11db59a44f6b"),
    u("photo-1565084888279-aca5ecc8f8e5"),
    u("photo-1590159983013-d4ff5fc71c1d"),
    u("photo-1600269452121-4f2416e55c28"),
    u("photo-1562183241-b937e95585b6"),
    u("photo-1617952739858-28043cecdea5"),
  ],
  men_jackets: [
    u("photo-1648111145022-1af83031ade6"),
    u("photo-1606903073578-7ca9ea9946c0"),
    u("photo-1660776864454-628551d83a2c"),
    u("photo-1607184932541-525ee4661bd7"),
    u("photo-1592878849122-facb97520f9e"),
    u("photo-1648111144798-f623232beca0"),
    u("photo-1589258603808-5381eeb16b94"),
    u("photo-1513089176717-55db930c2e2a"),
  ],
  men_hoodies: [
    u("photo-1556821840-3a63f95609a7"),
    u("photo-1578681994506-b8f463449011"),
    u("photo-1620799139507-2a76f79a2f4d"),
    u("photo-1614975059251-992f11792571"),
    u("photo-1542406775-ade58c52d2e4"),
    u("photo-1615397349754-cfa2066a298e"),
  ],
  men_innerwear: [
    u("photo-1586790170083-2f9ceadc732d"),
    u("photo-1564859228273-274232fdb516"),
    u("photo-1622445272461-c6580cab8755"),
    u("photo-1529374255404-311a2a4f1fd9"),
    u("photo-1586363104862-3a5e2ab60d99"),
    u("photo-1618354691438-25bc04584c23"),
  ],
  men_sleepwear: [
    u("photo-1490578474895-699cd4e2cf59"),
    u("photo-1515886657613-9f3515b0c78f"),
    u("photo-1584865288642-0f9380cfa06b"),
    u("photo-1594938298603-c8148c4dae35"),
    u("photo-1555689502-c4b22d76c56f"),
    u("photo-1598554747436-c9293d6a588f"),
  ],
  men_ethnic: [
    u("photo-1583391733956-6c78276477e2"),
    u("photo-1585036156171-384164a8c696"),
    u("photo-1600091166971-7f9faad6c1e2"),
    u("photo-1608234807905-4466023792f5"),
    u("photo-1610030469983-98e550d6193c"),
    u("photo-1614252235316-8c857d38b5f4"),
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  //  W O M E N
  // ═══════════════════════════════════════════════════════════════════════════
  women_top: [
    u("photo-1564257631407-4deb1f99d992"),
    u("photo-1503342217505-b0a15ec3261c"),
    u("photo-1525507119028-ed4c629a60a3"),
    u("photo-1485968579580-b6d095142e6e"),
    u("photo-1554568218-0f1715e72254"),
    u("photo-1434389677669-e08b4cda3a38"),
    u("photo-1469334031218-e382a71b716b"),
  ],
  women_tshirts: [
    u("photo-1485462537746-965f33f7f6a7"),
    u("photo-1487222477894-8943e31ef7b2"),
    u("photo-1483985988355-763728e1935b"),
    u("photo-1509631179647-0177331693ae"),
    u("photo-1475180098004-ca77a66827be"),
    u("photo-1523359346063-d879354c0ea5"),
  ],
  women_shirts: [
    u("photo-1589156280159-27698a70f29e"),
    u("photo-1604695573706-53170668f6a6"),
    u("photo-1558171813-4c088753af8f"),
    u("photo-1551803091-e20673f15770"),
    u("photo-1583496661160-fb5886a0aaaa"),
    u("photo-1577900232427-18219b9166a0"),
  ],
  women_jeans: [
    u("photo-1578632292335-df3abbb0d586"),
    u("photo-1584370848010-d7b9af4f09cd"),
    u("photo-1582418702059-97ebafb35d09"),
    u("photo-1548624313-0396c75e4b1a"),
    u("photo-1560243563-062bfc001d68"),
    u("photo-1541698444083-023c97d3f795"),
  ],
  women_kurti: [
    u("photo-1594938328870-9623159c8c99"),
    u("photo-1617627143750-d86bc21e42bb"),
    u("photo-1590735213920-68192a487bc2"),
    u("photo-1583391733681-703f5ad2eb95"),
    u("photo-1617019114583-affb34d1b3cd"),
    u("photo-1617627143233-0e5c7a6f70b0"),
  ],
  women_bra: [
    u("photo-1666358071262-6142d0d2451e"),
    u("photo-1587583911594-a7c8abaadfce"),
    u("photo-1660070607601-f7d0234665c4"),
    u("photo-1657753023885-7e30e39bf039"),
    u("photo-1624035203840-8121a20672d5"),
    u("photo-1633699124189-17c808027f4a"),
  ],
  women_panty: [
    u("photo-1628519555279-3eada894828b"),
    u("photo-1594616091971-bf856a77b57d"),
    u("photo-1594631770635-f2915410b410"),
    u("photo-1640160869992-8fc37e12453c"),
    u("photo-1615387085077-643f09368976"),
    u("photo-1591385291640-8180a44df171"),
  ],
  women_lingerie: [
    u("photo-1601392842066-eb7dbcec9866"),
    u("photo-1660070608101-ac8ac3382958"),
    u("photo-1706550632810-39f538b9d6fd"),
    u("photo-1600585154340-be6161a56a0c"),
    u("photo-1600585154526-990dced4db0d"),
    u("photo-1600585152220-90363fe7e115"),
  ],
  women_nightdress: [
    u("photo-1556742031-c6961e8560b0"),
    u("photo-1556740714-a8395b3bf30f"),
    u("photo-1518310383802-640c2de311b2"),
    u("photo-1538805060514-97d9cc17730c"),
    u("photo-1553062407-98d91397e782"),
    u("photo-1558883885-3b4b796a9345"),
  ],
  women_leggings: [
    u("photo-1552874869-5c39ec9288dc"),
    u("photo-1548690312-e3b507d8c110"),
    u("photo-1506126613408-eca07ce68773"),
    u("photo-1518609571773-39b7d303a87b"),
    u("photo-1544367567-0f2fcb009e0b"),
    u("photo-1571019614242-c5c5dee9f50b"),
  ],
  women_skirts: [
    u("photo-1572804013309-59a88b7e92f1"),
    u("photo-1595777457583-95e059d581b8"),
    u("photo-1496747611176-843222e1e57c"),
    u("photo-1612336307429-8a898d10e223"),
    u("photo-1539008835657-9e8e9680c956"),
    u("photo-1562137369-1a1a0bc66744"),
  ],
  women_dresses: [
    u("photo-1502716119720-b23a1e3b3c34"),
    u("photo-1568252542512-9fe8fe9c87bb"),
    u("photo-1515372039744-b8f02a3ae446"),
    u("photo-1599839575945-e8b18e28e974"),
    u("photo-1585487000160-b24a714b21cf"),
    u("photo-1550639525-c97d455acf70"),
    u("photo-1590400516695-36e8d684ee5b"),
    u("photo-1495385794356-15371f348c31"),
  ],
  women_ethnic: [
    u("photo-1610030470380-80e8bfab8a63"),
    u("photo-1583391733808-96b4b8e25c2b"),
    u("photo-1614252369548-e40d8b87b1bf"),
    u("photo-1585036156261-3f0e6e4bd8c6"),
    u("photo-1608234808654-2a8875faa7fd"),
    u("photo-1600091166922-4c4cb1ea5e35"),
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  //  K I D S
  // ═══════════════════════════════════════════════════════════════════════════
  kids_shirts: [
    u("photo-1541580621-47abd5e3da8b"),
    u("photo-1541580104-e98c7a5dd683"),
    u("photo-1543854704-2b1b011701e6"),
    u("photo-1622218286192-95f6a20083c7"),
    u("photo-1577877777751-3f1ec20a0715"),
    u("photo-1554049166-e4f1ae4ca43b"),
  ],
  kids_tshirts: [
    u("photo-1556133168-a6cb2412e0c7"),
    u("photo-1550713970-ba155526fa12"),
    u("photo-1589253344003-941386d5f770"),
    u("photo-1758782213532-bbb5fd89885e"),
    u("photo-1725147874926-dfebe6d996ef"),
    u("photo-1725147874578-fc76e0d865e1"),
  ],
  kids_jeans: [
    u("photo-1725147874938-7904e3362841"),
    u("photo-1762077656275-4514300d7da8"),
    u("photo-1759473434572-64c4bfd8cb31"),
    u("photo-1503454537195-1dcabb73ffb9"),
    u("photo-1543852786-1cf6624b9987"),
    u("photo-1574710104-0e775b40e4c5"),
  ],
  kids_shorts: [
    u("photo-1519456264917-42d0aa2e0625"),
    u("photo-1595401359519-a09e0e3e7f77"),
    u("photo-1501256504904-1fbe305bb90a"),
    u("photo-1545558014-8692077e9b5c"),
    u("photo-1555009393-f20bdb245c4d"),
    u("photo-1471342051903-67bc50bd52c6"),
  ],
  kids_dresses: [
    u("photo-1524504388940-b1c1722653e1"),
    u("photo-1518980569608-e11dc63d19f0"),
    u("photo-1476234251635-f7e1f5d95e34"),
    u("photo-1504439468489-c8920d796a29"),
    u("photo-1502781252888-9143ba7f074e"),
    u("photo-1514090458221-65bb69cf63e6"),
  ],
  kids_sleepwear: [
    u("photo-1489710437720-ebb67ec84dd2"),
    u("photo-1553755322-38ab5b9a420c"),
    u("photo-1519689373023-dd07c7988603"),
    u("photo-1548858806-2bc0c36e6835"),
    u("photo-1519689674527-a81d6a08a53a"),
    u("photo-1515488042361-ee00e0ddd4e4"),
  ],
  kids_ethnic: [
    u("photo-1503919545889-aef636e10ad4"),
    u("photo-1494894194458-0174142560c0"),
    u("photo-1499887142886-791eca5918cd"),
    u("photo-1534744971734-e1628d37ea01"),
    u("photo-1516733968668-dbdce39c0651"),
    u("photo-1519689374065-0951a0f8b711"),
  ],
  kids_winter: [
    u("photo-1509281373149-e957c6296406"),
    u("photo-1543466835-00a7907e9de1"),
    u("photo-1511652633222-7b5e0a2882e3"),
    u("photo-1542085006745-6083e419d6e6"),
    u("photo-1510414842594-a61c69b5ae57"),
    u("photo-1519681393784-d120267933ba"),
  ],
};

// ─── Product data by category/subcategory ──────────────────────────────────────

function generateProducts() {
  const products = [];

  function add(list, category, subcategory, imgKey, sizeSet) {
    const sizes =
      sizeSet ||
      (category === "Kids"
        ? ["4", "5", "6", "7", "8", "9", "10"]
        : ["S", "M", "L", "XL", "XXL"]);
    const pool = imgPool[imgKey] || [];
    list.forEach((t, i) => {
      const img1 = pool[i % pool.length];
      const img2 = pool[(i + 1) % pool.length];
      products.push({
        title: t.title,
        category,
        subcategory,
        brand: t.brand,
        price: t.price,
        discount: t.discount || 0,
        images: [img1, img2],
        description:
          t.desc ||
          `Premium ${subcategory.toLowerCase()} from ${t.brand}. Quality materials with expert craftsmanship for comfort and style.`,
        rating: +(3.8 + Math.random() * 1.2).toFixed(1),
        total_rating: 80 + Math.floor(Math.random() * 500),
        sizes,
        quantity: 50 + Math.floor(Math.random() * 200),
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════════
  //  M E N  (10 subcategories, ~20 each = ~200)
  // ═══════════════════════════════════════════════════════════════════════════════

  // ── Men > Shirts (20) ────────────────────────────────────────────────────────
  add(
    [
      { title: "Brooks Brothers Non-Iron Dress Shirt", brand: "Brooks Brothers", price: 88, discount: 10 },
      { title: "Ralph Lauren Oxford Shirt", brand: "Ralph Lauren", price: 90, discount: 15 },
      { title: "Tommy Hilfiger Slim Fit Shirt", brand: "Tommy Hilfiger", price: 55, discount: 10 },
      { title: "H&M Slim Fit Easy-Iron Shirt", brand: "H&M", price: 22, discount: 5 },
      { title: "Zara Textured Weave Shirt", brand: "Zara", price: 38, discount: 10 },
      { title: "GAP Standard Fit Oxford Shirt", brand: "Gap", price: 35, discount: 15 },
      { title: "Calvin Klein Slim Fit Stretch Shirt", brand: "Calvin Klein", price: 60, discount: 10 },
      { title: "Lacoste Regular Fit Linen Shirt", brand: "Lacoste", price: 95, discount: 5 },
      { title: "J.Crew Stretch Secret Wash Shirt", brand: "J.Crew", price: 65, discount: 20 },
      { title: "Banana Republic Untucked Slim Shirt", brand: "Banana Republic", price: 55, discount: 10 },
      { title: "Levi's Classic Western Shirt", brand: "Levi's", price: 48, discount: 15 },
      { title: "Zara Relaxed Fit Linen Shirt", brand: "Zara", price: 42, discount: 10 },
      { title: "H&M Regular Fit Flannel Shirt", brand: "H&M", price: 25, discount: 10 },
      { title: "Tommy Hilfiger Check Pattern Shirt", brand: "Tommy Hilfiger", price: 58, discount: 15 },
      { title: "Ralph Lauren Slim Fit Striped Shirt", brand: "Ralph Lauren", price: 85, discount: 10 },
      { title: "Topman Muscle Fit Oxford Shirt", brand: "Topman", price: 32, discount: 10 },
      { title: "American Eagle Flex Oxford Shirt", brand: "American Eagle", price: 35, discount: 15 },
      { title: "Diesel Denim Western Shirt", brand: "Diesel", price: 88, discount: 20 },
      { title: "Carhartt Rugged Flex Shirt", brand: "Carhartt", price: 45, discount: 5 },
      { title: "Puma Golf Polo Shirt", brand: "Puma", price: 42, discount: 8 },
    ],
    "Men",
    "Shirts",
    "men_shirts"
  );

  // ── Men > T-Shirts (20) ─────────────────────────────────────────────────────
  add(
    [
      { title: "Nike Sportswear Club T-Shirt", brand: "Nike", price: 25, discount: 5 },
      { title: "Adidas Originals Essential Tee", brand: "Adidas", price: 28, discount: 10 },
      { title: "H&M Regular Fit Crew-Neck Tee", brand: "H&M", price: 10, discount: 5 },
      { title: "Zara Printed Graphic T-Shirt", brand: "Zara", price: 22, discount: 10 },
      { title: "Levi's Housemark Graphic Tee", brand: "Levi's", price: 25, discount: 15 },
      { title: "Ralph Lauren Crew Neck T-Shirt", brand: "Ralph Lauren", price: 45, discount: 10 },
      { title: "Tommy Hilfiger Logo Tee", brand: "Tommy Hilfiger", price: 35, discount: 8 },
      { title: "Calvin Klein CK Crew Tee", brand: "Calvin Klein", price: 30, discount: 10 },
      { title: "GAP Logo Crewneck T-Shirt", brand: "Gap", price: 18, discount: 5 },
      { title: "Puma Essentials Logo Tee", brand: "Puma", price: 20, discount: 8 },
      { title: "Lacoste Pima Cotton V-Neck Tee", brand: "Lacoste", price: 50, discount: 10 },
      { title: "Diesel Logo Print T-Shirt", brand: "Diesel", price: 38, discount: 15 },
      { title: "American Eagle Soft Tee", brand: "American Eagle", price: 20, discount: 10 },
      { title: "Under Armour Tech 2.0 Tee", brand: "Under Armour", price: 28, discount: 5 },
      { title: "Carhartt Pocket T-Shirt", brand: "Carhartt", price: 22, discount: 5 },
      { title: "J.Crew Broken-In Jersey Tee", brand: "J.Crew", price: 28, discount: 5 },
      { title: "Banana Republic Luxe Touch Tee", brand: "Banana Republic", price: 30, discount: 10 },
      { title: "Nike ACG Mountain Tee", brand: "Nike", price: 32, discount: 8 },
      { title: "Adidas Originals Camo Tee", brand: "Adidas", price: 28, discount: 10 },
      { title: "H&M THERMOMOVE Sport Tee", brand: "H&M", price: 15, discount: 5 },
    ],
    "Men",
    "T-Shirts",
    "men_tshirts"
  );

  // ── Men > Jeans (15) ────────────────────────────────────────────────────────
  add(
    [
      { title: "Levi's 501 Original Fit Jeans", brand: "Levi's", price: 70, discount: 10 },
      { title: "Levi's 511 Slim Fit Jeans", brand: "Levi's", price: 65, discount: 15 },
      { title: "Wrangler Cowboy Cut Slim Fit Jeans", brand: "Wrangler", price: 45, discount: 10 },
      { title: "Diesel Sleenker Skinny Jeans", brand: "Diesel", price: 120, discount: 20 },
      { title: "Calvin Klein Slim Fit Jeans", brand: "Calvin Klein", price: 75, discount: 10 },
      { title: "Tommy Hilfiger Denton Straight Jeans", brand: "Tommy Hilfiger", price: 80, discount: 15 },
      { title: "H&M Slim Jeans", brand: "H&M", price: 25, discount: 5 },
      { title: "Zara Skinny Fit Jeans", brand: "Zara", price: 38, discount: 10 },
      { title: "GAP Slim Fit GapFlex Jeans", brand: "Gap", price: 50, discount: 10 },
      { title: "American Eagle AirFlex+ Slim Jeans", brand: "American Eagle", price: 45, discount: 15 },
      { title: "Ralph Lauren Sullivan Slim Jeans", brand: "Ralph Lauren", price: 95, discount: 10 },
      { title: "Hudson Blake Slim Straight Jeans", brand: "Hudson", price: 110, discount: 20 },
      { title: "Wrangler Texas Straight Fit Jeans", brand: "Wrangler", price: 42, discount: 8 },
      { title: "Levi's 505 Regular Fit Jeans", brand: "Levi's", price: 58, discount: 10 },
      { title: "H&M Relaxed Fit Jeans", brand: "H&M", price: 28, discount: 10 },
      { title: "Banana Republic Athletic Tapered Jeans", brand: "Banana Republic", price: 68, discount: 15 },
      { title: "J.Crew 484 Slim Fit Stretch Jeans", brand: "J.Crew", price: 72, discount: 10 },
      { title: "Carhartt Rugged Flex Relaxed Jeans", brand: "Carhartt", price: 55, discount: 10 },
      { title: "Puma Denim Jogger Jeans", brand: "Puma", price: 48, discount: 15 },
      { title: "Under Armour Performance Denim Jeans", brand: "Under Armour", price: 62, discount: 10 },
    ],
    "Men",
    "Jeans",
    "men_jeans"
  );

  // ── Men > Trousers (16) ─────────────────────────────────────────────────────
  add(
    [
      { title: "Ralph Lauren Slim Fit Chinos", brand: "Ralph Lauren", price: 75, discount: 15 },
      { title: "H&M Regular Fit Cotton Trousers", brand: "H&M", price: 30, discount: 10 },
      { title: "Zara Pleated Wide-Leg Trousers", brand: "Zara", price: 50, discount: 20 },
      { title: "Tommy Hilfiger Bleecker Slim Chinos", brand: "Tommy Hilfiger", price: 65, discount: 10 },
      { title: "GAP Essential Khakis Slim Fit", brand: "Gap", price: 40, discount: 10 },
      { title: "Calvin Klein Slim Fit Dress Pants", brand: "Calvin Klein", price: 70, discount: 15 },
      { title: "Banana Republic Core Temp Chino", brand: "Banana Republic", price: 60, discount: 10 },
      { title: "J.Crew 484 Slim Fit Tech Pant", brand: "J.Crew", price: 58, discount: 15 },
      { title: "Lacoste Slim Fit Gabardine Chinos", brand: "Lacoste", price: 85, discount: 10 },
      { title: "Levi's XX Chino Standard Taper", brand: "Levi's", price: 48, discount: 10 },
      { title: "H&M Linen Blend Trousers", brand: "H&M", price: 28, discount: 5 },
      { title: "Zara Jogger Waist Trousers", brand: "Zara", price: 35, discount: 10 },
      { title: "Diesel Cargo Pants", brand: "Diesel", price: 95, discount: 20 },
      { title: "Under Armour Unstoppable Tapered Pants", brand: "Under Armour", price: 55, discount: 10 },
      { title: "Puma Essentials Slim Pants", brand: "Puma", price: 38, discount: 8 },
      { title: "Carhartt Relaxed Fit Canvas Pants", brand: "Carhartt", price: 50, discount: 10 },
    ],
    "Men",
    "Trousers",
    "men_trousers"
  );

  // ── Men > Shorts (12) ──────────────────────────────────────────────────────
  add(
    [
      { title: "Nike Dri-FIT Running Shorts", brand: "Nike", price: 35, discount: 10 },
      { title: "Levi's 501 Hemmed Denim Shorts", brand: "Levi's", price: 45, discount: 15 },
      { title: "Adidas Essentials 3-Stripe Shorts", brand: "Adidas", price: 28, discount: 5 },
      { title: "H&M Regular Fit Cotton Shorts", brand: "H&M", price: 18, discount: 10 },
      { title: "Ralph Lauren Classic Fit Shorts", brand: "Ralph Lauren", price: 65, discount: 10 },
      { title: "Tommy Hilfiger Brooklyn Shorts", brand: "Tommy Hilfiger", price: 50, discount: 15 },
      { title: "GAP 10-Inch Khaki Shorts", brand: "Gap", price: 35, discount: 10 },
      { title: "Puma Essentials Sweat Shorts", brand: "Puma", price: 25, discount: 8 },
      { title: "Under Armour Launch Run Shorts", brand: "Under Armour", price: 32, discount: 10 },
      { title: "Zara Bermuda Denim Shorts", brand: "Zara", price: 30, discount: 10 },
      { title: "Calvin Klein Logo Swim Shorts", brand: "Calvin Klein", price: 42, discount: 15 },
      { title: "Carhartt Rigby Dungaree Shorts", brand: "Carhartt", price: 38, discount: 5 },
      { title: "Diesel Drawstring Logo Shorts", brand: "Diesel", price: 55, discount: 15 },
      { title: "Lacoste Sport Tennis Shorts", brand: "Lacoste", price: 48, discount: 10 },
      { title: "J.Crew Dock Shorts in Stretch Chino", brand: "J.Crew", price: 40, discount: 10 },
      { title: "American Eagle Flex Twill Shorts", brand: "American Eagle", price: 30, discount: 15 },
      { title: "Banana Republic Core Temp Shorts", brand: "Banana Republic", price: 42, discount: 10 },
    ],
    "Men",
    "Shorts",
    "men_shorts"
  );

  // ── Men > Jackets (15) ─────────────────────────────────────────────────────
  add(
    [
      { title: "Levi's Trucker Denim Jacket", brand: "Levi's", price: 90, discount: 20 },
      { title: "Nike Windrunner Jacket", brand: "Nike", price: 110, discount: 15 },
      { title: "Zara Faux Leather Biker Jacket", brand: "Zara", price: 130, discount: 10 },
      { title: "Tommy Hilfiger Bomber Jacket", brand: "Tommy Hilfiger", price: 120, discount: 15 },
      { title: "H&M Puffer Jacket", brand: "H&M", price: 50, discount: 20 },
      { title: "Adidas Tiro Track Jacket", brand: "Adidas", price: 55, discount: 10 },
      { title: "Ralph Lauren Quilted Jacket", brand: "Ralph Lauren", price: 150, discount: 10 },
      { title: "Carhartt WIP Michigan Coat", brand: "Carhartt", price: 135, discount: 15 },
      { title: "Calvin Klein Wool Blend Overcoat", brand: "Calvin Klein", price: 180, discount: 20 },
      { title: "GAP ColdControl Puffer Jacket", brand: "Gap", price: 80, discount: 25 },
      { title: "Under Armour Storm Rain Jacket", brand: "Under Armour", price: 75, discount: 10 },
      { title: "Puma Essentials Padded Jacket", brand: "Puma", price: 65, discount: 15 },
      { title: "J.Crew Sussex Quilted Jacket", brand: "J.Crew", price: 120, discount: 15 },
      { title: "Diesel J-Shank Nylon Jacket", brand: "Diesel", price: 160, discount: 15 },
      { title: "Lacoste Lightweight Zip Jacket", brand: "Lacoste", price: 140, discount: 10 },
    ],
    "Men",
    "Jackets",
    "men_jackets"
  );

  // ── Men > Hoodies (15) ─────────────────────────────────────────────────────
  add(
    [
      { title: "Nike Club Fleece Pullover Hoodie", brand: "Nike", price: 55, discount: 10 },
      { title: "Adidas Originals Trefoil Hoodie", brand: "Adidas", price: 60, discount: 15 },
      { title: "H&M Relaxed Fit Zip-Through Hoodie", brand: "H&M", price: 30, discount: 5 },
      { title: "Tommy Hilfiger Logo Hoodie", brand: "Tommy Hilfiger", price: 75, discount: 10 },
      { title: "Calvin Klein Performance Hoodie", brand: "Calvin Klein", price: 65, discount: 15 },
      { title: "Puma Essentials Big Logo Hoodie", brand: "Puma", price: 45, discount: 10 },
      { title: "GAP Arch Logo Pullover Hoodie", brand: "Gap", price: 40, discount: 20 },
      { title: "Under Armour Rival Fleece Hoodie", brand: "Under Armour", price: 50, discount: 8 },
      { title: "Carhartt Midweight Hooded Sweatshirt", brand: "Carhartt", price: 55, discount: 10 },
      { title: "Levi's Relaxed Graphic Hoodie", brand: "Levi's", price: 48, discount: 15 },
      { title: "Zara Oversized Cotton Hoodie", brand: "Zara", price: 35, discount: 10 },
      { title: "American Eagle Oversized Hoodie", brand: "American Eagle", price: 42, discount: 20 },
      { title: "Ralph Lauren Double-Knit Hoodie", brand: "Ralph Lauren", price: 110, discount: 10 },
      { title: "Lacoste Sport Fleece Hoodie", brand: "Lacoste", price: 85, discount: 10 },
      { title: "Diesel S-Ginn Hood Sweatshirt", brand: "Diesel", price: 70, discount: 15 },
    ],
    "Men",
    "Hoodies",
    "men_hoodies"
  );

  // ── Men > Innerwear (15) ────────────────────────────────────────────────────
  add(
    [
      { title: "Calvin Klein Cotton Stretch Boxer Briefs 3-Pack", brand: "Calvin Klein", price: 42, discount: 10 },
      { title: "Jockey Classic Vest Pack of 3", brand: "Jockey", price: 25, discount: 15 },
      { title: "Tommy Hilfiger Cotton Trunk 3-Pack", brand: "Tommy Hilfiger", price: 38, discount: 20 },
      { title: "Under Armour Tech Mesh Boxerjock 2-Pack", brand: "Under Armour", price: 32, discount: 5 },
      { title: "Calvin Klein Microfiber Trunks 3-Pack", brand: "Calvin Klein", price: 48, discount: 10 },
      { title: "Jockey Modern Trunk 2-Pack", brand: "Jockey", price: 20, discount: 10 },
      { title: "H&M Cotton Boxers 5-Pack", brand: "H&M", price: 22, discount: 5 },
      { title: "Puma Basic Boxer Shorts 2-Pack", brand: "Puma", price: 18, discount: 10 },
      { title: "Adidas Active Flex Cotton Trunk 3-Pack", brand: "Adidas", price: 30, discount: 15 },
      { title: "Ralph Lauren Classic Fit Boxers 3-Pack", brand: "Ralph Lauren", price: 40, discount: 10 },
      { title: "Nike Everyday Cotton Briefs 3-Pack", brand: "Nike", price: 28, discount: 5 },
      { title: "Jockey Cotton Round Neck Vest 3-Pack", brand: "Jockey", price: 22, discount: 10 },
      { title: "Levi's Cotton Stretch Boxer 2-Pack", brand: "Levi's", price: 22, discount: 10 },
      { title: "GAP Cotton Knit Boxers 3-Pack", brand: "Gap", price: 25, discount: 8 },
      { title: "Diesel UMBX Boxer Trunk 3-Pack", brand: "Diesel", price: 38, discount: 10 },
    ],
    "Men",
    "Innerwear",
    "men_innerwear"
  );

  // ── Men > Sleepwear (10) ────────────────────────────────────────────────────
  add(
    [
      { title: "Calvin Klein Cotton Pyjama Set", brand: "Calvin Klein", price: 55, discount: 15 },
      { title: "H&M Flannel Lounge Pants", brand: "H&M", price: 22, discount: 10 },
      { title: "Tommy Hilfiger Woven Pyjama Set", brand: "Tommy Hilfiger", price: 45, discount: 8 },
      { title: "Ralph Lauren Plaid Pyjama Set", brand: "Ralph Lauren", price: 75, discount: 10 },
      { title: "GAP Cotton Pyjama Pants", brand: "Gap", price: 28, discount: 15 },
      { title: "Nike Dri-FIT Lounge Pants", brand: "Nike", price: 40, discount: 10 },
      { title: "H&M Jersey Sleep Set", brand: "H&M", price: 18, discount: 5 },
      { title: "Jockey Cotton Pyjama Bottom", brand: "Jockey", price: 20, discount: 10 },
      { title: "Adidas Essentials Lounge Pants", brand: "Adidas", price: 35, discount: 15 },
      { title: "Calvin Klein Modal Lounge Set", brand: "Calvin Klein", price: 48, discount: 10 },
      { title: "Levi's Soft Knit Sleep Pants", brand: "Levi's", price: 32, discount: 10 },
      { title: "Puma Comfort Fleece Lounge Set", brand: "Puma", price: 42, discount: 15 },
      { title: "Under Armour Recovery Sleepwear Pants", brand: "Under Armour", price: 50, discount: 10 },
      { title: "Banana Republic Modal Sleep Set", brand: "Banana Republic", price: 55, discount: 15 },
      { title: "Zara Satin Finish Pyjama Set", brand: "Zara", price: 38, discount: 10 },
    ],
    "Men",
    "Sleepwear",
    "men_sleepwear"
  );

  // ── Men > Ethnic Wear (15) ────────────────────────────────────────────────
  add(
    [
      { title: "Manyavar Embroidered Kurta Pyjama Set", brand: "Manyavar", price: 85, discount: 15 },
      { title: "Manyavar Jacquard Nehru Jacket", brand: "Manyavar", price: 65, discount: 10 },
      { title: "Manyavar Silk Sherwani", brand: "Manyavar", price: 150, discount: 10 },
      { title: "H&M Cotton Mandarin Collar Kurta", brand: "H&M", price: 28, discount: 5 },
      { title: "Manyavar Brocade Kurta with Jacket", brand: "Manyavar", price: 110, discount: 15 },
      { title: "Zara Linen Band Collar Kurta", brand: "Zara", price: 40, discount: 10 },
      { title: "Manyavar Cotton Pathani Suit", brand: "Manyavar", price: 55, discount: 20 },
      { title: "Ralph Lauren Cotton Kurta Shirt", brand: "Ralph Lauren", price: 60, discount: 10 },
      { title: "Manyavar Dhoti Kurta Set", brand: "Manyavar", price: 75, discount: 15 },
      { title: "Tommy Hilfiger Short Kurta", brand: "Tommy Hilfiger", price: 48, discount: 10 },
      { title: "Manyavar Jodhpuri Suit", brand: "Manyavar", price: 130, discount: 10 },
      { title: "Manyavar Printed Linen Kurta", brand: "Manyavar", price: 48, discount: 15 },
      { title: "Levi's Indo-Western Shirt Kurta", brand: "Levi's", price: 45, discount: 15 },
      { title: "GAP Linen Blend Kurta", brand: "Gap", price: 38, discount: 10 },
      { title: "Manyavar Festive Achkan Set", brand: "Manyavar", price: 120, discount: 10 },
    ],
    "Men",
    "Ethnic Wear",
    "men_ethnic"
  );

  // ═══════════════════════════════════════════════════════════════════════════════
  //  W O M E N  (13 subcategories, ~17 each = ~220)
  // ═══════════════════════════════════════════════════════════════════════════════

  // ── Women > Top (16) ────────────────────────────────────────────────────────
  add(
    [
      { title: "Zara Cropped Peplum Top", brand: "Zara", price: 32, discount: 10 },
      { title: "H&M Ribbed Tank Top", brand: "H&M", price: 12, discount: 5 },
      { title: "Forever 21 Off-Shoulder Crop Top", brand: "Forever 21", price: 18, discount: 15 },
      { title: "Zara Satin Camisole Top", brand: "Zara", price: 28, discount: 10 },
      { title: "GAP Cotton V-Neck Top", brand: "GAP", price: 22, discount: 5 },
      { title: "H&M Linen Blend Blouse", brand: "H&M", price: 25, discount: 20 },
      { title: "Tommy Hilfiger Striped Polo Top", brand: "Tommy Hilfiger", price: 45, discount: 10 },
      { title: "Guess Logo Bodysuit Top", brand: "Guess", price: 38, discount: 15 },
      { title: "Nike Dri-FIT Running Tank", brand: "Nike", price: 30, discount: 8 },
      { title: "Adidas Trefoil Crop Top", brand: "Adidas", price: 28, discount: 10 },
      { title: "Puma Essential Logo Tank", brand: "Puma", price: 20, discount: 5 },
      { title: "Zara Asymmetric Draped Top", brand: "Zara", price: 35, discount: 10 },
      { title: "Calvin Klein Rib Knit Top", brand: "Calvin Klein", price: 42, discount: 10 },
      { title: "Marks & Spencer Lace Trim Cami", brand: "Marks & Spencer", price: 22, discount: 8 },
      { title: "Levi's Perfect Tee Crop", brand: "Levi's", price: 28, discount: 10 },
      { title: "Biba Embroidered Cotton Top", brand: "Biba", price: 25, discount: 15 },
    ],
    "Women",
    "Top",
    "women_top",
    ["XS", "S", "M", "L", "XL"]
  );

  // ── Women > T-Shirts (12) ──────────────────────────────────────────────────
  add(
    [
      { title: "Nike Essential Crew T-Shirt", brand: "Nike", price: 28, discount: 10 },
      { title: "Adidas 3-Stripe Classic Tee", brand: "Adidas", price: 25, discount: 8 },
      { title: "H&M Oversized Graphic Tee", brand: "H&M", price: 15, discount: 10 },
      { title: "Zara Cropped Printed Tee", brand: "Zara", price: 22, discount: 15 },
      { title: "GAP Logo Crew Neck T-Shirt", brand: "GAP", price: 20, discount: 5 },
      { title: "Tommy Hilfiger Flag Tee", brand: "Tommy Hilfiger", price: 35, discount: 10 },
      { title: "Puma Essentials Logo Tee", brand: "Puma", price: 22, discount: 5 },
      { title: "Forever 21 Tie-Dye T-Shirt", brand: "Forever 21", price: 14, discount: 20 },
      { title: "Levi's Perfect Tee", brand: "Levi's", price: 25, discount: 10 },
      { title: "Ralph Lauren Cotton Jersey Tee", brand: "Ralph Lauren", price: 45, discount: 5 },
      { title: "Calvin Klein Logo T-Shirt", brand: "Calvin Klein", price: 30, discount: 10 },
      { title: "Guess Triangle Logo Tee", brand: "Guess", price: 28, discount: 15 },
      { title: "Under Armour Tech Twist Tee", brand: "Under Armour", price: 28, discount: 10 },
      { title: "Marks & Spencer Cotton Crew Tee", brand: "Marks & Spencer", price: 18, discount: 8 },
      { title: "Biba Embroidered Graphic Tee", brand: "Biba", price: 22, discount: 10 },
      { title: "H&M Cropped Rib-Knit Tee", brand: "H&M", price: 12, discount: 5 },
      { title: "Zara Striped Boxy T-Shirt", brand: "Zara", price: 20, discount: 10 },
    ],
    "Women",
    "T-Shirts",
    "women_tshirts",
    ["XS", "S", "M", "L", "XL"]
  );

  // ── Women > Shirts (15) ────────────────────────────────────────────────────
  add(
    [
      { title: "Zara Oversized Linen Shirt", brand: "Zara", price: 42, discount: 15 },
      { title: "H&M Oxford Button-Down Shirt", brand: "H&M", price: 25, discount: 10 },
      { title: "Ralph Lauren Classic Fit Shirt", brand: "Ralph Lauren", price: 80, discount: 10 },
      { title: "GAP Denim Shirt", brand: "GAP", price: 38, discount: 20 },
      { title: "Tommy Hilfiger Striped Shirt", brand: "Tommy Hilfiger", price: 55, discount: 10 },
      { title: "Levi's Western Shirt", brand: "Levi's", price: 48, discount: 15 },
      { title: "Forever 21 Satin Button Shirt", brand: "Forever 21", price: 22, discount: 5 },
      { title: "Marks & Spencer Pure Cotton Shirt", brand: "Marks & Spencer", price: 35, discount: 10 },
      { title: "Calvin Klein Relaxed Shirt", brand: "Calvin Klein", price: 55, discount: 10 },
      { title: "Guess Denim Shirt", brand: "Guess", price: 48, discount: 15 },
      { title: "Biba Cotton Embroidered Shirt", brand: "Biba", price: 30, discount: 10 },
      { title: "Nike Sportswear Essential Woven Shirt", brand: "Nike", price: 45, discount: 8 },
      { title: "Adidas Trefoil Button-Down Shirt", brand: "Adidas", price: 40, discount: 10 },
      { title: "Puma Classics Cropped Shirt", brand: "Puma", price: 35, discount: 15 },
      { title: "Under Armour Threadborne Shirt", brand: "Under Armour", price: 42, discount: 10 },
    ],
    "Women",
    "Shirts",
    "women_shirts",
    ["XS", "S", "M", "L", "XL"]
  );

  // ── Women > Jeans (14) ─────────────────────────────────────────────────────
  add(
    [
      { title: "Levi's 501 Original Fit Jeans", brand: "Levi's", price: 70, discount: 15 },
      { title: "Zara High-Waist Skinny Jeans", brand: "Zara", price: 40, discount: 10 },
      { title: "H&M Mom Jeans", brand: "H&M", price: 30, discount: 20 },
      { title: "GAP High Rise True Skinny Jeans", brand: "GAP", price: 55, discount: 10 },
      { title: "Wrangler Bootcut Jeans", brand: "Wrangler", price: 45, discount: 15 },
      { title: "Tommy Hilfiger Straight Leg Jeans", brand: "Tommy Hilfiger", price: 65, discount: 10 },
      { title: "Forever 21 Distressed Boyfriend Jeans", brand: "Forever 21", price: 28, discount: 25 },
      { title: "Guess Sexy Curve Skinny Jeans", brand: "Guess", price: 75, discount: 10 },
      { title: "Ralph Lauren Wide Leg Jeans", brand: "Ralph Lauren", price: 90, discount: 5 },
      { title: "H&M Straight High Jeans", brand: "H&M", price: 32, discount: 8 },
      { title: "Calvin Klein High Rise Skinny Jeans", brand: "Calvin Klein", price: 78, discount: 15 },
      { title: "Marks & Spencer Straight Leg Jeans", brand: "Marks & Spencer", price: 42, discount: 10 },
      { title: "Levi's 721 High Rise Skinny", brand: "Levi's", price: 68, discount: 10 },
      { title: "Adidas Denim Joggers", brand: "Adidas", price: 55, discount: 10 },
    ],
    "Women",
    "Jeans",
    "women_jeans",
    ["XS", "S", "M", "L", "XL"]
  );

  // ── Women > Kurti (10) ─────────────────────────────────────────────────────
  add(
    [
      { title: "Biba Printed Cotton Straight Kurti", brand: "Biba", price: 28, discount: 20 },
      { title: "Anita Dongre Embroidered A-Line Kurti", brand: "Anita Dongre", price: 65, discount: 10 },
      { title: "Biba Chanderi Silk Kurti", brand: "Biba", price: 45, discount: 15 },
      { title: "Anita Dongre Floral Block Print Kurti", brand: "Anita Dongre", price: 55, discount: 15 },
      { title: "Biba Cotton Palazzo Kurti Set", brand: "Biba", price: 50, discount: 25 },
      { title: "Zara Bohemian Print Tunic Kurti", brand: "Zara", price: 38, discount: 10 },
      { title: "GAP Embroidered Cotton Kurti", brand: "GAP", price: 30, discount: 5 },
      { title: "H&M Printed Cotton Kurta", brand: "H&M", price: 22, discount: 10 },
      { title: "Biba Georgette Anarkali Kurti", brand: "Biba", price: 48, discount: 20 },
      { title: "Anita Dongre Silk Blend Kurti", brand: "Anita Dongre", price: 72, discount: 10 },
      { title: "W For Woman Printed Straight Kurti", brand: "W", price: 35, discount: 15 },
      { title: "Aurelia Cotton Pintuck Kurti", brand: "Aurelia", price: 28, discount: 10 },
      { title: "Global Desi Floral A-Line Kurti", brand: "Global Desi", price: 42, discount: 20 },
      { title: "Biba Rayon Layered Kurti", brand: "Biba", price: 38, discount: 15 },
      { title: "Anita Dongre Mirror Embellished Kurti", brand: "Anita Dongre", price: 68, discount: 10 },
      { title: "Marks & Spencer Cotton Printed Tunic", brand: "Marks & Spencer", price: 32, discount: 10 },
    ],
    "Women",
    "Kurti",
    "women_kurti",
    ["S", "M", "L", "XL", "XXL"]
  );

  // ── Women > Bra (20) ───────────────────────────────────────────────────────
  add(
    [
      { title: "Victoria's Secret Lace Push-Up Bra", brand: "Victoria's Secret", price: 49, discount: 15 },
      { title: "Calvin Klein Modern Cotton Bralette", brand: "Calvin Klein", price: 35, discount: 10 },
      { title: "Clovia Padded Non-Wired T-Shirt Bra", brand: "Clovia", price: 22, discount: 20 },
      { title: "Zivame Lace Underwire Balconette Bra", brand: "Zivame", price: 28, discount: 25 },
      { title: "Marks & Spencer Cotton Full Coverage Bra", brand: "Marks & Spencer", price: 32, discount: 10 },
      { title: "Victoria's Secret Strapless Multiway Bra", brand: "Victoria's Secret", price: 52, discount: 10 },
      { title: "Clovia Sports Bra High Impact", brand: "Clovia", price: 20, discount: 15 },
      { title: "La Senza Plunge Push-Up Bra", brand: "La Senza", price: 42, discount: 20 },
      { title: "Calvin Klein Lightly Lined Demi Bra", brand: "Calvin Klein", price: 40, discount: 10 },
      { title: "Zivame Padded Wired Minimizer Bra", brand: "Zivame", price: 30, discount: 15 },
      { title: "Marks & Spencer Plunge Strapless Bra", brand: "Marks & Spencer", price: 35, discount: 10 },
      { title: "Clovia Cotton Non-Padded Full Cup Bra", brand: "Clovia", price: 18, discount: 20 },
      { title: "Nike Swoosh Medium Support Sports Bra", brand: "Nike", price: 35, discount: 5 },
      { title: "Adidas Don't Rest Alphaskin Bra", brand: "Adidas", price: 30, discount: 10 },
      { title: "Victoria's Secret Wireless Comfort Bra", brand: "Victoria's Secret", price: 38, discount: 5 },
      { title: "H&M Lace Padded Bra", brand: "H&M", price: 18, discount: 10 },
      { title: "Forever 21 Push-Up Bra", brand: "Forever 21", price: 15, discount: 8 },
      { title: "Puma Training Mid Impact Bra", brand: "Puma", price: 28, discount: 10 },
      { title: "Clovia Multiway Strapless Bra", brand: "Clovia", price: 24, discount: 15 },
      { title: "La Senza Beyond Sexy Push-Up Bra", brand: "La Senza", price: 46, discount: 15 },
    ],
    "Women",
    "Bra",
    "women_bra",
    ["XS", "S", "M", "L", "XL"]
  );

  // ── Women > Panty (16) ─────────────────────────────────────────────────────
  add(
    [
      { title: "Calvin Klein Bikini Brief Pack of 3", brand: "Calvin Klein", price: 38, discount: 10 },
      { title: "Clovia Cotton Hipster Panties Set of 5", brand: "Clovia", price: 25, discount: 30 },
      { title: "Zivame Seamless Thong 3-Pack", brand: "Zivame", price: 20, discount: 15 },
      { title: "Victoria's Secret Lace Cheeky Panty", brand: "Victoria's Secret", price: 18, discount: 5 },
      { title: "Marks & Spencer Cotton High Leg Briefs 5-Pack", brand: "Marks & Spencer", price: 28, discount: 10 },
      { title: "La Senza Lace Trim Bikini 3-Pack", brand: "La Senza", price: 22, discount: 15 },
      { title: "Calvin Klein Cotton Stretch Boyshort", brand: "Calvin Klein", price: 15, discount: 5 },
      { title: "Clovia Mid-Waist Printed Briefs Set of 3", brand: "Clovia", price: 18, discount: 20 },
      { title: "Zivame No-Show Laser Cut Briefs 3-Pack", brand: "Zivame", price: 22, discount: 10 },
      { title: "Victoria's Secret Cotton Logo Briefs 5-Pack", brand: "Victoria's Secret", price: 35, discount: 15 },
      { title: "H&M Cotton Hipster Briefs 7-Pack", brand: "H&M", price: 20, discount: 5 },
      { title: "Marks & Spencer Flexifit Midi Knickers 5-Pack", brand: "Marks & Spencer", price: 30, discount: 10 },
      { title: "Tommy Hilfiger Logo Bikini 3-Pack", brand: "Tommy Hilfiger", price: 28, discount: 8 },
      { title: "Nike Pro Compression Shorts", brand: "Nike", price: 30, discount: 10 },
      { title: "GAP Breathe Hipster 3-Pack", brand: "GAP", price: 22, discount: 10 },
      { title: "Puma Cotton Stretch Bikini 3-Pack", brand: "Puma", price: 18, discount: 5 },
    ],
    "Women",
    "Panty",
    "women_panty",
    ["XS", "S", "M", "L", "XL"]
  );

  // ── Women > Lingerie (15) ──────────────────────────────────────────────────
  add(
    [
      { title: "La Senza Lace Bodysuit", brand: "La Senza", price: 55, discount: 20 },
      { title: "Victoria's Secret Satin Slip Dress", brand: "Victoria's Secret", price: 62, discount: 15 },
      { title: "Clovia Lace Babydoll with Matching Thong", brand: "Clovia", price: 30, discount: 25 },
      { title: "Zivame Satin Camisole Set", brand: "Zivame", price: 35, discount: 10 },
      { title: "Calvin Klein Lace Trim Chemise", brand: "Calvin Klein", price: 48, discount: 15 },
      { title: "La Senza Satin & Lace Teddy", brand: "La Senza", price: 50, discount: 10 },
      { title: "Victoria's Secret Mesh Corset Top", brand: "Victoria's Secret", price: 68, discount: 20 },
      { title: "Clovia Sheer Lace Romper", brand: "Clovia", price: 28, discount: 15 },
      { title: "Marks & Spencer Satin Shorts Set", brand: "Marks & Spencer", price: 40, discount: 10 },
      { title: "Zivame Lace Bustier with Garter", brand: "Zivame", price: 42, discount: 20 },
      { title: "H&M Lace Trim Chemise", brand: "H&M", price: 22, discount: 10 },
      { title: "Forever 21 Satin Cami Set", brand: "Forever 21", price: 18, discount: 15 },
      { title: "Victoria's Secret Lace Garter Belt", brand: "Victoria's Secret", price: 35, discount: 5 },
      { title: "Clovia Bridal Lace Set", brand: "Clovia", price: 38, discount: 15 },
      { title: "La Senza Sheer Mesh Bodysuit", brand: "La Senza", price: 48, discount: 20 },
    ],
    "Women",
    "Lingerie",
    "women_lingerie",
    ["XS", "S", "M", "L"]
  );

  // ── Women > Night Dress (15) ───────────────────────────────────────────────
  add(
    [
      { title: "Marks & Spencer Satin Long Nightgown", brand: "Marks & Spencer", price: 45, discount: 15 },
      { title: "Clovia Cotton Printed Pyjama Set", brand: "Clovia", price: 28, discount: 20 },
      { title: "H&M Jersey Nightdress", brand: "H&M", price: 22, discount: 10 },
      { title: "Zivame Satin Robe and Nightslip Set", brand: "Zivame", price: 50, discount: 15 },
      { title: "Victoria's Secret Flannel Pyjama Set", brand: "Victoria's Secret", price: 55, discount: 10 },
      { title: "Calvin Klein Modal Sleep Shirt", brand: "Calvin Klein", price: 42, discount: 10 },
      { title: "Clovia Printed Capri & Top Night Set", brand: "Clovia", price: 25, discount: 25 },
      { title: "Marks & Spencer Cotton Short Nightdress", brand: "Marks & Spencer", price: 28, discount: 10 },
      { title: "La Senza Satin Wrap Robe", brand: "La Senza", price: 48, discount: 15 },
      { title: "H&M Oversized Sleep T-Shirt", brand: "H&M", price: 15, discount: 5 },
      { title: "Zivame Cotton Printed Night Suit", brand: "Zivame", price: 32, discount: 20 },
      { title: "Victoria's Secret Modal Pyjama Set", brand: "Victoria's Secret", price: 60, discount: 10 },
      { title: "GAP Modal Pyjama Set", brand: "GAP", price: 35, discount: 10 },
      { title: "Tommy Hilfiger Cotton Nightshirt", brand: "Tommy Hilfiger", price: 42, discount: 15 },
      { title: "Forever 21 Tie-Dye Sleep Set", brand: "Forever 21", price: 18, discount: 8 },
    ],
    "Women",
    "Night Dress",
    "women_nightdress",
    ["XS", "S", "M", "L", "XL"]
  );

  // ── Women > Leggings (14) ──────────────────────────────────────────────────
  add(
    [
      { title: "Nike Dri-FIT High-Waisted Leggings", brand: "Nike", price: 55, discount: 15 },
      { title: "Adidas 3-Stripe High Rise Leggings", brand: "Adidas", price: 40, discount: 20 },
      { title: "Puma Essentials Logo Leggings", brand: "Puma", price: 30, discount: 10 },
      { title: "H&M Shaping High Waist Leggings", brand: "H&M", price: 22, discount: 5 },
      { title: "Zara Faux Leather Leggings", brand: "Zara", price: 35, discount: 15 },
      { title: "Forever 21 Seamless Active Leggings", brand: "Forever 21", price: 18, discount: 10 },
      { title: "Nike One Luxe Mid-Rise Leggings", brand: "Nike", price: 60, discount: 10 },
      { title: "Adidas Believe This 2.0 Tights", brand: "Adidas", price: 45, discount: 15 },
      { title: "GAP High Rise Ponte Leggings", brand: "GAP", price: 35, discount: 10 },
      { title: "Levi's Mile High Pull-On Leggings", brand: "Levi's", price: 50, discount: 20 },
      { title: "Tommy Hilfiger Sport Leggings", brand: "Tommy Hilfiger", price: 48, discount: 10 },
      { title: "Calvin Klein Performance Tights", brand: "Calvin Klein", price: 55, discount: 15 },
      { title: "Marks & Spencer Cotton Rich Leggings", brand: "Marks & Spencer", price: 18, discount: 5 },
      { title: "Guess Active Logo Leggings", brand: "Guess", price: 45, discount: 15 },
    ],
    "Women",
    "Leggings",
    "women_leggings",
    ["XS", "S", "M", "L", "XL"]
  );

  // ── Women > Skirts (14) ────────────────────────────────────────────────────
  add(
    [
      { title: "Zara Pleated Midi Skirt", brand: "Zara", price: 45, discount: 10 },
      { title: "H&M Denim Mini Skirt", brand: "H&M", price: 25, discount: 15 },
      { title: "Forever 21 Floral Wrap Skirt", brand: "Forever 21", price: 22, discount: 20 },
      { title: "GAP Khaki A-Line Skirt", brand: "GAP", price: 35, discount: 10 },
      { title: "Zara Satin Midi Skirt", brand: "Zara", price: 42, discount: 8 },
      { title: "H&M Pencil Skirt", brand: "H&M", price: 20, discount: 10 },
      { title: "Tommy Hilfiger Chino Skirt", brand: "Tommy Hilfiger", price: 55, discount: 15 },
      { title: "Levi's Denim Button-Front Skirt", brand: "Levi's", price: 48, discount: 10 },
      { title: "Ralph Lauren Pleated Tennis Skirt", brand: "Ralph Lauren", price: 65, discount: 10 },
      { title: "Forever 21 Tiered Maxi Skirt", brand: "Forever 21", price: 28, discount: 25 },
      { title: "Calvin Klein Pencil Midi Skirt", brand: "Calvin Klein", price: 65, discount: 10 },
      { title: "Adidas Originals 3-Stripe Skirt", brand: "Adidas", price: 35, discount: 8 },
      { title: "Marks & Spencer Checked Mini Skirt", brand: "Marks & Spencer", price: 30, discount: 15 },
      { title: "Biba Printed Ethnic Skirt", brand: "Biba", price: 32, discount: 10 },
    ],
    "Women",
    "Skirts",
    "women_skirts",
    ["XS", "S", "M", "L", "XL"]
  );

  // ── Women > Dresses (16) ───────────────────────────────────────────────────
  add(
    [
      { title: "Forever 21 Floral Wrap Dress", brand: "Forever 21", price: 35, discount: 20 },
      { title: "Zara Satin Slip Maxi Dress", brand: "Zara", price: 65, discount: 10 },
      { title: "H&M Ribbed Bodycon Dress", brand: "H&M", price: 20, discount: 5 },
      { title: "GAP Fit & Flare Midi Dress", brand: "GAP", price: 48, discount: 15 },
      { title: "Tommy Hilfiger Polo Shirt Dress", brand: "Tommy Hilfiger", price: 75, discount: 10 },
      { title: "Guess Bandage Bodycon Dress", brand: "Guess", price: 80, discount: 20 },
      { title: "Zara Linen Blend Shirt Dress", brand: "Zara", price: 55, discount: 10 },
      { title: "H&M Jersey Wrap Dress", brand: "H&M", price: 28, discount: 10 },
      { title: "Ralph Lauren Striped Cotton Dress", brand: "Ralph Lauren", price: 120, discount: 15 },
      { title: "Forever 21 Smocked Tiered Mini Dress", brand: "Forever 21", price: 25, discount: 10 },
      { title: "Nike Sportswear Essential Dress", brand: "Nike", price: 40, discount: 5 },
      { title: "Zara Blazer Dress", brand: "Zara", price: 70, discount: 10 },
      { title: "Marks & Spencer Fit & Flare Dress", brand: "Marks & Spencer", price: 55, discount: 15 },
      { title: "Levi's Denim Shirt Dress", brand: "Levi's", price: 68, discount: 10 },
      { title: "Calvin Klein Midi Sheath Dress", brand: "Calvin Klein", price: 90, discount: 15 },
      { title: "Biba Printed Anarkali Dress", brand: "Biba", price: 42, discount: 15 },
    ],
    "Women",
    "Dresses",
    "women_dresses",
    ["XS", "S", "M", "L", "XL"]
  );

  // ── Women > Ethnic Wear (10) ───────────────────────────────────────────────
  add(
    [
      { title: "Sabyasachi Embroidered Anarkali Suit", brand: "Sabyasachi", price: 120, discount: 10 },
      { title: "Biba Printed Cotton Palazzo Suit", brand: "Biba", price: 45, discount: 25 },
      { title: "Anita Dongre Gota Patti Sharara Set", brand: "Anita Dongre", price: 95, discount: 10 },
      { title: "Biba Mirror Work Lehenga Choli", brand: "Biba", price: 65, discount: 20 },
      { title: "Sabyasachi Silk Saree", brand: "Sabyasachi", price: 150, discount: 5 },
      { title: "Anita Dongre Printed Jacket Kurta Set", brand: "Anita Dongre", price: 80, discount: 15 },
      { title: "Biba Bandhani Dupatta Set", brand: "Biba", price: 40, discount: 20 },
      { title: "Zara Indo-Western Fusion Dress", brand: "Zara", price: 55, discount: 10 },
      { title: "Sabyasachi Embroidered Lehenga", brand: "Sabyasachi", price: 180, discount: 10 },
      { title: "Anita Dongre Chanderi Suit Set", brand: "Anita Dongre", price: 85, discount: 15 },
      { title: "W For Woman Block Print Palazzo Set", brand: "W", price: 55, discount: 15 },
      { title: "Aurelia Festive Silk Kurta Set", brand: "Aurelia", price: 62, discount: 10 },
      { title: "Global Desi Embroidered Maxi Dress", brand: "Global Desi", price: 48, discount: 20 },
      { title: "Biba Georgette Saree with Blouse", brand: "Biba", price: 75, discount: 15 },
      { title: "Sabyasachi Banarasi Silk Dupatta Set", brand: "Sabyasachi", price: 140, discount: 10 },
    ],
    "Women",
    "Ethnic Wear",
    "women_ethnic",
    ["S", "M", "L", "XL"]
  );

  // ═══════════════════════════════════════════════════════════════════════════════
  //  K I D S  (8 subcategories, ~12 each = ~96)
  // ═══════════════════════════════════════════════════════════════════════════════

  // ── Kids > Shirts (10) ─────────────────────────────────────────────────────
  add(
    [
      { title: "GAP Kids Oxford Shirt", brand: "GAP Kids", price: 25, discount: 10 },
      { title: "H&M Kids Cotton Shirt", brand: "H&M Kids", price: 15, discount: 5 },
      { title: "Tommy Hilfiger Kids Button-Down Shirt", brand: "Tommy Hilfiger Kids", price: 35, discount: 15 },
      { title: "Polo Ralph Lauren Kids Oxford Shirt", brand: "Polo Ralph Lauren Kids", price: 45, discount: 10 },
      { title: "Carter's Plaid Flannel Shirt", brand: "Carter's", price: 18, discount: 10 },
      { title: "Old Navy Kids Linen Blend Shirt", brand: "Old Navy Kids", price: 16, discount: 5 },
      { title: "United Colors of Benetton Kids Shirt", brand: "United Colors of Benetton", price: 22, discount: 10 },
      { title: "H&M Kids Denim Shirt", brand: "H&M Kids", price: 18, discount: 15 },
      { title: "GAP Kids Poplin Shirt", brand: "GAP Kids", price: 22, discount: 10 },
      { title: "Mothercare Cotton Check Shirt", brand: "Mothercare", price: 20, discount: 10 },
      { title: "Nike Kids Woven Button-Up Shirt", brand: "Nike Kids", price: 28, discount: 10 },
      { title: "Levi's Kids Western Denim Shirt", brand: "Levi's Kids", price: 32, discount: 15 },
      { title: "Adidas Kids Team Polo Shirt", brand: "Adidas", price: 25, discount: 10 },
      { title: "Disney Kids Character Print Shirt", brand: "Disney", price: 18, discount: 5 },
      { title: "Puma Kids Essential Polo Shirt", brand: "Puma Kids", price: 22, discount: 8 },
    ],
    "Kids",
    "Shirts",
    "kids_shirts"
  );

  // ── Kids > T-Shirts (20) ───────────────────────────────────────────────────
  add(
    [
      { title: "Nike Kids Sportswear Tee", brand: "Nike Kids", price: 18, discount: 5 },
      { title: "Adidas Kids Logo Print T-Shirt", brand: "Adidas", price: 20, discount: 10 },
      { title: "H&M Kids 5-Pack Cotton Tees", brand: "H&M Kids", price: 22, discount: 15 },
      { title: "Puma Kids Essential Logo Tee", brand: "Puma Kids", price: 15, discount: 5 },
      { title: "GAP Kids Graphic T-Shirt", brand: "GAP Kids", price: 14, discount: 10 },
      { title: "Disney Marvel Superhero Tee", brand: "Disney", price: 16, discount: 5 },
      { title: "Carter's Dinosaur Print Tee", brand: "Carter's", price: 10, discount: 5 },
      { title: "Old Navy Kids Every Day Tee 3-Pack", brand: "Old Navy Kids", price: 15, discount: 10 },
      { title: "Tommy Hilfiger Kids Flag Tee", brand: "Tommy Hilfiger Kids", price: 25, discount: 10 },
      { title: "Levi's Kids Batwing Logo Tee", brand: "Levi's Kids", price: 18, discount: 5 },
      { title: "United Colors of Benetton Kids Tee", brand: "United Colors of Benetton", price: 14, discount: 10 },
      { title: "Mothercare Fun Graphic Tee 2-Pack", brand: "Mothercare", price: 12, discount: 5 },
      { title: "Disney Frozen Glitter Print Tee", brand: "Disney", price: 14, discount: 10 },
      { title: "H&M Kids Oversized Printed Tee", brand: "H&M Kids", price: 10, discount: 5 },
      { title: "Polo Ralph Lauren Kids Crew Tee", brand: "Polo Ralph Lauren Kids", price: 28, discount: 10 },
      { title: "Nike Kids Jordan Jumpman Tee", brand: "Nike Kids", price: 22, discount: 5 },
      { title: "Disney Star Wars Graphic Tee", brand: "Disney", price: 15, discount: 8 },
      { title: "Carter's Striped Pocket Tee", brand: "Carter's", price: 10, discount: 10 },
      { title: "GAP Kids Tie-Dye Tee", brand: "GAP Kids", price: 16, discount: 5 },
      { title: "Adidas Kids Camo Print Tee", brand: "Adidas", price: 18, discount: 10 },
    ],
    "Kids",
    "T-Shirts",
    "kids_tshirts"
  );

  // ── Kids > Jeans (14) ──────────────────────────────────────────────────────
  add(
    [
      { title: "Levi's Kids 511 Slim Fit Jeans", brand: "Levi's Kids", price: 35, discount: 15 },
      { title: "H&M Kids Skinny Fit Jeans", brand: "H&M Kids", price: 18, discount: 5 },
      { title: "GAP Kids Slim Jeans with Stretch", brand: "GAP Kids", price: 28, discount: 10 },
      { title: "Old Navy Kids Straight Jeans", brand: "Old Navy Kids", price: 20, discount: 10 },
      { title: "Carter's Pull-On Denim Jeans", brand: "Carter's", price: 15, discount: 5 },
      { title: "Tommy Hilfiger Kids Scanton Slim Jeans", brand: "Tommy Hilfiger Kids", price: 40, discount: 15 },
      { title: "Adidas Kids Denim Jogger Jeans", brand: "Adidas", price: 28, discount: 10 },
      { title: "H&M Kids Mom Fit Jeans", brand: "H&M Kids", price: 20, discount: 10 },
      { title: "Puma Kids Denim Pants", brand: "Puma Kids", price: 25, discount: 5 },
      { title: "United Colors of Benetton Kids Slim Jeans", brand: "United Colors of Benetton", price: 22, discount: 10 },
      { title: "Nike Kids Denim Jogger", brand: "Nike Kids", price: 28, discount: 10 },
      { title: "Mothercare Slim Fit Jeans", brand: "Mothercare", price: 18, discount: 10 },
      { title: "Polo Ralph Lauren Kids Skinny Jeans", brand: "Polo Ralph Lauren Kids", price: 42, discount: 15 },
      { title: "Disney Kids Embroidered Jeans", brand: "Disney", price: 22, discount: 5 },
    ],
    "Kids",
    "Jeans",
    "kids_jeans"
  );

  // ── Kids > Shorts (14) ─────────────────────────────────────────────────────
  add(
    [
      { title: "Nike Kids Dri-FIT Shorts", brand: "Nike Kids", price: 22, discount: 10 },
      { title: "H&M Kids Cotton Cargo Shorts", brand: "H&M Kids", price: 15, discount: 5 },
      { title: "Adidas Kids 3-Stripe Sport Shorts", brand: "Adidas", price: 20, discount: 15 },
      { title: "GAP Kids Pull-On Shorts", brand: "GAP Kids", price: 16, discount: 10 },
      { title: "Carter's Easy Pull-On Dock Shorts", brand: "Carter's", price: 12, discount: 5 },
      { title: "Puma Kids Jersey Shorts", brand: "Puma Kids", price: 18, discount: 10 },
      { title: "Old Navy Kids Twill Shorts", brand: "Old Navy Kids", price: 14, discount: 5 },
      { title: "Tommy Hilfiger Kids Chino Shorts", brand: "Tommy Hilfiger Kids", price: 28, discount: 15 },
      { title: "Mothercare Cotton Shorts 2-Pack", brand: "Mothercare", price: 16, discount: 10 },
      { title: "United Colors of Benetton Kids Shorts", brand: "United Colors of Benetton", price: 18, discount: 5 },
      { title: "Levi's Kids Denim Shorts", brand: "Levi's Kids", price: 22, discount: 10 },
      { title: "Disney Cars Print Shorts", brand: "Disney", price: 12, discount: 5 },
      { title: "Polo Ralph Lauren Kids Chino Shorts", brand: "Polo Ralph Lauren Kids", price: 35, discount: 10 },
      { title: "Nike Kids Pro Training Shorts", brand: "Nike Kids", price: 20, discount: 5 },
    ],
    "Kids",
    "Shorts",
    "kids_shorts"
  );

  // ── Kids > Dresses (16) ────────────────────────────────────────────────────
  add(
    [
      { title: "Carter's Floral Sundress", brand: "Carter's", price: 22, discount: 10 },
      { title: "H&M Kids Tulle Party Dress", brand: "H&M Kids", price: 28, discount: 15 },
      { title: "Disney Princess Print Dress", brand: "Disney", price: 25, discount: 5 },
      { title: "GAP Kids Tiered Dress", brand: "GAP Kids", price: 30, discount: 10 },
      { title: "Old Navy Kids Fit & Flare Dress", brand: "Old Navy Kids", price: 18, discount: 10 },
      { title: "Tommy Hilfiger Kids Polo Dress", brand: "Tommy Hilfiger Kids", price: 38, discount: 15 },
      { title: "Mothercare Floral Cotton Dress", brand: "Mothercare", price: 20, discount: 5 },
      { title: "Disney Minnie Mouse Dress", brand: "Disney", price: 22, discount: 10 },
      { title: "H&M Kids Jersey Dress 2-Pack", brand: "H&M Kids", price: 18, discount: 5 },
      { title: "United Colors of Benetton Kids Dress", brand: "United Colors of Benetton", price: 24, discount: 10 },
      { title: "Carter's Embroidered Chambray Dress", brand: "Carter's", price: 25, discount: 15 },
      { title: "Polo Ralph Lauren Kids Cotton Dress", brand: "Polo Ralph Lauren Kids", price: 50, discount: 10 },
      { title: "Disney Encanto Print Dress", brand: "Disney", price: 20, discount: 10 },
      { title: "Puma Kids Jersey Dress", brand: "Puma Kids", price: 22, discount: 15 },
      { title: "Old Navy Kids Ruffle Hem Dress", brand: "Old Navy Kids", price: 16, discount: 5 },
      { title: "Adidas Kids Track Dress", brand: "Adidas", price: 28, discount: 8 },
    ],
    "Kids",
    "Dresses",
    "kids_dresses"
  );

  // ── Kids > Sleepwear (12) ──────────────────────────────────────────────────
  add(
    [
      { title: "Carter's Dinosaur Pyjama Set", brand: "Carter's", price: 20, discount: 10 },
      { title: "GAP Kids Unicorn Nightgown", brand: "GAP Kids", price: 18, discount: 5 },
      { title: "H&M Kids Fleece Onesie", brand: "H&M Kids", price: 25, discount: 15 },
      { title: "Disney Frozen Pyjama Set", brand: "Disney", price: 20, discount: 10 },
      { title: "Carter's Space Print Footie Pyjamas", brand: "Carter's", price: 18, discount: 5 },
      { title: "Old Navy Kids Sleep Set 2-Pack", brand: "Old Navy Kids", price: 22, discount: 10 },
      { title: "Mothercare Star Print Pyjama Set", brand: "Mothercare", price: 16, discount: 5 },
      { title: "H&M Kids Cotton Pyjamas 2-Pack", brand: "H&M Kids", price: 20, discount: 10 },
      { title: "Disney Marvel Spider-Man Pyjamas", brand: "Disney", price: 18, discount: 5 },
      { title: "GAP Kids Bear Print Sleep Set", brand: "GAP Kids", price: 22, discount: 15 },
      { title: "Puma Kids Fleece Pyjama Set", brand: "Puma Kids", price: 25, discount: 10 },
      { title: "Carter's Rainbow Nightgown", brand: "Carter's", price: 16, discount: 5 },
      { title: "Tommy Hilfiger Kids Cotton Sleep Set", brand: "Tommy Hilfiger Kids", price: 30, discount: 10 },
      { title: "Nike Kids Therma Lounge Pants", brand: "Nike Kids", price: 28, discount: 8 },
      { title: "Levi's Kids Jersey Sleep Set", brand: "Levi's Kids", price: 22, discount: 10 },
    ],
    "Kids",
    "Sleepwear",
    "kids_sleepwear"
  );

  // ── Kids > Ethnic Wear (12) ────────────────────────────────────────────────
  add(
    [
      { title: "Mothercare Kids Kurta Pyjama Set", brand: "Mothercare", price: 30, discount: 10 },
      { title: "United Colors of Benetton Kids Lehenga Set", brand: "United Colors of Benetton", price: 35, discount: 15 },
      { title: "H&M Kids Embroidered Kurta", brand: "H&M Kids", price: 20, discount: 5 },
      { title: "Carter's Festive Salwar Set", brand: "Carter's", price: 25, discount: 10 },
      { title: "GAP Kids Printed Kurta Set", brand: "GAP Kids", price: 28, discount: 10 },
      { title: "Mothercare Silk Blend Sherwani Set", brand: "Mothercare", price: 40, discount: 15 },
      { title: "Disney Princess Lehenga Set", brand: "Disney", price: 30, discount: 5 },
      { title: "Tommy Hilfiger Kids Nehru Jacket Set", brand: "Tommy Hilfiger Kids", price: 45, discount: 10 },
      { title: "Old Navy Kids Festive Kurta", brand: "Old Navy Kids", price: 22, discount: 10 },
      { title: "United Colors of Benetton Kids Anarkali", brand: "United Colors of Benetton", price: 32, discount: 15 },
      { title: "Carter's Kids Dhoti Kurta Set", brand: "Carter's", price: 28, discount: 10 },
      { title: "H&M Kids Embroidered Kurta Set", brand: "H&M Kids", price: 22, discount: 5 },
      { title: "Nike Kids Festive Polo Kurta", brand: "Nike Kids", price: 32, discount: 10 },
      { title: "Levi's Kids Indo-Western Shirt Set", brand: "Levi's Kids", price: 35, discount: 15 },
      { title: "Adidas Kids Ethnic Print Kurta", brand: "Adidas", price: 28, discount: 10 },
      { title: "Puma Kids Festive Jacket Set", brand: "Puma Kids", price: 38, discount: 10 },
      { title: "Polo Ralph Lauren Kids Nehru Set", brand: "Polo Ralph Lauren Kids", price: 55, discount: 10 },
    ],
    "Kids",
    "Ethnic Wear",
    "kids_ethnic"
  );

  // ── Kids > Winter Wear (16) ────────────────────────────────────────────────
  add(
    [
      { title: "Nike Kids Puffer Jacket", brand: "Nike Kids", price: 65, discount: 20 },
      { title: "H&M Kids Knitted Sweater", brand: "H&M Kids", price: 20, discount: 10 },
      { title: "Puma Kids Fleece Hoodie", brand: "Puma Kids", price: 35, discount: 15 },
      { title: "Adidas Kids Padded Jacket", brand: "Adidas", price: 55, discount: 10 },
      { title: "GAP Kids ColdControl Puffer", brand: "GAP Kids", price: 48, discount: 20 },
      { title: "Carter's Fleece Lined Jacket", brand: "Carter's", price: 35, discount: 10 },
      { title: "Old Navy Kids Frost-Free Puffer Jacket", brand: "Old Navy Kids", price: 30, discount: 15 },
      { title: "Tommy Hilfiger Kids Down Jacket", brand: "Tommy Hilfiger Kids", price: 80, discount: 20 },
      { title: "Mothercare Quilted Warm Jacket", brand: "Mothercare", price: 32, discount: 10 },
      { title: "H&M Kids Faux Shearling Jacket", brand: "H&M Kids", price: 28, discount: 5 },
      { title: "United Colors of Benetton Kids Sweater", brand: "United Colors of Benetton", price: 30, discount: 10 },
      { title: "Disney Kids Character Fleece Jacket", brand: "Disney", price: 25, discount: 10 },
      { title: "Levi's Kids Denim Sherpa Jacket", brand: "Levi's Kids", price: 48, discount: 15 },
      { title: "Polo Ralph Lauren Kids Down Jacket", brand: "Polo Ralph Lauren Kids", price: 90, discount: 10 },
      { title: "Nike Kids Therma Hoodie", brand: "Nike Kids", price: 38, discount: 10 },
      { title: "Carter's Snowsuit Puffer", brand: "Carter's", price: 45, discount: 20 },
    ],
    "Kids",
    "Winter Wear",
    "kids_winter"
  );

  return products;
}

// ─── Seed runner ───────────────────────────────────────────────────────────────

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");

    // Clear existing products first
    const deleted = await ProductModel.deleteMany({});
    console.log(`Cleared ${deleted.deletedCount} existing products`);

    const products = generateProducts();
    console.log(`Generated ${products.length} products. Inserting...`);

    const result = await ProductModel.insertMany(products);
    console.log(`Successfully seeded ${result.length} products`);

    // Print category breakdown
    const breakdown = {};
    products.forEach((p) => {
      const key = `${p.category} > ${p.subcategory}`;
      breakdown[key] = (breakdown[key] || 0) + 1;
    });
    console.log("\nCategory breakdown:");
    let menTotal = 0,
      womenTotal = 0,
      kidsTotal = 0;
    Object.entries(breakdown)
      .sort()
      .forEach(([key, count]) => {
        console.log(`  ${key}: ${count}`);
        if (key.startsWith("Men")) menTotal += count;
        if (key.startsWith("Women")) womenTotal += count;
        if (key.startsWith("Kids")) kidsTotal += count;
      });
    console.log(
      `\nTotals: Men=${menTotal}, Women=${womenTotal}, Kids=${kidsTotal}, Grand Total=${products.length}`
    );

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
}

seed();
