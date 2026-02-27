// Brand data with descriptions and metadata
const brands = [
  {
    name: "Balenciaga",
    slug: "balenciaga",
    shortDescription: "Modern luxury brand known for innovative designs and the iconic City bag.",
    longDescription: `Balenciaga has become synonymous with contemporary luxury and bold design innovation. Founded in 1919, the Spanish luxury house revolutionized fashion with its avant-garde approach. The Balenciaga City bag, introduced in 2001, became an instant classic with its distinctive motorcycle-inspired silhouette and buttery-soft leather. The brand's handbag collection ranges from the structured Work bag to the playful City tote, each featuring the house's signature hardware and impeccable craftsmanship.

Renting Balenciaga bags offers access to statement pieces that define a season's trends. The City bag in various colors and sizes remains the ultimate investment piece, while newer styles like the Hourglass continue the brand's legacy of creating covetable designs. For luxury bag enthusiasts seeking contemporary elegance with an edge, Balenciaga's collection represents the perfect blend of artistic expression and wearable sophistication.`,
    iconic_bags: ["City", "Work", "Hourglass", "Metallic Edge"]
  },
  {
    name: "Bottega Veneta",
    slug: "bottega-veneta",
    shortDescription: "Italian luxury brand celebrated for signature intrecciato weaving and understated elegance.",
    longDescription: `Bottega Veneta epitomizes quiet luxury and impeccable Italian craftsmanship. Since 1966, the Venetian house has crafted bags using its signature intrecciato weaving technique—a labor-intensive method that creates the brand's unmistakable woven aesthetic. The Intrecciato Tote and Cabat are masterpieces of understated sophistication, available in the richest leathers and most coveted colorways.

The Jodie, introduced more recently, brings the same meticulous attention to detail with a contemporary silhouette that has resonated with luxury collectors worldwide. Bottega Veneta bags are investment pieces that transcend seasonal trends through their timeless design and exceptional quality. The supple leather and distinctive weave pattern make each bag instantly recognizable to those in-the-know.

Renting from Bottega Veneta's collection allows you to experience the brand's philosophy: luxury should whisper, not shout. Whether it's the structured Arco or the everyday Jodie, these bags represent the pinnacle of Italian leather goods craftsmanship.`,
    iconic_bags: ["Intrecciato Tote", "Cabat", "Jodie", "Arco"]
  },
  {
    name: "Burberry",
    slug: "burberry",
    shortDescription: "British heritage brand famous for the iconic trench coat and the check pattern.",
    longDescription: `Burberry stands as one of the most recognizable luxury brands globally, with a 169-year heritage rooted in British craftsmanship and innovation. While famous for the trench coat, the brand's handbag collection showcases the iconic Burberry check and the brand's commitment to quality. The TB bag, with its distinctive metal TB logo, has become a modern classic, while the Lola and Society bags continue the brand's legacy of combining British design sensibility with contemporary appeal.

The Burberry check—first introduced as the lining of trench coats—appears throughout the handbag collection, making these bags instantly recognizable status symbols. From the structured DK88 to the casual canvas bags, Burberry offers versatile options for the discerning luxury consumer. The brand's exploration of materials, from traditional leather to innovative nylon, ensures the collection remains fresh while honoring heritage.

Renting Burberry handbags gives access to British luxury that translates seamlessly from office to evening events, with the added benefit of rotating through seasonal styles and limited editions.`,
    iconic_bags: ["TB Bag", "Lola", "DK88", "Vintage Check"]
  },
  {
    name: "Celine",
    slug: "celine",
    shortDescription: "Parisian house renowned for minimalist aesthetic and sophisticated, timeless bags.",
    longDescription: `Céline represents the pinnacle of Parisian understated elegance and minimalist luxury. Under the creative direction of Hedi Slimane, the brand has reinforced its position as the go-to house for those seeking sophisticated, timeless handbags. The Luggage tote revolutionized luxury luggage, while the Box bag brought architectural precision to handbag design. The classic Phantom tote remains an object of desire for its impeccable proportions and versatile design.

The brand's design philosophy centers on clean lines, exceptional materials, and wearability. The Triomphe bag, with its distinctive arch logo, represents Céline's evolution while honoring its heritage. Each Céline bag is a study in refined luxury—minimal branding, maximum impact, and investment-grade quality. The color palette of Céline bags tends toward sophisticated neutrals, though the brand occasionally offers jewel tones that elevate any wardrobe.

Renting Céline bags allows you to experience Parisian luxury that never goes out of style. These are the bags carried by those who understand that true luxury doesn't shout; it whispers with absolute confidence.`,
    iconic_bags: ["Luggage", "Phantom", "Box", "Triomphe"]
  },
  {
    name: "Chanel",
    slug: "chanel",
    shortDescription: "Iconic French fashion house legendary for the Classic Flap and timeless designs.",
    longDescription: `Chanel stands as the most iconic luxury brand in the world, with a handbag heritage that shapes the entire luxury accessories industry. The Classic Flap Bag, introduced in 1955 as the 2.55, revolutionized handbag design by introducing the shoulder strap and interlocking CC lock that remain status symbols today. With its quilted leather and perfect proportions, the Classic Flap has become the most counterfeited bag globally—a testament to its iconic status.

Beyond the Classic Flap, the Chanel Boy bag brings a more modern aesthetic while maintaining the house's design language. The 2.55, the original design by Coco Chanel herself, appeals to purists seeking vintage luxury. The Caviar leather option offers durability, while the more delicate Lambskin leather remains a luxury statement. Chanel bags are not merely accessories; they are heirlooms that appreciate in value.

The Grand Shopping Tote, the Camera bag, and seasonal styles round out a collection that covers every occasion. Renting Chanel handbags grants access to pieces of fashion history and investment-grade luxury that define the very concept of timeless elegance and sophistication.`,
    iconic_bags: ["Classic Flap", "2.55", "Boy", "Grand Shopping Tote"]
  },
  {
    name: "Chloe",
    slug: "chloe",
    shortDescription: "French brand celebrated for romantic sensibility and the iconic Drew and Susanna bags.",
    longDescription: `Chloé embodies Parisian romanticism and accessible luxury, offering sophisticated handbags that balance elegance with a modern sensibility. The Drew bag, introduced in 2014, quickly became a modern classic with its unique ring handle and perfectly proportioned silhouette. The Susanna bag, with its scalloped metal detailing, showcases the brand's signature style—a blend of delicate femininity and confident sophistication.

The Faye bag, with its metal rings and suede detailing, appeals to those seeking vintage-inspired luxury. Chloé's color palette tends toward romantic hues—dusty rose, soft cream, and deep burgundy—making these bags perfect for those who appreciate subtle luxury with personality. The Woody and Marcie bags continue the brand's tradition of creating covetable designs that feel fresh season after season.

Chloé represents French luxury that doesn't take itself too seriously while maintaining impeccable standards. The brand attracts those seeking bags with genuine design heritage, distinctive silhouettes, and the kind of quality that ensures longevity. Renting Chloé allows you to experiment with seasonal colors and styles while investing in pieces that retain their appeal year after year.`,
    iconic_bags: ["Drew", "Susanna", "Faye", "Marcie"]
  },
  {
    name: "Christian Louboutin",
    slug: "christian-louboutin",
    shortDescription: "Luxury brand famous for the iconic red sole and haute couture-inspired handbag designs.",
    longDescription: `Christian Louboutin revolutionized luxury footwear with the iconic red sole, and the brand's handbag collection extends this signature luxury aesthetic to leather goods. While renowned for shoes, Louboutin's bags feature the same architectural precision and dramatic design sensibility that made the pumps famous. The Credilok tote and Riviera bag showcase the brand's haute couture approach to handbag design, with structured silhouettes and meticulous hardware.

The Louboutin bag collection merges haute couture elegance with the brand's unmistakable theatrical sensibility. The distinctive red sole appears on select bags, while others feature the brand's elaborate hardware and precisely crafted leather. Each bag feels like a miniature sculpture—wearable art that makes a statement. Colors often lean toward classic blacks, deep burgundies, and dramatic reds that complement the red sole aesthetic.

Renting Christian Louboutin bags grants access to luxury that feels exclusive and design-forward. These bags appeal to those seeking distinctive pieces with heritage, craftsmanship, and the confidence that comes with carrying one of fashion's most recognizable luxury brands.`,
    iconic_bags: ["Credilok", "Riviera", "Pyraclou", "Sweety"]
  },
  {
    name: "Coach",
    slug: "coach",
    shortDescription: "American luxury brand offering heritage leather goods and contemporary accessible luxury.",
    longDescription: `Coach occupies a unique space in luxury—accessible without compromising on craftsmanship or design heritage. Founded in 1941 in New York, Coach invented the bonded leather technique that revolutionized handbag durability. Today, the brand balances its heritage with contemporary design, offering a diverse range of styles for various occasions and lifestyles.

The Pillow Tabby and Rogue bags represent Coach's modern aesthetic, while the legacy styles like the Tate and the Field appeal to those seeking classic luxury. The brand's leather quality and attention to hardware details elevate Coach bags beyond their price point. Coach offers exceptional versatility—from structured satchels to soft leather hobo bags, from canvas weekend totes to sophisticated evening clutches.

What distinguishes Coach is the brand's commitment to American leather craftsmanship combined with innovative design. The Tabby collection, with its quilted leather and sculptural hardware, has attracted luxury consumers seeking contemporary style. Renting Coach bags offers tremendous value and versatility, allowing you to explore the brand's extensive range while enjoying authentic American luxury craftsmanship.`,
    iconic_bags: ["Tabby", "Rogue", "Tate", "Field"]
  },
  {
    name: "Dior",
    slug: "dior",
    shortDescription: "French powerhouse known for elegant designs and the iconic Lady and Saddle bags.",
    longDescription: `Christian Dior established French luxury with the "New Look" silhouette, and the brand's handbag heritage reflects this commitment to timeless elegance. The Book tote, with its iconic "Dior" embroidery, has become a modern status symbol, while the Lady Dior remains the most coveted Dior bag, with its quilted leather and charms that dangle elegantly from the handles. The classic Saddle bag brings a contemporary edge to the Dior aesthetic, while the Caro collection represents the brand's modern direction.

The Book tote's popularity stems from its practical design combined with Dior's prestigious branding—it's a bag that works for everyday luxury as well as statement-making. The quilted leather signature, the impeccable proportions, and the sophisticated hardware elevate Dior bags to investment status. Colors range from timeless black and white to seasonal pastels and jewel tones.

Renting Dior handbags grants access to French haute couture heritage and contemporary design excellence. These are bags carried by those who understand that Dior represents the very essence of luxury—refined, elegant, and eternally sophisticated.`,
    iconic_bags: ["Lady Dior", "Saddle", "Book Tote", "Caro"]
  },
  {
    name: "Dolce & Gabbana",
    slug: "dolce-gabbana",
    shortDescription: "Italian luxury duo famous for baroque sensibility and richly detailed handbag designs.",
    longDescription: `Dolce & Gabbana represents Italian maximalism and baroque luxury—every detail matters, every embellishment tells a story. The Sicily bag, inspired by Italian design heritage, has become iconic with its structured silhouette and substantial presence. The Devotion and Dauphine bags showcase the brand's ability to infuse modern sensibility with ornate detailing that never feels excessive.

The brand's handbag philosophy embraces bold colors, rich textures, and distinctive hardware. Dolce & Gabbana bags often feature signature gold hardware, ornate locks, and perfectly chosen details that make them instantly recognizable. The Sicily leather is supple and beautiful, while the hardware commands attention—these are bags that celebrate luxury with confidence and joy.

From the everyday DG Amore tote to the evening Devotion clutch, the collection offers versatility within a consistent design language. The brand's commitment to Italian craftsmanship ensures each bag is meticulously constructed. Renting Dolce & Gabbana bags allows you to embrace confident luxury and experiment with bold colors and rich textures that might not fit a minimalist wardrobe.`,
    iconic_bags: ["Sicily", "Devotion", "Dauphine", "DG Amore"]
  },
  {
    name: "Fendi",
    slug: "fendi",
    shortDescription: "Roman luxury house renowned for the Zucca monogram and iconic Baguette bag.",
    longDescription: `Fendi represents Roman luxury and artisanal excellence, with a handbag heritage spanning decades of iconic designs. The Baguette bag, introduced in 1997, redefined luxury small bags and launched a thousand imitators—its compact size, distinctive F clasp, and perfect proportions made it instantly coveted. The Peekaboo bag revolutionized structured handbag design with its architectural precision and innovative closure mechanism. The Zucca monogram, created by Karl Lagerfeld during his tenure at the house, appears throughout the collection as a symbol of Fendi luxury.

The brand's leather goods showcase exceptional craftsmanship—from the supple leather to the precise stitching to the elegant hardware. The Runaway and Cam bags represent Fendi's modern direction, while the double F logo appears on bags ranging from canvas to the finest leathers. The color palette leans toward sophisticated neutrals, though Fendi regularly introduces seasonal colorways that feel fresh and contemporary.

Renting Fendi bags grants access to Roman luxury and innovation. These bags appeal to collectors seeking design heritage, exceptional construction, and the timeless appeal of Italian craftsmanship refined through decades of expertise.`,
    iconic_bags: ["Baguette", "Peekaboo", "Zucca", "Runaway"]
  },
  {
    name: "Ferragamo",
    slug: "ferragamo",
    shortDescription: "Italian heritage brand known for exceptional leather work and sophisticated elegance.",
    longDescription: `Salvatore Ferragamo revolutionized footwear with innovative design and exceptional craftsmanship, and the brand's handbag collection reflects this same commitment to quality and wearability. The Vara bow, originally designed for shoes, appears on handbags as a signature detail that's both elegant and recognizable. The Gancio logo, representing the brand's iconic horse bit, appears throughout the collection as a mark of Ferragamo heritage and excellence.

The Fiamma bag and the Studio bag showcase the brand's contemporary approach while honoring the Ferragamo legacy. These bags emphasize clean lines, exceptional leather, and functional design—Ferragamo bags are made to be worn and loved, not merely displayed. The color palette tends toward classic neutrals with occasional seasonal jewel tones that complement the sophisticated design aesthetic.

Ferragamo represents the Italian commitment to craftsmanship and timeless design. The brand attracts discerning consumers seeking bags with genuine heritage, excellent construction, and the kind of quiet luxury that only decades of expertise can deliver. Renting Ferragamo handbags offers access to Italian excellence at every price point in the luxury market.`,
    iconic_bags: ["Vara", "Fiamma", "Studio", "Gancio"]
  },
  {
    name: "Givenchy",
    slug: "givenchy",
    shortDescription: "French luxury house celebrated for sophisticated minimalism and the iconic Antigona bag.",
    longDescription: `Givenchy, founded by Hubert de Givenchy, represents understated French elegance and sophisticated minimalism. The Antigona bag, with its sharp angles and architectural precision, has become a modern classic that appears on runways and red carpets alike. The Nightingale, with its structured silhouette and substantial presence, offers a different take on luxury—powerful and confident. The Pandora bag brings a more relaxed aesthetic while maintaining the house's commitment to impeccable construction.

The brand's handbag design philosophy emphasizes clean lines, exceptional proportions, and quality materials. The geometric precision of Givenchy bags sets them apart in a luxury market often dominated by ornate designs. The hardware is elegant without being showy, and the leather quality is consistently excellent. Colors range from classic blacks and navies to seasonal pastels and jewel tones.

Renting Givenchy handbags grants access to French luxury that rewards those who appreciate subtle sophistication. These bags appeal to collectors who understand that Givenchy's design language—refined, precise, and eternally elegant—represents the pinnacle of modern luxury handbag design.`,
    iconic_bags: ["Antigona", "Nightingale", "Pandora", "Lucrezia"]
  },
  {
    name: "Goyard",
    slug: "goyard",
    shortDescription: "Ultra-luxury French house famous for the iconic canvas trunk and St. Louis tote.",
    longDescription: `Goyard represents the ultimate in understated luxury and heritage craftsmanship. The brand, family-owned and deliberately mysterious, has created the St. Louis tote—arguably the most coveted luxury tote in the world. Made from Goyard's signature canvas (the exact composition remains a closely guarded secret), the St. Louis tote has become a status symbol for those in-the-know. The bag's durability and timeless design have made it a luxury investment that appreciates in value.

The Goyard canvas features the brand's distinctive interlocking pattern, created through a labor-intensive hand-assembly process. The brand deliberately eschews marketing, relying instead on word-of-mouth and the bags' own merit to build desire. The Goyard tote, available in various sizes and color options, remains the brand's flagship. The leather pieces, including the Matignon bag, showcase the same commitment to quality and understated luxury.

Goyard operates more like a luxury secret society than a conventional fashion house. The brand attracts those seeking authentic luxury without logos, genuine craftsmanship without marketing noise. Renting Goyard bags offers access to the most coveted and exclusive luxury totes—investments in heritage and understated elegance.`,
    iconic_bags: ["St. Louis Tote", "Matignon", "Alpin", "Saïgon"]
  },
  {
    name: "Gucci",
    slug: "gucci",
    shortDescription: "Italian luxury powerhouse known for the GG monogram and iconic designs like the Marmont.",
    longDescription: `Gucci, one of the world's oldest and most recognized luxury houses, has reinvented itself repeatedly while maintaining a connection to its iconic heritage. The GG monogram, created in the 1950s, remains one of the most recognizable patterns in fashion and appears throughout the handbag collection. The Marmont bag, with its distinctive curved lines and matelassé quilt, has become a modern classic since its introduction. The Dionysus bag, featuring the brand's signature tiger head closure, represents Gucci's theatrical approach to luxury.

Under recent creative direction, Gucci has balanced heritage with innovation, creating bags that feel both timeless and contemporary. The Bamboo bag, the Kelly-inspired style, and the Soho disco bag offer variety across price points and occasions. The brand's approach to color and material is fearless—from traditional leather to innovative canvas prints, from classic blacks to bold statement colors. Gucci bags celebrate confidence and luxury without pretense.

Renting Gucci handbags grants access to Italian luxury that ranges from quiet sophistication to bold statements. These bags appeal to those seeking heritage with personality—Gucci represents luxury that's willing to take risks and have fun while maintaining the highest standards of quality.`,
    iconic_bags: ["Marmont", "Dionysus", "Bamboo", "Soho Disco"]
  },
  {
    name: "Hermès",
    slug: "hermes",
    shortDescription: "Ultra-luxury French house renowned for the Birkin and Kelly bags—the most coveted in the world.",
    longDescription: `Hermès represents the pinnacle of luxury craftsmanship and heritage. Founded in 1837 as a saddle maker, the house's commitment to exceptional materials and artisanal excellence remains unmatched. The Birkin bag, created in 1984, stands as the most coveted and recognizable luxury handbag globally. Its timeless design, supple leather, and distinctive hardware have made it a status symbol and investment piece—Birkins actually appreciate in value over time.

The Kelly bag, named after Grace Kelly who famously carried it, is equally iconic with its structured silhouette and elegant closure. The Constance bag offers a smaller, more refined option, while the Evelyne represents casual luxury. What distinguishes Hermès is the obsessive attention to detail: every stitch is hand-applied, every leather is sourced meticulously, and the craftsmanship is uncompromising. The color and leather options at Hermès are extraordinary—from classic neutrals to exotic animal skins, from delicate silk-lined interiors to the most durable leather.

The Hermès waiting list mythology has only enhanced the brand's allure. These bags are not merely purchased; they're accumulated over years as Hermès customers develop relationships with their preferred boutique. Renting Hermès handbags grants access to the most coveted luxury bags in the world—investment pieces that represent the absolute pinnacle of luxury.`,
    iconic_bags: ["Birkin", "Kelly", "Constance", "Evelyne"]
  },
  {
    name: "Loewe",
    slug: "loewe",
    shortDescription: "Spanish luxury house celebrated for leather craft and the iconic Puzzle and Hammock bags.",
    longDescription: `Loewe stands as a testament to Spanish leather craftsmanship and contemporary design innovation. With a heritage dating back to 1846, the house has consistently positioned itself as the luxury brand for those who appreciate genuine craftsmanship over branding. The Puzzle bag, a masterpiece of geometric design, has become an icon of modern luxury with its innovative interlocking construction. The Hammock bag brings a relaxed elegance, while the Gate bag showcases the brand's contemporary aesthetic.

The brand's approach to leather is reverent—Loewe works with the finest materials and emphasizes the natural beauty of leather over embellishment. The minimalist approach to branding (the Loewe anagram appears subtly, if at all) appeals to luxury consumers seeking authenticity. The color palette leans toward warm, sophisticated neutrals with occasional bold accent colors. The bag construction showcases Spanish craftsmanship at its finest—clean seams, perfect proportions, and exceptional durability.

Loewe attracts discerning luxury consumers who value substance over symbols. The brand represents modern luxury that respects heritage while pushing boundaries. Renting Loewe bags grants access to Spanish craftsmanship and design innovation—bags that feel equally at home on a minimalist wardrobe or paired with high fashion pieces.`,
    iconic_bags: ["Puzzle", "Hammock", "Gate", "Vertical"]
  },
  {
    name: "Louis Vuitton",
    slug: "louis-vuitton",
    shortDescription: "Iconic French luxury house famous for the monogram canvas and designs like the Neverfull.",
    longDescription: `Louis Vuitton stands as the world's most valuable luxury brand, with a handbag heritage that extends back to 1854. The LV monogram canvas, created in 1896, revolutionized luxury by introducing recognizable branding and has become the most imitated pattern globally. The Speedy bag, introduced in 1933, remains timeless; the Neverfull tote, introduced in 2007, became an instant essential for luxury consumers seeking the perfect everyday bag.

The collection encompasses virtually every style imaginable: from the structured Capucines with its distinctive LV twist lock to the playful Alma and the elegant Pont-Neuf clutch. The Monogram canvas offers the iconic look, while the Monogram Vernis leather line adds color and sophistication. The brand's leather goods showcase exceptional craftsmanship—from the perfect proportions to the signature LV hardware to the impeccable lining details.

Louis Vuitton bags are not merely fashion statements; they're luxury investments that retain value and often appreciate. The brand's innovations in materials, colors, and designs keep the collection feeling fresh while maintaining the iconic LV signature. Renting Louis Vuitton bags grants access to the world's most recognizable luxury brand—perfect for those seeking iconic style, exceptional quality, and the unmistakable prestige of LV.`,
    iconic_bags: ["Neverfull", "Speedy", "Alma", "Capucines"]
  },
  {
    name: "MCM",
    slug: "mcm",
    shortDescription: "German luxury brand known for the iconic cognac visetos monogram and heritage craftsmanship.",
    longDescription: `MCM (Mode Creation Munich) represents German precision and luxury heritage, though the brand was originally founded in Munich before expanding globally. The iconic cognac visetos monogram, featuring the MCM pattern on leather, has become the brand's signature and appears throughout the handbag collection. The Toni line and the Mode Visetos bags showcase the brand's distinctive aesthetic. The Stark backpack series brought contemporary appeal while honoring MCM heritage.

MCM bags balance old-world craftsmanship with modern design sensibility. The brand's leather quality is exceptional, and the hardware is substantial and beautifully designed. The cognac color of the visetos leather creates warmth and sophistication, making MCM bags distinctive in a luxury market. The collection ranges from the iconic structured styles to more relaxed contemporary designs. The brand appeals to those seeking luxury with personality—MCM is confident without being ostentatious.

What distinguishes MCM is the brand's commitment to craftsmanship details: precise stitching, quality hardware, and durable materials that ensure longevity. Renting MCM bags offers access to German-inspired luxury craftsmanship and distinctive design—bags that work equally well for business and leisure.`,
    iconic_bags: ["Visetos", "Toni", "Stark", "Klara"]
  },
  {
    name: "Prada",
    slug: "prada",
    shortDescription: "Italian luxury house celebrated for minimalism and iconic bags like the Saffiano leather styles.",
    longDescription: `Prada represents refined Italian luxury and intellectual minimalism. The brand's approach to handbags emphasizes clean lines, exceptional materials, and timeless design. The Saffiano leather, with its distinctive crosshatch texture, has become iconic and appears throughout the collection. The Galleria bag showcases Prada's ability to create the perfect two-handle satchel, while the Cahier bag brings a structured, architectural approach to luxury handbags.

The brand's commitment to minimalism means Prada bags often feature subtle branding—the triangular Prada logo appears on a small metal plate, making the design speak for itself. The color palette tends toward sophisticated neutrals with occasional bold seasonal colors. The hardware is elegant and understated, and the leather quality is consistently exceptional. From the structured Panier to the relaxed Nylon bags, Prada offers versatility without compromising sophistication.

Prada attracts luxury consumers who appreciate intellectual design and genuine craftsmanship. The brand represents Italian luxury that doesn't shout; it whispers with absolute confidence. The Prada nylon bags, in particular, have become contemporary classics that blur the line between high fashion and ready-to-wear. Renting Prada bags grants access to minimalist luxury and iconic Italian design heritage.`,
    iconic_bags: ["Galleria", "Cahier", "Panier", "Nylon Re-Edition"]
  },
  {
    name: "Saint Laurent",
    slug: "saint-laurent",
    shortDescription: "French luxury house known for elegant designs and the iconic Muse and Kate bags.",
    longDescription: `Saint Laurent represents Parisian sophistication and contemporary luxury design. The brand, particularly under the creative direction of Anthony Vaccarello, has created a handbag collection that balances heritage with modern sensibility. The Muse bag showcases the brand's ability to create a perfectly proportioned tote, while the Kate bag, with its distinctive Y-shaped interlocking lock, has become iconic. The Sac de Jour offers professional luxury, while the Toy collection brings playful elegance.

The brand's design philosophy emphasizes clean silhouettes, exceptional leather, and distinctive hardware that marks Saint Laurent pieces as special. The YSL monogram appears subtly on leather hardware rather than as an all-over pattern, maintaining the brand's commitment to understated luxury. The color palette ranges from classic blacks and navies to jewel tones and seasonal pastels. The leather quality is consistently exceptional, whether it's supple leather or textured options.

Saint Laurent attracts luxury consumers seeking contemporary elegance with depth and heritage. The brand represents Parisian luxury that's willing to be bold while maintaining impeccable taste. Renting Saint Laurent bags grants access to French luxury design and the kind of bags that make a statement through their presence rather than their logo.`,
    iconic_bags: ["Kate", "Muse", "Sac de Jour", "Toy"]
  },
  {
    name: "Valentino",
    slug: "valentino",
    shortDescription: "Italian luxury house famous for romantic elegance and the iconic Rockstud hardware.",
    longDescription: `Valentino represents Italian romance and dramatic luxury. The Rockstud detail, introduced by Pier Paolo Piccioli, has become the brand's signature and appears throughout the handbag collection as distinctive pyramid studs that make Valentino bags instantly recognizable. The Rockstud Spike handbag, the Rockstud Hobo, and various other styles showcase the brand's ability to create luxe designs with personality. The Garavani line offers more classic styles, while contemporary pieces balance elegance with edge.

The brand's approach to color is fearless—from traditional blacks to bold reds, from dusty pastels to rich jewel tones. The leather quality is exceptional, and the hardware (particularly the signature Rockstud) is distinctive and beautifully crafted. From structured satchels to relaxed hobo bags, the collection offers versatility within a consistent design language that feels both powerful and feminine.

Valentino attracts luxury consumers seeking bags with personality and confidence. The brand celebrates the beauty of craftsmanship combined with bold design choices. Renting Valentino bags grants access to Italian luxury that's willing to make a statement—perfect for those who appreciate romantic elegance with an edge.`,
    iconic_bags: ["Rockstud Spike", "Rockstud Hobo", "Garavani", "Free Rockstud"]
  }
];

// Helper function to get brand by slug
function getBrandBySlug(slug) {
  return brands.find(brand => brand.slug === slug);
}

// Helper function to get all brand slugs
function getAllBrandSlugs() {
  return brands.map(brand => brand.slug);
}

// Helper function to get all brands
function getAllBrands() {
  return brands;
}

module.exports = {
  brands,
  getBrandBySlug,
  getAllBrandSlugs,
  getAllBrands
};
