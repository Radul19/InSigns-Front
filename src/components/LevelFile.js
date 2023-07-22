
/**
 * Game 1 LinesConnect
 * Game 2 MultipleSelections bigCards
 * Game 3 Write Answer options=[]
 * Game 4 MultipleSelections littleCards
 * 
 */

export const levelFiles = [
  {
    image: require("../images/road1.png"),
    bgc: "#A965BD",
    bgcd: "#4F0A51",
    title: "Abecedario",
    subtitle: "El ABD en LSV",
    stars: 6,
    content: [{
      state: 2,
      title: 'Vocales',
      levels: [{
        subtitle: '¿Cuál es la seña  de la vocal “E”?',
        answer: 'E',
        options: ['A', 'E', 'I', 'O'],
        gameType: 1,
      }, {
        subtitle: '¿Cuál es la seña de la vocal “A”?',
        answer: 'A',
        options: ['O', 'I', 'A', 'E'],
        gameType: 4,
      }, {
        subtitle: '¿Cuál es la seña de la vocal “O”?',
        answer: 'O',
        options: [],
        gameType: 3,
      }]
    },
    {
      state: 2,
      title: 'Consonantes 1',
      levels: [{
        subtitle: '¿Cuál es la seña  de la vocal “E”?',
        answer: 'E',
        options: ['A', 'E', 'I', 'O'],
        gameType: 2,
      }]
    },
    {
      state: 2,
      title: 'Consonantes 2',
      levels: [{
        subtitle: '¿Cuál es la seña  de la vocal “E”?',
        answer: 'E',
        options: ['A', 'E', 'I', 'O'],
        gameType: 3,
      }]
    },
    {
      state: 1,
      title: 'Consonantes Práctica',
      levels: [{
        subtitle: '¿Cuál es la seña  de la vocal “E”?',
        answer: 'E',
        options: ['A', 'E', 'I', 'O'],
        gameType: 4,
      }]
    },
    {
      state: 0,
      title: 'Deletrear',
      levels: []
    },
    ]
  },
  {
    image: require("../images/road2.png"),
    bgc: "#5AB8C3",
    bgcd:'#20646C',
    title: "Números",
    subtitle: "Cuenta en LSV",
    stars: 0,
    content: [{
      state: 0,
      title: 'Números 1-5',
      levels: [],
    },{
      state: 0,
      title: 'Números 6-10',
      levels: [],
    },{
      state: 0,
      title: 'Decenas',
      levels: [],
    },{
      state: 0,
      title: 'Centenas',
      levels: [],
    },{
      state: 0,
      title: 'Prácticas',
      levels: [],
    },]
  },
  {
    image: require("../images/road3.png"),
    bgc: "#C6B4ED",
    bgcd:'#584583',
    title: "Preguntas",
    subtitle: "Interrogantes Diarias",
    stars: 0,
    content: [{
      state: 0,
      title: 'Preguntas 1',
      levels: [],
    },{
      state: 0,
      title: 'Preguntas 2',
      levels: [],
    },{
      state: 0,
      title: 'Práctica',
      levels: [],
    }]
  },
  {
    image: require("../images/road4.png"),
    bgc: "#85586F",
    bgcd:'#584583',
    title: "Nivel 4",
    subtitle: "Abecedario",
    stars: 0,
  },
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