// All spoken words in the game. The generator records every line listed by allLines().
const PEOPLE = { teddy: 'Teddy', bigbunny: 'Big Bunny', littlebunny: 'Little Bunny', dolly: 'Dolly', rosie: 'Rosie', lily: 'Lily' };
const ALL = Object.keys(PEOPLE);
const DOLLS = ['dolly', 'rosie', 'lily'];
const PLACES = { house: 'the toy house', garden: 'the garden', shop: 'the shop', kitchen: 'the kitchen', wardrobe: 'the dress-up room' };
const NUM = ['zero', 'one', 'two', 'three', 'four', 'five'];
const ITEMS = {
  banana: '🍌', apple: '🍎', strawberry: '🍓', carrot: '🥕', cheese: '🧀', bread: '🍞',
  milk: '🥛', cookie: '🍪', grapes: '🍇', 'ice cream': '🍦', watermelon: '🍉', lollipop: '🍭'
};
const OCC = { party: 'a party', beach: 'the beach', ballet: 'a ballet show', snow: 'the snow' };
const cap = s => s[0].toUpperCase() + s.slice(1);

const L = {
  hello: {
    teddy: "Hello there! I'm Teddy!", bigbunny: "Hiya! I'm Big Bunny!", littlebunny: "Hi hi! I'm Little Bunny!",
    dolly: "Hello! I'm Dolly!", rosie: "Hi! I'm Rosie! I love flowers!", lily: "Hello! I'm Lily! Nice to meet you!"
  },
  chat: {
    teddy: ['Can I have a big cuddly hug?', 'I love you this much!', 'Ooh, that tickles! Hee hee!', "You're the best!", 'I like honey sandwiches!', 'Let\'s be best friends forever!'],
    bigbunny: ['Look at my floppy ears!', 'Wheee! This is so much fun!', "You're my best friend!", 'Boop! I got your nose!', 'Hop, hop, hop!', 'Do you like my yellow fur?'],
    littlebunny: ['I love crunchy carrots!', 'Boing, boing, boing!', 'Hee hee hee! Again!', 'Can you hop like me?', "I'm little, but I'm fast!", 'Tickle tickle!'],
    dolly: ['Do you want to play with me?', 'I love to dance! La la la!', "You're so kind!", 'Twirl, twirl, twirl!', 'Shall we have a tea party?', 'I love my new dress!'],
    rosie: ['Flowers are my favourite!', 'Do you want to sing a song with me?', "Let's go to the garden!", 'You have a lovely smile!', 'I can do a cartwheel!', 'Pink is the best colour!'],
    lily: ["Let's have an adventure!", 'I love reading stories!', 'Can you do a big jump?', "You're my super friend!", 'I like rainbows!', 'Hee hee, you make me laugh!']
  },
  thanks: ["Thank you! You're the best!", 'Yay! Thank you so much!', "You're a super helper!", 'I love you! Thank you!', 'Hooray! You did it!'],
  req: {
    bed: "I'm so sleepy. Can you put me to bed?",
    apples: "I'm hungry! Can you pick some apples for me?",
    water: 'The flowers are thirsty! Can you water them?',
    swing: 'Can you push me on the swing?',
    butterflies: "Let's catch butterflies together!",
    duck: 'The duck is hungry. Can you feed him some bread?',
    bubbles: "Let's blow bubbles! Can you pop them all?",
    shop: 'Can you help me do the shopping?',
    cake: "It's party time! Can you make me a cake?",
    draw: 'Will you draw me a picture? Pretty please?',
    tidy: 'Oh dear, what a mess! Can you help me tidy up?',
    hide: "Let's play hide and seek!"
  },
  dressReq: {
    party: "I'm going to a party! What should I wear?",
    beach: "I'm going to the beach! What should I wear?",
    ballet: "I'm dancing in a ballet show! What should I wear?",
    snow: "I'm going to play in the snow! What should I wear?"
  },
  found: 'You found me! Hee hee!',
  yum: 'Yummy! This cake is delicious!',
  wheee: 'Wheee! Higher! Higher!',
  morning: 'Good morning! I had the best sleep!',
  compliment: ['I love it! I look so pretty!', 'This is my favourite!', 'Twirl, twirl! So beautiful!', 'Wow! I feel like a princess!'],
  nar: {
    start: "The toys are awake! Let's play!",
    needs: c => `${PEOPLE[c]} needs your help!`,
    go: p => `Let's go to ${PLACES[p]}!`,
    bed: c => `Put ${PEOPLE[c]} in the bed!`,
    night: 'Good night! Sweet dreams!',
    apples: n => `Pick ${NUM[n]} apples!`,
    count: n => cap(NUM[n]) + '!',
    water: 'Water all the flowers!',
    swing: 'Tap the swing five times to push!',
    butterflies: 'Catch three butterflies!',
    duck: 'Give the duck three pieces of bread!',
    bubbles: 'Pop all the bubbles!',
    item: i => `Put the ${i} in the trolley!`,
    notThat: 'Oops, not that one!',
    cake: 'Pick a cake and decorate it! Then tap the tick.',
    draw: 'Draw a picture on the chalkboard, then tap the tick!',
    drawFirst: 'Draw something first!',
    tidy: 'Put the pencils back in the jar!',
    closeEyes: 'Close your eyes and count with me!',
    ready: c => `Ready or not, here I come! Where is ${PEOPLE[c]} hiding?`,
    notHere: 'Not here! Keep looking!',
    dress: 'Pick an outfit, then tap the tick!',
    unlock: 'Wow! A new dress is in the dress-up room!',
    locked: 'Get more stars to open this dress!'
  }
};

function allLines() {
  const out = [];
  const add = (who, t) => out.push([who, t]);
  ALL.forEach(c => {
    add(c, L.hello[c]); L.chat[c].forEach(t => add(c, t)); L.thanks.forEach(t => add(c, t));
    Object.values(L.req).forEach(t => add(c, t));
    [L.found, L.yum, L.wheee, L.morning].forEach(t => add(c, t));
  });
  DOLLS.forEach(c => { Object.values(L.dressReq).forEach(t => add(c, t)); L.compliment.forEach(t => add(c, t)); });
  const n = L.nar;
  Object.values(n).forEach(v => { if (typeof v === 'string') add('narrator', v); });
  ALL.forEach(c => { add('narrator', n.needs(c)); add('narrator', n.bed(c)); add('narrator', n.ready(c)); });
  Object.keys(PLACES).forEach(p => add('narrator', n.go(p)));
  [2, 3, 4, 5].forEach(k => add('narrator', n.apples(k)));
  [1, 2, 3, 4, 5].forEach(k => add('narrator', n.count(k)));
  Object.keys(ITEMS).forEach(i => add('narrator', n.item(i)));
  return out;
}
if (typeof module !== 'undefined') module.exports = { allLines };
