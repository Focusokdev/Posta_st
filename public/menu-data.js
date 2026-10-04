/*
 * Carta editable de Posta.
 * Los importes se guardan como pesos argentinos enteros (ARS).
 * Para cambiar un producto, editar aquí su categoría, nombre, precio y descripción.
 * Si el precio no se alcanza a leer en la foto, se deja null y la interfaz muestra «Consultar».
 */
window.POSTA_MENU = {
  categories: [
    { id: 'cafeteria', label: 'Cafetería', shortLabel: 'Café', note: 'Fríos y calientes' },
    { id: 'promos', label: 'Promos', shortLabel: 'Promo', note: '' },
    { id: 'sanguches', label: 'Sanguches', shortLabel: 'Sanguches', note: 'En masa napoletana' },
    { id: 'pasteleria', label: 'Pastelería', shortLabel: 'Pastelería', note: '' },
    { id: 'adicionales', label: 'Adicionales', shortLabel: 'Adicional', note: '' },
    { id: 'bebidas', label: 'Bebidas', shortLabel: 'Bebidas', note: '' },
    { id: 'barritas', label: 'Barritas', shortLabel: 'Barritas', note: '' },
    { id: 'alfajores', label: 'Alfajores', shortLabel: 'Alfajores', note: 'Artesanales' },
    { id: 'cookies', label: 'Cookies', shortLabel: 'Cookies', note: '' },
    { id: 'menu', label: 'Menú', shortLabel: 'Menú', note: '' },
    { id: 'merch', label: 'Merch', shortLabel: 'Merch', note: '' },
    { id: 'pizza-empanadas', label: 'Pizza y empanadas', shortLabel: 'Pizza', note: '4 porciones' }
  ],
  products: [
    { id: 'espresso', category: 'cafeteria', name: 'Espresso', price: 3900, icon: '' },
    { id: 'americano', category: 'cafeteria', name: 'Americano', price: 3900, icon: '' },
    { id: 'infusion', category: 'cafeteria', name: 'Infusión', price: 3200, icon: '' },
    { id: 'latte', category: 'cafeteria', name: 'Latte', price: 5700, icon: '' },
    { id: 'flat-white', category: 'cafeteria', name: 'Flat white', price: 5700, icon: '' },
    { id: 'vainilla', category: 'cafeteria', name: 'Vainilla', price: 5900, icon: '' },
    { id: 'caramel', category: 'cafeteria', name: 'Caramel', price: 5900, icon: '' },
    { id: 'pistacho', category: 'cafeteria', name: 'Pistacho', price: 6500, icon: '' },
    { id: 'ddl-coffee', category: 'cafeteria', name: 'DDL', price: 6500, icon: '' },

    { id: 'sanguche-dulce-leche', category: 'sanguches', name: 'Dulce de leche', price: 17900, description: 'Dulce de leche, almendras, frutilla.', icon: '' },
    { id: 'sanguche-nutella', category: 'sanguches', name: 'Nutella', price: 17900, description: 'Nutella, nueces, frutilla o banana.', icon: '' },
    { id: 'sanguche-oreo', category: 'sanguches', name: 'Oreo', price: null, priceLabel: 'Consultar', description: 'Chocolate y lluvia de Oreos.', icon: '' },
    { id: 'old-school', category: 'sanguches', name: 'Old School', price: 15000, icon: '' },
    { id: 'wake-up', category: 'sanguches', name: 'Wake-Up', price: 15000, icon: '' },
    { id: 'cheddar-bomb', category: 'sanguches', name: 'Cheddar Bomb', price: 15000, description: 'Lomito a las hierbas, cheddar, tomate y mayo de albahaca.', icon: '' },
    { id: 'pepe-border', category: 'sanguches', name: 'Pepe Border', price: 18900, description: 'Danbo, pepperoni, albahaca fresca y chili oil.', icon: '' },
    { id: 'bondimash', category: 'sanguches', name: 'Bondimash', price: 18900, description: 'Bondiola braseada, BBQ, coleslaw y pepino encurtido.', icon: '' },
    { id: 'argenposta', category: 'sanguches', name: 'Argenposta', price: 18900, description: 'Osobuco braseado, cebolla crispy, morrones asados y queso.', icon: '' },
    { id: 'milattack', category: 'sanguches', name: 'Milattack', price: 18900, description: 'Mila de pollo napo, tomate, lechuga y ketchup.', icon: '' },
    { id: 'veggie-street', category: 'sanguches', name: 'Veggie Street', price: 18900, description: 'Hongos, queso danbo, espinaca fresca y alioli.', icon: '' },
    { id: 'the-boss', category: 'sanguches', name: 'The Boss', price: 18900, description: 'Mortadela con pistachos, bocconcino, rúcula y pesto.', icon: '' },
    { id: 'golden-cru', category: 'sanguches', name: 'Golden Cru', price: 18900, description: 'Jamón crudo, polpeta, rúcula y pesto de tomates secos.', icon: '' },
    { id: 'caesar-queen', category: 'sanguches', name: 'Caesar Queen', price: 18900, description: 'Pollo, lechuga, aderezo Caesar y queso en hebras.', icon: '' },
    { id: 'godfather', category: 'sanguches', name: 'Godfather', price: 18900, description: 'Pastrami, pepinos encurtidos, tomate confit y mayo de cebolla.', icon: '' },

    { id: 'promo-latte-medialunas', category: 'promos', name: 'Latte + 2 medialunas', price: 8500, icon: '' },
    { id: 'promo-latte-pan-queso', category: 'promos', name: 'Latte + 2 pan de queso', price: 8900, icon: '' },
    { id: 'promo-latte-tostado-jyq', category: 'promos', name: 'Latte + tostado JYQ', price: 10500, icon: '' },
    { id: 'promo-latte-sanguche-desayuno', category: 'promos', name: 'Latte + sánguche desayuno', price: 18900, icon: '' },
    { id: 'promo-latte-medialunas-jyq', category: 'promos', name: 'Latte + 2 medialunas JYQ', price: 10500, icon: '' },

    { id: 'pan-queso', category: 'pasteleria', name: 'Pan de queso', price: 1900, icon: '' },
    { id: 'medialuna', category: 'pasteleria', name: 'Medialuna', price: 1800, icon: '' },
    { id: 'docena-medialunas', category: 'pasteleria', name: 'Docena de medialunas', price: 19900, icon: '' },
    { id: 'medialunas-rellenas', category: 'pasteleria', name: 'Medialunas rellenas', price: 4200, icon: '' },
    { id: 'medialunas-jyq', category: 'pasteleria', name: 'Medialunas de JYQ', price: 2900, icon: '' },
    { id: 'budines', category: 'pasteleria', name: 'Budines', price: 5000, icon: '' },
    { id: 'roll-canela', category: 'pasteleria', name: 'Roll de canela', price: 6900, icon: '' },

    { id: 'papas-noisette', category: 'adicionales', name: 'Papas noisette', price: 5000, icon: '' },

    { id: 'caesar-salad', category: 'menu', name: 'Caesar Salad', price: 17500, icon: '' },
    { id: 'mediterranea', category: 'menu', name: 'Mediterránea', price: 17500, description: 'Jamón crudo, rúcula, parmesano, tomates cherry.', icon: '' },

    { id: 'gaseosa-coca', category: 'bebidas', name: 'Gaseosa línea Coca', price: 2900, icon: '' },
    { id: 'agua-mineral', category: 'bebidas', name: 'Agua mineral', price: 2800, icon: '' },
    { id: 'exprimido-citric', category: 'bebidas', name: 'Exprimido Citric', price: 4900, icon: '' },
    { id: 'andes-lata', category: 'bebidas', name: 'Andes lata', price: 4500, icon: '' },
    { id: 'porron-corona', category: 'bebidas', name: 'Porrón Corona', price: 5000, icon: '' },
    { id: 'campari', category: 'bebidas', name: 'Campari', price: 9000, icon: '' },
    { id: 'gin-tonic', category: 'bebidas', name: 'Gin tonic', price: 9000, icon: '' },
    { id: 'mojito', category: 'bebidas', name: 'Mojito', price: 9000, icon: '' },
    { id: 'aperol-spritz', category: 'bebidas', name: 'Aperol Spritz', price: 9000, icon: '' },

    { id: 'alfajor-choco-frambuesa', category: 'alfajores', name: 'Alfajor artesanal · chocolate / frambuesa', price: 4000, icon: '' },
    { id: 'alfajor-almendra-maicena-pistacho', category: 'alfajores', name: 'Alfajor artesanal · almendras / maicena / pistacho', price: 4500, icon: '' },

    { id: 'cookies', category: 'cookies', name: 'Cookies', price: 5900, icon: '' },

    { id: 'pizza-mozzarella', category: 'pizza-empanadas', name: 'Pizza Mozzarella', price: 15900, icon: '' },
    { id: 'pizza-napo', category: 'pizza-empanadas', name: 'Pizza Napo', price: 16900, icon: '' },
    { id: 'pizza-peperoni', category: 'pizza-empanadas', name: 'Pizza Peperoni', price: 17900, icon: '' },
    { id: 'pizza-jamon', category: 'pizza-empanadas', name: 'Pizza Jamón', price: 17900, icon: '' },
    { id: 'empanada-osobuco', category: 'pizza-empanadas', name: 'Empanada Osobuco y provolone', price: 2900, icon: '' },
    { id: 'empanada-bondiola', category: 'pizza-empanadas', name: 'Empanada Bondiola, BBQ y cheddar', price: 2900, icon: '' },
    { id: 'empanada-jyq', category: 'pizza-empanadas', name: 'Empanada Jamón y queso', price: 2900, icon: '' },
    { id: 'empanada-capresse', category: 'pizza-empanadas', name: 'Empanada Capresse', price: 2900, icon: '' }
  ]
};
