const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const sql = `REPLACE INTO \`productos\` (\`id\`, \`nombre\`, \`precio\`, \`medidas\`, \`descripcion\`, \`stock\`, \`imagen\`, \`categoria\`, \`creado_en\`) VALUES
(1, 'Ladrillo pequeño negro', 300.00, '18*9*6', 'Ladrillo artesanal de alta calidad.', 900, 'https://easycolombia.vtexassets.com/arquivos/ids/163219-1600-1600?v=638066266842200000&width=1600&height=1600&aspect=true', 'Ladrillos', '2026-09-15 21:31:49'),
(2, 'Ladrillo pequeño rosado', 260.00, '18*9*6', 'Ladrillo artesanal rosado excelente.', 1200, 'https://ladrillerasansebastian.com/wp-content/uploads/2024/08/LADRILLO-TOLETE-COMUN-ROSADO-2.jpeg', 'Ladrillos', '2026-09-15 21:31:49'),
(3, 'Ladrillo grande negro', 450.00, '22*12*7', 'Ladrillo grande negro superior.', 800, 'https://media.leroymerlin.co.za/media/306553/format/jpg?tr=if-iar_ne_1,w-566,h-566,cm-pad_resize,if-else,w-566,h-566,if-end', 'Ladrillos', '2026-09-15 21:31:49'),
(4, 'Ladrillo grande rosado', 400.00, '22*12*7', 'Ladrillo grande rosado artesanal.', 900, 'https://t3.ftcdn.net/jpg/01/13/32/26/360_F_113322631_KA4N2XLNTH2hV8oZsq79rYjjKtvOAZqK.jpg', 'Ladrillos', '2026-09-15 21:31:49'),
(5, 'Bloque número 4', 1050.00, 'Estándar', 'Bloque de alta resistencia.', 500, 'https://media.falabella.com/sodimacCO/258425/w=1036,h=832,f=webp,fit=contain,q=85', 'Bloques', '2026-09-15 21:31:49'),
(6, 'Bloque número 5', 1100.00, 'Estándar', 'Bloque de máxima resistencia.', 400, 'https://media.falabella.com/sodimacCO/499020/w=1036,h=832,f=webp,fit=contain,q=85', 'Bloques', '2026-09-15 21:31:49'),
(7, 'Regilla', 700.00, 'Estándar', 'Regilla de arcilla ventilación.', 300, 'https://media.falabella.com/sodimacCO/63165/w=1036,h=832,f=webp,fit=contain,q=85', 'Especiales', '2026-09-15 21:31:49'),
(8, 'Adoquín', 750.00, 'Estándar', 'Adoquín de arcilla pavimento.', 600, 'https://media.falabella.com/sodimacCO/695284_02/w=1036,h=832,f=webp,fit=contain,q=85', 'Especiales', '2026-09-15 21:31:49'),
(9, 'Teja de barro', 1000.00, 'Estándar', 'Teja de barro tradicional.', 450, 'https://tse2.mm.bing.net/th/id/OIP.AaIXjKGys99FaptD3xTg4AAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', 'Tejas', '2026-09-15 21:31:49'),
(10, 'Bloquelón', 5500.00, 'Grande', 'Bloquelón de gran tamaño.', 150, 'https://media.falabella.com/sodimacCO/152339/w=1036,h=832,f=webp,fit=contain,q=85', 'Bloques', '2026-09-15 21:31:49'),
(11, 'Ladrillo Prensado Liviano 24.5x12x6cm Santafe', 1400.00, '24.5x12x6 cm', 'Ladrillo prensado liviano Santafe. 2.2 Kg, rendimiento 56 u/m2. Tipo enchape, color terracota. Código: 114940.', 1000, 'https://tse1.explicit.bing.net/th/id/OIP.tjvaRd5heYNx-pBY-hdIFwHaEx?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', 'Ladrillos', '2026-09-17 13:20:00'),
(12, 'Bloque Perf Vert DP 33x23x11.5cm', 4900.00, '33x23x11.5 cm', 'Bloque perforación vertical DP estructural. 7.9 Kg, rendimiento 12.25 u/m2. Color terracota. Código: 76786.', 600, 'https://tse1.explicit.bing.net/th/id/OIP.pNBz_1pKxsYPDFmnk9nQ_wHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', 'Bloques', '2026-09-17 13:20:00'),
(13, 'Ladrillo Refractario 24x12.5x4cm 1400°C', 2700.00, '24x12.5x4 cm', 'Ladrillo refractario de alta resistencia térmica hasta 1400°C. 1.5 Kg, rendimiento 36 u/m2, color arena. Código: 159253.', 500, 'https://media.adeo.com/media/4405301/media.jpeg?width=3000&height=3000&format=jpg&quality=80&fit=bounds', 'Refractarios', '2026-09-17 13:20:00'),
(14, 'Tolete #1 Perforado 24x12x6cm', 660.00, '24x12x6 cm', 'Tolete #1 perforado artesanal. 2.10 Kg, rendimiento 56 u/m2. Garantía 1 año. Código: 99717.', 1500, 'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/sodimacCO/99717/w=1036,h=832,f=webp,fit=contain,q=85', 'Ladrillos', '2026-09-17 13:20:00'),
(15, 'Prensado Macizo 24.5x12x5.5cm', 1900.00, '24.5x12x5.5 cm', 'Ladrillo prensado macizo tipo enchape. Rendimiento 60 u/m2, color terracota. Código: 23209.', 800, 'https://media.falabella.com/sodimacCO/23209/w=1036,h=832,f=webp,fit=contain,q=85', 'Ladrillos', '2026-09-17 13:20:00'),
(16, 'Tableta Arcilla Cúcuta 20x20cm', 23000.00, '20x20 cm', 'Tableta elaborada en arcilla natural tamaño 20x20 cm. Acabado tradicional cálido para pisos y muros.', 400, 'https://moraventas.com/wp-content/uploads/2021/06/TABLON-30X30-GRAFILADO.jpeg', 'Tabletas', '2026-09-17 13:20:00'),
(17, 'Adoquín Corbatín 15x10x6cm', 800.00, '15x10x6 cm', 'Adoquín tipo corbatín para pavimentación exterior y senderos de alto tránsito.', 1200, 'https://www.ladrilleragrespan.com/wp-content/uploads/2017/04/Ladrillo-Corbatin-LVH.jpg', 'Adoquines', '2026-09-17 13:20:00'),
(18, 'Tableta Rústica 25x25cm', 20000.00, '25x25 cm', 'Tableta acabado rústico en arcilla de alta resistencia, formato 25x25 cm.', 350, 'https://tse1.explicit.bing.net/th/id/OIP.W_3kJaK5HjfKif7N2ne9LwHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', 'Tabletas', '2026-09-17 13:20:00'),
(19, 'Ladrillo Prisma Gris 24x12x6cm', 900.00, '24x12x6 cm', 'Ladrillo de fachada acabado prisma gris moderno. Alta estética arquitectónica.', 700, 'https://tse4.mm.bing.net/th/id/OIP.A8TqMwqbqzhjzgMz3wYQ6wHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', 'Fachadas', '2026-09-17 13:20:00'),
(20, 'Ladrillo Cocoa 24x12x6cm', 900.00, '24x12x6 cm', 'Ladrillo de fachada tono cocoa oscuro elegante. Gran durabilidad y textura.', 700, 'https://www.ladrilleramelendez.com.co/wp-content/uploads/2020/10/4212_Sin-Fondo.png', 'Fachadas', '2026-09-17 13:20:00'),
(21, 'Arena de Río (m³)', 100000.00, 'm³', 'Arena de río lavada y seleccionada para mezclas de concreto y pegas de mampostería.', 100, 'https://tse1.mm.bing.net/th/id/OIP.DQ4hFt5HdNu9HjDmsxbNKgHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', 'Agregados', '2026-09-17 13:20:00'),
(22, 'Arena Amarilla (m³)', 100000.00, 'm³', 'Arena amarilla seleccionada para morteros de pega, acabados y revoques uniformes.', 100, 'https://tse1.mm.bing.net/th/id/OIP.Jqdc8X6tV7Bua7H7fsANggHaFj?r=0&w=800&h=600&rs=1&pid=ImgDetMain&o=7&rm=3', 'Agregados', '2026-09-17 13:20:00'),
(23, 'Mixto de Concreto (m³)', 100000.00, 'm³', 'Material mixto granular (grava y arena) balanceado para fundición estructural.', 100, 'https://tse1.mm.bing.net/th/id/OIP.LuWELSza6RsI_Eo25QoSsAHaE8?r=0&w=800&h=534&rs=1&pid=ImgDetMain&o=7&rm=3', 'Agregados', '2026-09-17 13:20:00');`;

(async () => {
  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'fes_construccion'
    });
    await conn.query(sql);
    const [rows] = await conn.query('SELECT COUNT(*) as total FROM productos;');
    console.log('✅ Nuevos productos agregados con éxito. Total actual en DB:', rows[0].total);
    await conn.end();
  } catch (err) {
    console.error('Error insertando productos:', err.message);
  }
})();
