
/**
 * Game 1 LinesConnect
 * Game 2 MultipleSelections bigCards
 * Game 3 Write Answer options=[]
 * Game 4 MultipleSelections littleAnswers
 * 
 * 
eas build --profile production --platform android
 */

import { fm } from "./Hands"

export const levelFiles = [
  {
    image: require("../images/road1.png"),
    req: 0,
    bgc: "#A965BD",
    bgcd: "#4F0A51",
    title: "Abecedario",
    subtitle: "El ABD en LSV",
    content: [{
      loc: 0,
      index: 0,
      title: 'Vocales',
      levels: [{
        subtitle: 'Une las señas con su significado correspondiente',
        answer: ['O', 'E', 'A', 'I'],
        options: ["A", "E", "I", "O"],
        gameType: 1,
      }, {
        subtitle: '¿Cuál es la seña de la letra “U”?',
        answer: ['U'],
        options: ['E', 'O', 'I', 'U'],
        gameType: 2,
      }, {
        subtitle: 'Selecciona la letra correspondiente',
        answer: ['I'],
        options: ["A", "E", "I", "O",],
        gameType: 4,
      }, {
        subtitle: 'Escribe la letra correspondiente',
        answer: ['A'],
        options: [],
        gameType: 3,
      }, {
        subtitle: 'Une las palabras con las senas correspondientes',
        answer: ["I", "A", "E", "U"],
        options: ["U", "I", "A", "E",],
        gameType: 1,
      }, {
        subtitle: '¿Cuál es la seña  de la letra “E”?',
        answer: ['E'],
        options: ["U", "E", "I", "O"],
        gameType: 2,
      }]
    },
    {
      loc: 0,
      index: 1,
      title: 'Consonantes 1',
      levels: [{
        subtitle: '¿Cuál es la seña  de la letra “B”?',
        answer: ['B'],
        options: ['B', 'F', 'C', 'D'],
        gameType: 2,
      }, {
        subtitle: 'Selecciona la letra correspondiente',
        answer: ['F'],
        options: ['C', 'F', 'H', 'B'],
        gameType: 4,
      }, {
        subtitle: 'Escribe la letra correspondiente',
        answer: ['C'],
        options: [],
        gameType: 3,
      }, {
        subtitle: 'Une las señas con su significado correspondiente',
        answer: ['D', "J", "G", "H"],
        options: ['D', 'G', 'H', 'J'],
        gameType: 1,
      }, {
        subtitle: 'Selecciona la letra correspondiente',
        answer: ['G'],
        options: ['G', 'B', 'J', 'H'],
        gameType: 4,
      }, {
        subtitle: 'Escribe la letra correspondiente',
        answer: ['H'],
        options: [],
        gameType: 3,
      }]
    },
    {
      loc: 0,
      index: 2,
      title: 'Consonantes 2',
      levels: [{
        subtitle: 'Escribe la letra correspondiente',
        answer: ['K'],
        options: [],
        gameType: 3,
      }, {
        subtitle: 'Une las señas con su significado correspondiente',
        answer: ['N', "L", "Ñ", "M"],
        options: ['L', 'M', 'N', 'Ñ'],
        gameType: 1,
      }, {
        subtitle: '¿Cuál es la seña  de la letra “K”?',
        answer: ['K'],
        options: ['Q', 'L', 'K', 'M'],
        gameType: 2,
      }, {
        subtitle: 'Selecciona la letra correspondiente',
        answer: ['P'],
        options: ['M', 'P', 'K', 'N'],
        gameType: 4,
      }, {
        subtitle: 'Une las señas con su significado correspondiente',
        answer: ['L', "N", "Q", "P"],
        options: ['P', 'L', 'Q', 'N'],
        gameType: 1,
      }, {
        subtitle: 'Selecciona la letra correspondiente',
        answer: ['Q'],
        options: ['L', 'P', 'Q', 'Ñ'],
        gameType: 4,
      }]
    },
    {
      loc: 0,
      index: 3,
      title: 'Consonantes 3',
      levels: [{
        subtitle: 'Selecciona la letra correspondiente',
        answer: ['R'],
        options: ['V', 'T', 'R', 'S'],
        gameType: 4,
      }, {
        subtitle: 'Escribe la letra correspondiente',
        answer: ['S'],
        options: [],
        gameType: 3,
      }, {
        subtitle: 'Une las señas con su significado correspondiente',
        answer: ['X', 'W', 'V', 'T'],
        options: ['T', 'V', 'W', 'X'],
        gameType: 1,
      }, {
        subtitle: '¿Cuál es la seña  de la letra “Z”?',
        answer: ['Z'],
        options: ['Z', 'X', 'R', 'L'],
        gameType: 2,
      }, {
        subtitle: 'Selecciona la letra correspondiente',
        answer: ['T'],
        options: ['Y', 'R', 'T', 'W'],
        gameType: 4,
      }, {
        subtitle: 'Une las señas con su significado correspondiente',
        answer: ['R', "S", "Y", "Z"],
        options: ['R', 'Y', 'S', 'Z'],
        gameType: 1,
      }]
    }
    ]
  },
  {
    image: require("../images/road2.png"),
    req: 8,
    bgc: "#5AB8C3",
    bgcd: '#20646C',
    title: "Números",
    subtitle: "Cuenta en LSV",
    stars: 0,
    content: [{
      loc: 1,
      index: 0,
      title: 'Números 1-5',
      levels: [{
        subtitle: 'Une las señas con su significado correspondiente',
        answer: ['3', '1', '4', '2'],
        options: ['1', '2', '3', '4'],
        gameType: 1,
      }, {
        subtitle: '¿Cuál es la seña  del número “5”?',
        answer: ['5'],
        options: ['5', '2', '1', '4'],
        gameType: 2,
      }, {
        subtitle: 'Selecciona el número correspondiente',
        answer: ['3'],
        options: ['2', '1', '3', '5'],
        gameType: 4,
      }, {
        subtitle: 'Escribe el número correspondiente',
        answer: ['1'],
        options: [],
        gameType: 3,
      }, {
        subtitle: 'Une los números con las señas correspondientes',
        answer: ['1', "5", "2", "4"],
        options: ['5', '2', '4', '1'],
        gameType: 1,
      }, {
        subtitle: '¿Cuál es la seña  del número “4”?',
        answer: ['4'],
        options: ['1', '4', '5', '2'],
        gameType: 2,
      }],
    }, {
      loc: 1,
      index: 1,
      title: 'Números 6-10',
      levels: [{
        subtitle: '¿Cuál es la seña  del número “6” ',
        answer: ['6'],
        options: ['6', '7', '8', '9'],
        gameType: 2,
      }, {
        subtitle: 'Selecciona el número correspondiente',
        answer: ['10'],
        options: ['7', '10', '9', '8'],
        gameType: 4,
      }, {
        subtitle: 'Escribe el número correspondiente',
        answer: ['9'],
        options: [],
        gameType: 3,
      }, {
        subtitle: 'Une las señas con su significado correspondiente',
        answer: ['7', '6', '10', '8'],
        options: ['6', '8', '7', '10'],
        gameType: 1,
      }, {
        subtitle: 'Selecciona el número 8',
        answer: ['8'],
        options: ['8', '6', '10', '9'],
        gameType: 4,
      }, {
        subtitle: 'Escribe el número correspondiente',
        answer: ['7'],
        options: [],
        gameType: 3,
      }],
    }]
  },
  {
    image: require("../images/road3.png"),
    req: 14,
    bgc: "#C6B4ED",
    bgcd: '#584583',
    title: "Preguntas",
    subtitle: "Interrogantes Diarias",
    content: [{
      loc: 2,
      index: 0,
      title: 'Preguntas 1',
      levels: [{
        subtitle: 'Une las señas con su significado correspondiente',
        answer: ['q4', 'q2', 'q3', 'q1'],
        options: ["q1", "q2", "q3", "q4"],
        gameType: 1,
      }, {
        subtitle: '¿Cuál es la seña  de “¿Cómo?” ?',
        answer: ['q2'],
        options: ["q4", "q3", "q1", "q2"],
        gameType: 2,
      }, {
        subtitle: 'Selecciona la pregunta correspondiente',
        answer: ['q3'],
        options: ["q4", "q1", "q3", "q2"],
        gameType: 4,
      },{
        subtitle: 'Escribe la seña correspondiente',
        answer: ['q1'],
        options: [],
        gameType: 3,
      },{
        subtitle: 'Une las señas con su significado correspondiente',
        answer: ['q4','q3','q2','q1'],
        options: ["q3", "q1", "q4", "q2"],
        gameType: 1,
      },{
        subtitle: '¿Cuál es la seña de “¿Cuánto?” ?',
        answer: ['q4'],
        options: ["q1", "q4", "q2", "q3"],
        gameType: 2,
      },],
    },{
      loc: 2,
      index: 1,
      title: 'Preguntas 2',
      levels: [{
        subtitle: '¿Cuál es la seña  de “¿Dónde?” ?',
        answer: ['q5'],
        options: ['q5', 'q6', 'q7', 'q8'],
        gameType: 2,
      }, {
        subtitle: 'Selecciona la pregunta correspondiente',
        answer: ['q7'],
        options: ["q6", "q7", "q5", "q8"],
        gameType: 4,
      }, {
        subtitle: 'Escribe la seña correspondiente',
        answer: ['q6'],
        options: [],
        gameType: 3,
      },{
        subtitle: 'Une las señas con su significado correspondiente',
        answer: ["q5", "q8", "q6", "q7"],
        options: ["q5", "q6", "q7", "q8"],
        gameType: 1,
      },{
        subtitle: 'Selecciona la pregunta correspondiente',
        answer: ['q8'], 
        options: ["q8", "q5", "q6", "q7"],
        gameType: 4,
      },{
        subtitle: 'Escribe la seña correspondiente',
        answer: ['q5'],
        options: [],
        gameType: 3,
      },],
    },{
      loc: 2,
      index: 2,
      title: 'Actividades de Práctica',
      levels: [{
        subtitle: 'Escribe la seña correspondiente',
        answer: ['q3'],
        options: [],
        gameType: 3,
      }, {
        subtitle: 'Une las señas con su significado correspondiente',
        answer: ["q5", "q2", "q6", "q1"],
        options: ["q5", "q1", "q6", "q2"],
        gameType: 1,
      }, {
        subtitle: 'Escribe la seña correspondiente',
        answer: ['q6'],
        options: [],
        gameType: 3,
      },{
        subtitle: 'Selecciona la pregunta correspondiente"',
        answer: ["q5"],
        options: ["q7", "q5", "q2", "q3"],
        gameType: 4,
      },{
        subtitle: 'Une las señas con su significado correspondiente',
        answer: ['q4','q3','q7','q8'], 
        options: ["q7", "q3", "q4", "q8"],
        gameType: 1,
      },{
        subtitle: 'Selecciona la pregunta correspondiente',
        answer: ['q8'],
        options: ['q1','q6','q8','q3'],
        gameType: 4,
      },],
    }]
  },
  {
    image: require("../images/road4.png"),
    req: 0,
    bgc: "#FF9A2F",
    bgcd: '#873000',
    title: "Familia",
    subtitle: "Grupo Familiar",
    content:[{
      loc: 3,
      index: 0,
      title: 'Familia 1',
      levels: [{
        subtitle: 'Escribe el significado de la seña presentada ',
        answer: ['MAMÁ'],
        options: ["motherI","motherS"],
        gameType: 5,
      },{
        subtitle: 'Escribe el significado de la seña presentada ',
        answer: ['PAPÁ'],
        options: ["fatherI","fatherS"],
        gameType: 5,
      },{
        subtitle: 'Escribe el significado de la seña presentada ',
        answer: ['HIJO'],
        options: ["sonI","sonS"],
        gameType: 5,
      },{
        subtitle: 'Escribe el significado de la seña presentada ',
        answer: ['HERMANO',"HERMANA"],
        options: ["hermI","hermS"],
        gameType: 5,
      },{
        subtitle: 'Escribe el significado de la seña presentada ',
        answer: ['ABUELO',"ABUELA"],
        options: ["olderI","olderS"],
        gameType: 5,
      },{
        subtitle: 'Escribe el significado de la seña presentada ',
        answer: ['HOMBRE'],
        options: ["manI","manS"],
        gameType: 5,
      }]
    },{
      loc: 3,
      index: 1,
      title: 'Familia 2',
      levels: [{
        subtitle: 'Escribe el significado de la seña presentada ',
        answer: ['MUJER'],
        options: ["womanI","womanS"],
        gameType: 5,
      },{
        subtitle: 'Escribe el significado de las señas presentadas ',
        answer: ['HERMANA'],
        options: ["sisI","hermS","womanS"],
        gameType: 6,
      },{
        subtitle: 'Escribe el significado de las señas presentadas ',
        answer: ['ABUELA'],
        options: ["gmaI","olderS","womanS"],
        gameType: 6,
      },{
        subtitle: 'Escribe el significado de la seña presentada ',
        answer: ['FAMILIA'],
        options: ["famI","famS"],
        gameType: 5,
      },{
        subtitle: 'Escribe el significado de las señas presentadas ',
        answer: ['ABUELO'],
        options: ["gpaI","olderS","manS"],
        gameType: 6,
      },{
        subtitle: 'Escribe el significado de las señas presentadas ',
        answer: ['HERMANO'],
        options: ["broI","hermS","manS"],
        gameType: 6,
      }]
    }]
  },{
    image: require("../images/road5.png"),
    req: 100,
    bgc: "#FF9A2F",
    bgcd: '#873000',
    title: "Familia",
    subtitle: "Grupo Familiar",
    content:[{
      loc: 3,
      index: 0,
      title: 'Familia 1',
      levels: [{
        subtitle: 'Selecciona la pregunta correspondiente',
        answer: ['q8'],
        options: ['q1','q6','q8','q3'],
        gameType: 4,
      }]
    }]
  }
]

export const avatarList = [
  require("../images/ava1.png"),
  require("../images/ava2.png"),
  require("../images/ava3.png"),
  require("../images/ava4.png"),
  require("../images/ava5.png"),
  require("../images/ava6.png"),
  require("../images/ava7.png"),
  require("../images/ava8.png"),
]


/**
 * TO DO
 *-* Complete screen variables + page + stars adquired ###
 *-* Complete level and send data to user
 *-* Unlock new levels logic
 *-* Keep tracking of user level progression
 *-* Add notes to home and lvls screens
 *-* Edit profile data
 *-* Show archivments
 *-* Random Victory or lose images
 *-* Reminder of login with local storage
 *-* Loading screen at edit user
 *-* Update new levels 
 *-* consonantes 1 5-6
 *-* Reparar lvl 1 errors
 * 
 * 
 * Crear nuevos niveles
 * Cambiar colores + imagenes para q sea hetero
 * 
 * 
 * 
 * 
 * Logica de email + codigo de verificacion de usuario + evitar registro --- a la puta
 * pantalla de registro codigo --- a la puta
 */