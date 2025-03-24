export const parfumsInit = {
    "Chocoloat": 10,
    "Vanille": 16,
    "Fraise": 6,
    "Pistache": 6,
    "Caramel": 7,
    "Nutella": 6,
    "Passion": 5,
    "Mangue": 5,
    "Cassis": 3,
    "Marron": 4,
    "Coco": 4,
    "Citron": 4,
    "Amarena": 2,
    "Cafe": 4,
    "Yaourt": 4,
    "Rhum-raisin": 4,
    "Calvados": 2,
    "Coup de Coeur": 4,
};

if (!localStorage.getItem("parfums") || Object.keys(JSON.parse(localStorage.getItem("parfums"))).length !== Object.keys(parfumsInit).length) {
    localStorage.setItem("parfums", JSON.stringify(parfumsInit));
}

export const parfums = JSON.parse(localStorage.getItem("parfums"));

export const totalStock = 96;

export const iconeEngrenage = "https://cdn-icons-png.flaticon.com/512/595/595125.png"
export const iconeEchange = "https://cdn-icons-png.flaticon.com/512/3580/3580097.png";