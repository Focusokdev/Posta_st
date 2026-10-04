/*
 * Carta editable de Posta.
 * Los importes se guardan como pesos argentinos enteros (ARS).
 * Para cambiar un producto, editar aquí su categoría, nombre, precio y descripción.
 * Si el precio no se alcanza a leer en la foto, se deja null y la interfaz muestra «Consultar».
 */
window.POSTA_MENU = {
  categories: [
    { id: 'coffee', label: 'Coffee', shortLabel: 'Coffee', note: 'Fríos y calientes' },
    { id: 'pasteleria', label: 'Pastelería', shortLabel: 'Pastelería', note: '' },
    { id: 'sanguches-dulces', label: 'Sanguches dulces', shortLabel: 'Dulces', note: '' },
    { id: 'promos', label: 'Promos', shortLabel: 'Promo', note: '' },
    { id: 'desayuno', label: 'Sanguches desayuno', shortLabel: 'Desayuno', note: '' },
    { id: 'calientes', label: 'Sanguches calientes', shortLabel: 'Calientes', note: 'Incluyen papas noisette' },
    { id: 'frios', label: 'Sanguches fríos', shortLabel: 'Fríos', note: 'Incluyen papas noisette' },
    { id: 'pizza', label: 'Pizza napoletana', shortLabel: 'Pizza', note: '4 porciones' },
    { id: 'empanadas', label: 'Empanadas', shortLabel: 'Empanadas', note: '' },
    { id: 'ensaladas', label: 'Ensaladas', shortLabel: 'Ensaladas', note: 'Incluyen agua mineral' },
    { id: 'bebidas', label: 'Bebidas', shortLabel: 'Bebidas', note: '' },
    { id: 'adicionales', label: 'Adicional', shortLabel: 'Adicional', note: '' }
  ],
  products: [
    { id: 'espresso', category: 'coffee', name: 'Espresso', price: 3900, icon: '☕' },
    { id: 'americano', category: 'coffee', name: 'Americano', price: 3900, icon: '☕' },
    { id: 'infusion', category: 'coffee', name: 'Infusión', price: 3200, icon: '🍵' },
    { id: 'latte', category: 'coffee', name: 'Latte', price: 5700, icon: '☕' },
    { id: 'flat-white', category: 'coffee', name: 'Flat white', price: 5700, icon: '☕' },
    { id: 'vainilla', category: 'coffee', name: 'Vainilla', price: 5900, icon: '☕' },
    { id: 'caramel', category: 'coffee', name: 'Caramel', price: 5900, icon: '☕' },
    { id: 'pistacho', category: 'coffee', name: 'Pistacho', price: 6500, icon: '☕' },
    { id: 'ddl-coffee', category: 'coffee', name: 'DDL', price: 6500, icon: '☕' },

    { id: 'pan-queso', category: 'pasteleria', name: 'Pan de queso', price: 1900, icon: '🧀' },
    { id: 'alfajor-choco-frambuesa', category: 'pasteleria', name: 'Alfajor artesanal · chocolate / frambuesa', price: 4000, icon: '🍪' },
    { id: 'alfajor-almendra-maicena-pistacho', category: 'pasteleria', name: 'Alfajor artesanal · almendras / maicena / pistacho', price: 4500, icon: '🍪' },
    { id: 'medialuna', category: 'pasteleria', name: 'Medialuna', price: 1800, icon: '🥐' },
    { id: 'docena-medialunas', category: 'pasteleria', name: 'Docena de medialunas', price: 19900, icon: '🥐' },
    { id: 'medialunas-rellenas', category: 'pasteleria', name: 'Medialunas rellenas', price: 4200, icon: '🥐' },
    { id: 'medialunas-jyq', category: 'pasteleria', name: 'Medialunas de JYQ', price: 2900, icon: '🥐' },
    { id: 'cookies', category: 'pasteleria', name: 'Cookies', price: 5900, icon: '🍪' },
    { id: 'budines', category: 'pasteleria', name: 'Budines', price: 5000, icon: '🍰' },
    { id: 'roll-canela', category: 'pasteleria', name: 'Roll de canela', price: 6900, icon: '🍥' },

    { id: 'sanguche-dulce-leche', category: 'sanguches-dulces', name: 'Dulce de leche', price: 17900, description: 'Dulce de leche, almendras, frutilla.', icon: '🥪' },
    { id: 'sanguche-nutella', category: 'sanguches-dulces', name: 'Nutella', price: 17900, description: 'Nutella, nueces, frutilla o banana.', icon: '🥪' },
    { id: 'sanguche-oreo', category: 'sanguches-dulces', name: 'Oreo', price: null, priceLabel: 'Consultar', description: 'Chocolate y lluvia de Oreos.', icon: '🥪' },

    { id: 'promo-latte-medialunas', category: 'promos', name: 'Latte + 2 medialunas', price: 8500, icon: '☕' },
    { id: 'promo-latte-pan-queso', category: 'promos', name: 'Latte + 2 pan de queso', price: 8900, icon: '☕' },
    { id: 'promo-latte-tostado-jyq', category: 'promos', name: 'Latte + tostado JYQ', price: 10500, icon: '🥪' },
    { id: 'promo-latte-sanguche-desayuno', category: 'promos', name: 'Latte + sánguche desayuno', price: 18900, icon: '🥪' },
    { id: 'promo-latte-medialunas-jyq', category: 'promos', name: 'Latte + 2 medialunas JYQ', price: 10500, icon: '☕' },

    { id: 'old-school', category: 'desayuno', name: 'Old School', price: 15000, icon: '🥪' },
    { id: 'wake-up', category: 'desayuno', name: 'Wake-Up', price: 15000, icon: '🥪' },
    { id: 'cheddar-bomb', category: 'desayuno', name: 'Cheddar Bomb', price: 15000, description: 'Lomito a las hierbas, cheddar, tomate y mayo de albahaca.', icon: '🥪' },

    { id: 'pepe-border', category: 'calientes', name: 'Pepe Border', price: 18900, description: 'Danbo, pepperoni, albahaca fresca y chili oil.', icon: '🥪' },
    { id: 'bondimash', category: 'calientes', name: 'Bondimash', price: 18900, description: 'Bondiola braseada, BBQ, coleslaw y pepino encurtido.', icon: '🥪' },
    { id: 'argenposta', category: 'calientes', name: 'Argenposta', price: 18900, description: 'Osobuco braseado, cebolla crispy, morrones asados y queso.', icon: '🥪' },
    { id: 'milattack', category: 'calientes', name: 'Milattack', price: 18900, description: 'Mila de pollo napo, tomate, lechuga y ketchup.', icon: '🥪' },
    { id: 'veggie-street', category: 'calientes', name: 'Veggie Street', price: 18900, description: 'Hongos, queso danbo, espinaca fresca y alioli.', icon: '🥪' },

    { id: 'the-boss', category: 'frios', name: 'The Boss', price: 18900, description: 'Mortadela con pistachos, bocconcino, rúcula y pesto.', icon: '🥪' },
    { id: 'golden-cru', category: 'frios', name: 'Golden Cru', price: 18900, description: 'Jamón crudo, polpeta, rúcula y pesto de tomates secos.', icon: '🥪' },
    { id: 'caesar-queen', category: 'frios', name: 'Caesar Queen', price: 18900, description: 'Pollo, lechuga, aderezo Caesar y queso en hebras.', icon: '🥪' },
    { id: 'godfather', category: 'frios', name: 'Godfather', price: 18900, description: 'Pastrami, pepinos encurtidos, tomate confit y mayo de cebolla.', icon: '🥪' },

    { id: 'pizza-mozzarella', category: 'pizza', name: 'Mozzarella', price: 15900, icon: '🍕' },
    { id: 'pizza-napo', category: 'pizza', name: 'Napo', price: 16900, icon: '🍕' },
    { id: 'pizza-peperoni', category: 'pizza', name: 'Peperoni', price: 17900, icon: '🍕' },
    { id: 'pizza-jamon', category: 'pizza', name: 'Jamón', price: 17900, icon: '🍕' },

    { id: 'empanada-osobuco', category: 'empanadas', name: 'Osobuco y provolone', price: 2900, icon: '🥟' },
    { id: 'empanada-bondiola', category: 'empanadas', name: 'Bondiola, BBQ y cheddar', price: 2900, icon: '🥟' },
    { id: 'empanada-jyq', category: 'empanadas', name: 'Jamón y queso', price: 2900, icon: '🥟' },
    { id: 'empanada-capresse', category: 'empanadas', name: 'Capresse', price: 2900, icon: '🥟' },

    { id: 'caesar-salad', category: 'ensaladas', name: 'Caesar Salad', price: 17500, icon: '🥗' },
    { id: 'mediterranea', category: 'ensaladas', name: 'Mediterránea', price: 17500, description: 'Jamón crudo, rúcula, parmesano, tomates cherry.', icon: '🥗' },

    { id: 'gaseosa-coca', category: 'bebidas', name: 'Gaseosa línea Coca', price: 2900, icon: '🥤' },
    { id: 'agua-mineral', category: 'bebidas', name: 'Agua mineral', price: 2800, icon: '💧' },
    { id: 'exprimido-citric', category: 'bebidas', name: 'Exprimido Citric', price: 4900, icon: '🍊' },
    { id: 'andes-lata', category: 'bebidas', name: 'Andes lata', price: 4500, icon: '🍺' },
    { id: 'porron-corona', category: 'bebidas', name: 'Porrón Corona', price: 5000, icon: '🍺' },
    { id: 'campari', category: 'bebidas', name: 'Campari', price: 9000, icon: '🍹' },
    { id: 'gin-tonic', category: 'bebidas', name: 'Gin tonic', price: 9000, icon: '🍸' },
    { id: 'mojito', category: 'bebidas', name: 'Mojito', price: 9000, icon: '🍹' },
    { id: 'aperol-spritz', category: 'bebidas', name: 'Aperol Spritz', price: 9000, icon: '🍹' },

    { id: 'papas-noisette', category: 'adicionales', name: 'Papas noisette', price: 5000, icon: '🍟' }
  ]
};
