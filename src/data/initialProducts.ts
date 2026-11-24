import { Product } from '../types/store';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Manta Aconchego em Crochê Artesanal',
    slug: 'manta-aconchego-croche',
    category: 'croche',
    categoryName: 'Crochê',
    price: 289.90,
    originalPrice: 329.90,
    stock: 6,
    rating: 4.9,
    reviewCount: 38,
    description: 'Manta confeccionada manualmente em ponto relevo com fio de algodão nobre 100% ecológico. Toque incrivelmente macio, aquecimento aconchegante e acabamento em franjas delicadas. Perfeita para sofás, poltronas e pés de cama.',
    materials: 'Fio de algodão premium 100% sustentável e hipoalergênico.',
    dimensions: '140 cm x 110 cm (comprimento x largura)',
    careInstructions: 'Lavar à mão com sabão neutro, não torcer, secar na horizontal à sombra.',
    images: [
      'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    isNew: false,
    createdAt: '2026-01-10T10:00:00Z'
  },
  {
    id: 'prod-2',
    name: 'Sousplat Belli Fio de Algodão (Kit 4 peças)',
    slug: 'sousplat-belli-algodao-kit-4',
    category: 'croche',
    categoryName: 'Crochê',
    price: 149.90,
    stock: 12,
    rating: 5.0,
    reviewCount: 24,
    description: 'Jogo americano sousplat artesanal trabalhado com acabamento rendado e bordas estruturadas. Valoriza sua mesa posta para momentos inesquecíveis em família.',
    materials: 'Fio de barbante especial ecológico 85% algodão.',
    dimensions: '38 cm de diâmetro cada unidade.',
    careInstructions: 'Pode ser lavado à mão com esponja suave. Passar a ferro brando.',
    images: [
      'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=800&q=80'
    ],
    featured: false,
    isNew: true,
    createdAt: '2026-02-01T12:00:00Z'
  },
  {
    id: 'prod-3',
    name: 'Ursinho Theo em Amigurumi Hipoalergênico',
    slug: 'ursinho-theo-amigurumi',
    category: 'amigurumi',
    categoryName: 'Amigurumi',
    price: 139.00,
    originalPrice: 159.00,
    stock: 8,
    rating: 5.0,
    reviewCount: 42,
    description: 'Amigurumi exclusivo tecido ponto a ponto em crochê delicado. Olhinhos com trava de segurança de alta precisão e enchimento em fibra siliconada antialérgica. Um companheiro para a vida inteira.',
    materials: 'Fio 100% algodão mercerizado, fibra de poliéster siliconada antialérgica.',
    dimensions: '26 cm de altura (sentado: 19 cm).',
    careInstructions: 'Higienização suave com pano úmido ou lavagem manual rápida.',
    images: [
      'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    isNew: false,
    createdAt: '2026-01-15T09:30:00Z'
  },
  {
    id: 'prod-4',
    name: 'Coelhinha Nina com Vestidinho de Renda',
    slug: 'coelhinha-nina-amigurumi',
    category: 'amigurumi',
    categoryName: 'Amigurumi',
    price: 169.90,
    stock: 5,
    rating: 4.8,
    reviewCount: 19,
    description: 'Coelhinha artesanal com tiara de flores secas e vestidinho removível em tom rosa antigo. Ideal para ensaios fotográficos de bebês, maternidade ou decoração de quarto infantil.',
    materials: 'Fio de algodão penteado, detalhes em linho e renda.',
    dimensions: '32 cm de altura.',
    careInstructions: 'Lavar à mão com sabão suave para peças delicadas.',
    images: [
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80'
    ],
    featured: false,
    isNew: true,
    createdAt: '2026-02-12T14:10:00Z'
  },
  {
    id: 'prod-5',
    name: 'Buquê Eterno de Flores Artesanais Belli',
    slug: 'buque-eterno-flores-croche',
    category: 'buques',
    categoryName: 'Buquês Artesanais',
    price: 198.00,
    originalPrice: 220.00,
    stock: 7,
    rating: 5.0,
    reviewCount: 56,
    description: 'Arranjo floral permanente composto por tulipas, margaridas e lavandas tecidas à mão em crochê com acabamento em papel kraft rústico e fita de cetim rosa queimado. Nunca murcha, expressando afeto eterno.',
    materials: 'Hastes metálicas encapadas, fios de algodão nobre e papel kraft importado.',
    dimensions: '35 cm de altura x 24 cm de largura.',
    careInstructions: 'Apenas espanador macio para remoção de poeira. Manter longe de umidade.',
    images: [
      'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    isNew: true,
    createdAt: '2026-02-18T16:00:00Z'
  },
  {
    id: 'prod-6',
    name: 'Buquê Botânico Flores Secas & Lavanda',
    slug: 'buque-botanico-flores-secas',
    category: 'buques',
    categoryName: 'Buquês Artesanais',
    price: 125.00,
    stock: 14,
    rating: 4.9,
    reviewCount: 31,
    description: 'Composição perfumada de flores secas desidratadas naturalmente, galhos de eucalipto e lavanda silvestre. Traz o frescor e a estética rústica chic com aroma relaxante natural.',
    materials: 'Flores naturais desidratadas, fita de algodão cru.',
    dimensions: '30 cm x 18 cm.',
    careInstructions: 'Não molhar. Evitar exposição solar direta prolongada.',
    images: [
      'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80'
    ],
    featured: false,
    isNew: false,
    createdAt: '2026-01-20T11:00:00Z'
  },
  {
    id: 'prod-7',
    name: 'Painel de Parede Macramê Terracota & Rosé',
    slug: 'painel-macrame-parede-terracota',
    category: 'macrame',
    categoryName: 'Macramê',
    price: 249.00,
    originalPrice: 289.00,
    stock: 4,
    rating: 5.0,
    reviewCount: 27,
    description: 'Obra de arte têxtil produzida com galho natural de reflorestamento tratado e cordão 100% algodão cru com nós duplos e folhas estruturadas nos tons da paleta Belli.',
    materials: 'Cordão 4mm de algodão sustentável, galho natural resinado.',
    dimensions: '65 cm de largura x 80 cm de comprimento.',
    careInstructions: 'Limpar com espanador. Pentear as franjas delicadamente com pente fino.',
    images: [
      'https://images.unsplash.com/photo-1582582494705-f8ce0b0c24f0?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    isNew: false,
    createdAt: '2026-01-05T08:00:00Z'
  },
  {
    id: 'prod-8',
    name: 'Suporte Suspenso de Plantas em Macramê',
    slug: 'suporte-suspenso-macrame-plantas',
    category: 'macrame',
    categoryName: 'Macramê',
    price: 68.00,
    stock: 15,
    rating: 4.9,
    reviewCount: 44,
    description: 'Hanger tradicional para vasos de cerâmica ou vidro. Design geométrico resistente que suporta vasos de até 22 cm de diâmetro e peso até 4 kg.',
    materials: 'Cordão trançado de algodão cru e argola de madeira maciça.',
    dimensions: '95 cm de comprimento total.',
    careInstructions: 'Lavável à mão quando necessário.',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80'
    ],
    featured: false,
    isNew: false,
    createdAt: '2026-01-18T15:20:00Z'
  },
  {
    id: 'prod-9',
    name: 'Vela Aromática Vanilla Bourbon & Flor de Algodão',
    slug: 'vela-aromatica-vanilla-bourbon',
    category: 'velas',
    categoryName: 'Velas Aromáticas',
    price: 79.90,
    stock: 20,
    rating: 5.0,
    reviewCount: 68,
    description: 'Vela artesanal vertida à mão em pote de vidro âmbar com tampa de madeira. Cera vegetal de coco 100% livre de parafina, pavio de madeira crepitante e essências premium de alta fixação olfativa.',
    materials: 'Cera vegetal de coco, palma e arroz, pavio de madeira, essência de perfumaria fina.',
    dimensions: 'Pote 200g (aproximadamente 36 horas de queima limpa).',
    careInstructions: 'Na primeira queima, deixe formar piscina completa. Apare o pavio antes de reacender.',
    images: [
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    isNew: true,
    createdAt: '2026-02-10T17:00:00Z'
  },
  {
    id: 'prod-10',
    name: 'Vela Artesanal Botânica Flores Prensadas & Lavanda',
    slug: 'vela-botanica-flores-lavanda',
    category: 'velas',
    categoryName: 'Velas Aromáticas',
    price: 89.00,
    originalPrice: 99.00,
    stock: 11,
    rating: 4.8,
    reviewCount: 35,
    description: 'Vela decorativa com pétalas de rosas desidratadas visíveis nas paredes externas transparentes. Aroma suave e calmante de lavanda francesa para momentos de autocuidado.',
    materials: 'Cera de soja e coco, flores botânicas desidratadas, pavio 100% algodão.',
    dimensions: 'Cilindro 180g (28 horas de queima).',
    careInstructions: 'Não queimar por mais de 3 horas consecutivas.',
    images: [
      'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80'
    ],
    featured: false,
    isNew: false,
    createdAt: '2026-01-28T13:00:00Z'
  },
  {
    id: 'prod-11',
    name: 'Bandeja Oval em Concreto & Resina Marmorizada',
    slug: 'bandeja-concreto-resina-marmorizada',
    category: 'decoracao',
    categoryName: 'Decoração',
    price: 84.90,
    stock: 9,
    rating: 4.9,
    reviewCount: 22,
    description: 'Peça de design contemporâneo fundida em cimento branco especial com pigmentos rosa queimado e acabamento impermeabilizado acetinado. Apoio perfeito para joias, perfumes ou velas.',
    materials: 'Cimento arquitetônico nobre com resina ecológica selante.',
    dimensions: '18 cm x 9,5 cm x 1,8 cm.',
    careInstructions: 'Limpar com pano macio e úmido. Não usar produtos químicos abrasivos.',
    images: [
      'https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&w=800&q=80'
    ],
    featured: false,
    isNew: true,
    createdAt: '2026-02-05T10:00:00Z'
  },
  {
    id: 'prod-12',
    name: 'Espelho Boho com Moldura em Macramê Solar',
    slug: 'espelho-boho-moldura-macrame',
    category: 'decoracao',
    categoryName: 'Decoração',
    price: 159.00,
    stock: 7,
    rating: 5.0,
    reviewCount: 18,
    description: 'Espelho redondo de alta reflexão envolvido por trabalho minucioso de nós de macramê que formam uma aura solar radiante. Transforma qualquer hall ou quarto em um espaço de acolhimento.',
    materials: 'Vidro espelhado cristal 3mm, cordão de algodão cru e base de mdf.',
    dimensions: 'Diâmetro total: 40 cm (espelho interno: 25 cm).',
    careInstructions: 'Limpar o vidro com álcool isopropílico. Pentear as franjas com calma.',
    images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    isNew: false,
    createdAt: '2026-01-12T14:30:00Z'
  },
  {
    id: 'prod-13',
    name: 'Bolsa Tote Artesanal em Palha & Macramê Rosé',
    slug: 'bolsa-tote-palha-macrame-rose',
    category: 'bolsas',
    categoryName: 'Bolsas Artesanais',
    price: 219.00,
    originalPrice: 249.00,
    stock: 6,
    rating: 4.9,
    reviewCount: 33,
    description: 'Bolsa estruturada tecida com palha de milho selecionada e alças reforçadas adornadas com trançado em macramê rosa antigo. Forro interno em tecido de algodão cru com fecho magnético.',
    materials: 'Palha de milho natural, cordão de algodão, forro em tricoline 100% algodão.',
    dimensions: '32 cm x 28 cm x 12 cm (altura da alça: 24 cm).',
    careInstructions: 'Não submergir em água. Secar em local ventilado se umedecida.',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    isNew: true,
    createdAt: '2026-02-15T08:45:00Z'
  },
  {
    id: 'prod-14',
    name: 'Bolsa Clutch Belli Crochê Festa com Alça Dourada',
    slug: 'bolsa-clutch-belli-croche-festa',
    category: 'bolsas',
    categoryName: 'Bolsas Artesanais',
    price: 179.90,
    stock: 8,
    rating: 5.0,
    reviewCount: 15,
    description: 'Clutch elegante em fio náutico de alta durabilidade com brilho acetinado, fecho torniquete em metal banhado e corrente dourada removível. Um toque chique e autêntico para noites especiais.',
    materials: 'Fio náutico premium 3mm, ferragens em banho ouro com verniz cataforético.',
    dimensions: '22 cm x 15 cm x 6 cm.',
    careInstructions: 'Limpar com flanela seca ou levemente umedecida.',
    images: [
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80'
    ],
    featured: false,
    isNew: false,
    createdAt: '2026-01-22T16:00:00Z'
  },
  {
    id: 'prod-15',
    name: 'Caixa Presente Afeto (Vela + Mini Buquê + Cartão)',
    slug: 'caixa-presente-afeto-especial',
    category: 'lembrancinhas',
    categoryName: 'Lembrancinhas & Presentes',
    price: 139.90,
    originalPrice: 159.00,
    stock: 12,
    rating: 5.0,
    reviewCount: 52,
    description: 'Kit presente pronto para emocionar. Contém 1 vela aromática de 100g, 1 mini buquê eterno em crochê, 1 cartão artesanal com caligrafia em lettering personalizado e caixa rígida com laço de veludo.',
    materials: 'Caixa cartonada rígida, fita de veludo, papel vergê 180g e itens artesanais.',
    dimensions: '20 cm x 20 cm x 8 cm.',
    careInstructions: 'Guardar em local seco até a entrega do presente.',
    images: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80'
    ],
    featured: true,
    isNew: true,
    createdAt: '2026-02-14T11:30:00Z'
  },
  {
    id: 'prod-16',
    name: 'Kit Lembrancinhas Chaveiro Macramê Boho (10 unidades)',
    slug: 'kit-lembrancinhas-chaveiro-macrame-10un',
    category: 'lembrancinhas',
    categoryName: 'Lembrancinhas & Presentes',
    price: 99.00,
    stock: 25,
    rating: 4.9,
    reviewCount: 47,
    description: 'Conjunto com 10 chaveirinhos delicados em macramê com mosquetão dourado e tag personalizada de agradecimento. Perfeito para casamentos, batizados, aniversários e eventos corporativos.',
    materials: 'Cordão 100% algodão nos tons rosa antigo e bege, mosquetão em metal.',
    dimensions: '14 cm de comprimento cada.',
    careInstructions: 'Conservar na embalagem individual protetora até a ocasião.',
    images: [
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80'
    ],
    featured: false,
    isNew: false,
    createdAt: '2026-01-30T10:00:00Z'
  }
];